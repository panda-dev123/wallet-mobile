import {
	HIDE_PROGRESS_DIALOG,
	SHOW_PROGRESS_DIALOG,
} from "./types";

export function showProgress(title, description) {
	return (dispatch) => {
		dispatch({
			type: SHOW_PROGRESS_DIALOG,
			payload: {title, description}
		});
	};
}

export function hideProgress() {
	return (dispatch) => {
		dispatch({
			type: HIDE_PROGRESS_DIALOG,
		});
	};
}
