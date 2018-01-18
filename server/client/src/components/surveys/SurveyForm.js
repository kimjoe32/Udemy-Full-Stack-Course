import _ from 'lodash';
import React, { Component } from 'react';
/*
	Field is a multi-use form that contains different HTML
	elements for user input collection
*/
import { reduxForm, Field }from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
/*
	For creating a new survey, and its fields
	For user to add input
	Notes:
	- this.props.handleSubmit() provided by reduxForm
		- when user submits, the function we pass is run on the form
	- Field will pass on label="Survey Title" to {SurveyField} component
*/

const FIELDS = [
	{label: "Survey Title", name: "title" }, //noValueError: "You must provide a title"
	{label: "Subject Line", name: "subject" },
	{label: "Email Body", name: "body" },
	{label: "Recipient List", name: "emails"}
];
class SurveyForm extends Component {
	/*
		Returns a div
	*/
	renderFields() {
		return _.map(FIELDS, ({label, name}) => {
			return <Field key={name} 
							component={SurveyField} 
							type="text" 
							label={label} 
							name ={name} />
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values=> console.log(values))}>
					{this.renderFields()}
					<Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
					<button type="submit" className="teal btn-flat right white-text">
						Next
						<i className="material-icons left">done</i>
					</button>
				</form>	
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	// check list of emails is valid
	errors.emails = validateEmails(values.emails || '');

	// If no input title (blank) given
	_.each(FIELDS, ({ name }) => {
		if (!values[name]) {
			errors[name] = '*You must provide a value'
		}
	});

	return errors;
}

/*
	reduxForm takes argument that contains options to customize
	how the form behaves
	Validate: form input validation
	When user types into form, input will be stored by redux store in a 
	key specified by <Field name=""/>
*/
export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm);