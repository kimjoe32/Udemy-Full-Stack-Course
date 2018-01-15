import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
	// console.log("fetchUser switch state");
	switch (action.type) {
		case FETCH_USER: //return user model
			return action.payload || false ;
		default: 
			return state; //by default, null: no clue if user is logged in
	}
}