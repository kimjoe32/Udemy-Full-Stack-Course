import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
	// console.log("fetchUser()");
	//this is an action creator
	//uses redux-thunk
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data});
};

/*
	received handled payment token from stripe, 
	send that token to api
*/
export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data});
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type:FETCH_USER, payload: res.data });
};