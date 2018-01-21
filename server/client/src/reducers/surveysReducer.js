import { FETCH_SURVEYS } from '../actions/types';


/*
	should return a list of surveys, otherwise empty arry
*/
export default function(state = [], action) {
	switch(action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
}