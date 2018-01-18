/* 
	Responsible for initial view layer setup
*/
import React, { Component } from 'react';
/* 	BrowserRouter = brains of react-router - how to behave, 
		Looks at current URL and change set of components visible at one time
		Only takes 1 child component
	Route = used to set up rule between certain route that user might visit and
		Set of components visible on screen
		Each route specifies rule between possible address and a component to display
*/
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';//changs dynamically based on route
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

/*
	Returns route with their corresponding components
*/
class App extends Component {
	/*
		Where action creator is called
	*/
	componentDidMount() {
		// console.log("fetchUser: componentDidMount()");
		this.props.fetchUser();
	}

	render() {
		// console.log("fetchUser: render()");
		return (
			<div className="container">
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route exact path="/" component={Landing}/>
						<Route exact path="/surveys" component={Dashboard}/>
						<Route path="/surveys/new" component={SurveyNew}/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);