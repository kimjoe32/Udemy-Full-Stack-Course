const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


/*
	Returns a mailer, but with our additional customization
*/
class Mailer extends helper.Mail {
	/* 
		Setup for sendGrid mailing
		content = body of email
	*/
	constructor({subject, recipients}, content) {
		super();

		// sendGrid-specific setup
		this.sgApi = sendgrid(keys.sendGridKey);
		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	}

	/*
		Iterate through recipients and extract emails
		returns emails of all recipients
	*/
	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	}

	/*
		Enable clicktracking: to know which email recipient responded
		to the survey
	*/
	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	/*
		Iterate over recipients and add to the personalize object
		Note: each recipient is actually the helper.Email model from formatAddresses()
	*/
	addRecipients() {
		const personalize = new helper.Personalization();
		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});

		this.addPersonalization(personalize);
	}

	/*
		Send the mailer to sendGrid
	*/
	async send() {
		const request = await this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = await this.sgApi.API(request); //sends to sendgrid
		return response;
	}
}

module.exports = Mailer;