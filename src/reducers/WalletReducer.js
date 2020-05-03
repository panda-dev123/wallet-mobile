import {
	GET_DASHBOARD,
	GET_DASHBOARD_SUCCESS,
	GET_DASHBOARD_FAIL, GET_EXCHANGE_RATE, GET_EXCHANGE_RATE_SUCCESS, GET_EXCHANGE_RATE_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
	dashboardLoading: false,
	dashboard: [],
	dashboardError: '',

	getExchangeRateLoading: false,
	exchangeRate: {},
	getExchangeRateError: '',
};

export default (state = INITIAL_STATE, action) => {
	console.log(action);

	switch (action.type) {
		case GET_DASHBOARD:
			return {...state, dashboardLoading: true, dashboardError: '', dashboard: []};
		case GET_DASHBOARD_SUCCESS:
			return {...state, dashboardLoading: false, dashboardError: '', dashboard: action.payload};
		case GET_DASHBOARD_FAIL:
			return {...state, dashboardLoading: false, dashboardError: action.payload};

		case GET_EXCHANGE_RATE:
			return {...state, getExchangeRateLoading: true, getExchangeRateError: '', exchangeRate: {}};
		case GET_EXCHANGE_RATE_SUCCESS:
			return {...state, getExchangeRateLoading: false, getExchangeRateError: '', exchangeRate: action.payload};
		case GET_EXCHANGE_RATE_FAIL:
			return {...state, getExchangeRateLoading: false, getExchangeRateError: action.payload};

		default:
			return state;
	}
};
