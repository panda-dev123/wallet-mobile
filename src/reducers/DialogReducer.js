import {
	SHOW_PROGRESS_DIALOG,
	HIDE_PROGRESS_DIALOG,
} from "../actions/types";

const INITIAL_STATE = {
	showProgressDialog: false,
	progressDialogTitle: '',
	progressDialogDescription: '',
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {
		case SHOW_PROGRESS_DIALOG:
			return {...state, showProgressDialog: true, progressDialogTitle: action.payload.title, progressDialogDescription: action.payload.description};
		case HIDE_PROGRESS_DIALOG:
			return {...state, showProgressDialog: false};

		default:
			return state;
	}
};
