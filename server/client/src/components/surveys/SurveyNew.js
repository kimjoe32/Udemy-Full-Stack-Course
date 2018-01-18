import React, { Component } from 'react';
import SurveyForm from './SurveyForm';

/*
	Shows the SurveyForm and SurveyFormReview
	SurveyForm: survey creation and its fields
	SurveyFormReview: check over newly created survey
*/
class SurveyNew extends Component {
	render() {
		return (
			<div>
				<SurveyForm />
			</div>
		);
	}
}

export default SurveyNew;