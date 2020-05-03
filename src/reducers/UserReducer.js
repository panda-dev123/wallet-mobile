import {
	OTP_CONFIRMATION, OTP_CONFIRMATION_SUCCESS, OTP_CONFIRMATION_FAIL, OTP_EMAIL_CONFIRMATION, OTP_EMAIL_CONFIRMATION_SUCCESS, OTP_EMAIL_CONFIRMATION_FAIL, GET_AVAILABLE_REGIONS, GET_AVAILABLE_REGIONS_SUCCESS, GET_AVAILABLE_REGIONS_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
	otpConfirmationError: '',
	otpEmailConfirmationError: '',

	availableRegionsLoading: false,
	availableRegions: [],
	availableRegionsError: '',
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {
		case OTP_CONFIRMATION:
			return {...state, otpConfirmationError: ''};
		case OTP_CONFIRMATION_SUCCESS:
			return {...state, otpConfirmationError: ''};
		case OTP_CONFIRMATION_FAIL:
			return {...state, otpConfirmationError: action.payload};

		case OTP_EMAIL_CONFIRMATION:
			return {...state, otpEmailConfirmationError: ''};
		case OTP_EMAIL_CONFIRMATION_SUCCESS:
			return {...state, otpEmailConfirmationError: ''};
		case OTP_EMAIL_CONFIRMATION_FAIL:
			return {...state, otpEmailConfirmationError: action.payload};

		case GET_AVAILABLE_REGIONS:
			return {...state, availableRegionsLoading: true, availableRegionsError: '', availableRegions: []};
		case GET_AVAILABLE_REGIONS_SUCCESS:
			return {...state, availableRegionsLoading: false, availableRegionsError: '', availableRegions: action.payload};
		case GET_AVAILABLE_REGIONS_FAIL:
			return {...state, availableRegionsLoading: false, availableRegionsError: action.payload};

		default:
			return state;
	}
};
