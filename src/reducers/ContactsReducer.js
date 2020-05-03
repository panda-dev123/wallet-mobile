import {
	GET_CONTACTS,
	GET_CONTACTS_SUCCESS,
	GET_CONTACTS_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
	getContactsLoading: false,
	contacts: {},
	getContactsError: '',
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {
		case GET_CONTACTS:
			return {...state, getContactsLoading: true, getContactsError: '', contacts: {}};
		case GET_CONTACTS_SUCCESS:
			return {...state, getContactsLoading: false, getContactsError: '', contacts: action.payload};
		case GET_CONTACTS_FAIL:
			return {...state, getContactsLoading: false, getContactsError: action.payload};

		default:
			return state;
	}
};
