import { combineReducers } from "redux";
import {
	ADD_BRANCH_KEY,
	USER_LOGIN,
	SET_DOMAIN,
	SET_LINK,
    SET_LINK_OBJECT
} from "../actions/actions";

const branchKey = (state = "", action) => {
	if (action.type === ADD_BRANCH_KEY) {
		return action.payload;
	}
	return state;
};

const isLoggedIn = (state = false, action) => {
	if (action.type === USER_LOGIN) {
		return true;
	}
	return state;
};

const linkObj = (state = { domain: "branch.app.link/" }, action) => {
	if (action.type === SET_DOMAIN) {
		return Object.assign({}, state, { domain: action.payload });
	} else if (action.type === SET_LINK) {
		return Object.assign({}, state, { link: action.payload });
	} else if(action.type === SET_LINK_OBJECT) {
        return Object.assign({}, state, action.payload);
	}
	return state;
};

const rootReducer = combineReducers({ branchKey, isLoggedIn, linkObj });

export default rootReducer;
