import { ADD_BRANCH_KEY, USER_LOGIN, SET_DOMAIN, SET_LINK, SET_LINK_OBJECT } from "./actions";

export function addBranchKey(branchKey) {
	return { type: ADD_BRANCH_KEY, payload: branchKey };
}

export function login() {
	return { type: USER_LOGIN };
}

export function setLinkDomain(obj) {
	return { type: SET_DOMAIN, payload: `${obj.domain}/` };
}

export function setLink(link) {
	return { type: SET_LINK, payload: link };
}

export function setLinkObject(linkObject) {
    return { type: SET_LINK_OBJECT, payload: linkObject };
}
