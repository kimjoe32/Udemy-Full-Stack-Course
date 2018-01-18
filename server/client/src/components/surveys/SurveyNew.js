import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

/*
	Shows the SurveyForm and SurveyFormReview
	SurveyForm: survey creation and its fields
	SurveyFormReview: check over newly created survey
*/
class SurveyNew extends Component {
	state = { showFormReview: false };


	/* 
		Two possible states:
			user clicked new survey button/new survey is not valid yet
			User clicked "submit" (new survey form filled out) and we show review form
		Use showFormReview to know which one to use
	*/
	renderContent() {
		if (this.state.showFormReview) {
			return <SurveyFormReview 
					onCancel={() => this.setState({showFormReview: false})}
				/>;
		}
		// callback function will set state to show surveyFormReview
		return <SurveyForm 
			onSurveySubmit={() => this.setState({ showFormReview: true})}
		/>
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
}

export default reduxForm({
	form:'surveyForm'
})(SurveyNew);