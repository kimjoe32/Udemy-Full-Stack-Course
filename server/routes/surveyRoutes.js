const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate= require ('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
	/*
		API request to show all the surveys
		Includes survey stats and other information
	*/
	app.get('/api/surveys/', requireLogin, async (req, res) => {
		// get surveys that have to do with the user (survey owner/creator)
		// exclude recipient list
		const surveys = await Survey.find({ _user: req.user.id })
			.select({ recipients: false });

		res.send(surveys);
	});

	/*
		Response sent when recipient responds
	*/
	app.get('/api/surveys/:surveId/:choice', (req, res) => {
		res.send('Thanks for voting');
	});

	/*
		Handler for SendGrid responses to clicks in the email
	*/
	app.post('/api/surveys/webhooks', (req, res) => {
		// extract surveyId and choice(yes/no)
		const p = new Path('/api/surveys/:surveyId/:choice');

		_.chain(req.body)
			// Map over list of events 
			.map(({ email, url }) => {
				// Extract url
				const match = p.test(new URL(url).pathname); //null if nothing extracted
				if (match) {
					return {email, 
						surveyId:match.surveyId, 
						choice: match.choice};
				}
			})
			// Remove undefined or unique elements
			.compact()
			.uniqBy('email', 'surveyId')

			// async query to mongodb
			// find elem with _id, email, and responded=false
			// if found, update their choice, and set responded to true
			.each(({surveyId, email, choice}) => {
				Survey.updateOne(
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false}
					}
				}, 
				{
					$inc: { [choice]: 1 },
					$set: {'recipients.$.responded': true },
					lastResponded: Date.now()
				}).exec();
			})
			.value();

		res.send({});
	});
	/*
		Create a new survey and send out a big email
		Also removes credits when emails sent
	*/
	app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
		const { title, subject, body, recipients } = req.body;

		/*
			Note that: 
			1. (email => {return {email:email}}) 
			   is condensed to:
			   (email => ({ email }))
			2. req.user.id is generated by mongo
		*/
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		/*
			Send the email 
			Calls services/emailTemplates/surveyTemplate.js
			template = body of survey
		*/
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save(); //save survey to mongodb
			req.user.credits -= 1;
			const user = await req.user.save(); //save user's credits to mongodb
			res.send(user);
		} catch (err) {
			console.log(err);
			res.status(422).send(err);
		}
	});
};