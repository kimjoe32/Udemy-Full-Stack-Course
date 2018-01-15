/*
	Responsible for redux/data setup
*/
import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

/*
	Action creator - initiates change inside redux side of the app
	Modify state contained within redux store

	Redux-thunk allows us to return an action creator without returning an action
		Action creator now PRODUCES an action to dispatch function

*/

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}><App /></Provider>, 
	document.querySelector('#root')
);