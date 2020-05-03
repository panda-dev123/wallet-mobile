import ApiInterface from "../utils/ApiInterface";
import Database from "../utils/Database";
import NavigationService from "../utils/NavigationService";
import Utils from "../utils/Utils";
import {
	GET_DASHBOARD,
	GET_DASHBOARD_FAIL,
	GET_DASHBOARD_SUCCESS, GET_EXCHANGE_RATE, GET_EXCHANGE_RATE_FAIL, GET_EXCHANGE_RATE_SUCCESS,
} from "./types";

export function getDashboard(MobileNumber) {
	return (dispatch) => {
		dispatch({type: GET_DASHBOARD});

		ApiInterface.instance.getDashboard(MobileNumber)
			.then(response => {
				if (response.data.code === 0) {
					let result = response.data.result;
					result.selectedMethodIndex = 0;
					if (result.paymentMethods.length > 0) {
						for (let i = 0; i < result.paymentMethods.length; i++) {
							if (result.paymentMethods.id === result.selectedMethod) {
								result.selectedMethodIndex = i;
							}
						}
					}
					dispatch({
						type: GET_DASHBOARD_SUCCESS,
						payload: response.data.result
					});
				} else {
					Utils.showToast(response.data.message);
					dispatch({type: GET_DASHBOARD_FAIL});
				}
			})
			.catch((error) => {
				dispatch({type: GET_DASHBOARD_FAIL});
				console.log(error);
			});
	};
}

export function getAvailablePaymentMethods() {
	return (dispatch) => {

		ApiInterface.instance.getAvailablePaymentMethods()
			.then(response => {
				if (response.data.code === 0) {
					Database.saveAvailablePaymentMethods(response.data.result);
				} else if (response.data.code === 1101) {
					NavigationService.navigate('SignUp', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function getAvailableCrypto() {
	return (dispatch) => {

		ApiInterface.instance.getAvailableCrypto()
			.then(response => {
				if (response.data.code === 0) {
					Database.saveAvailableCrypto(response.data.result);
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export function addPrepaidAccount(type, currency, color, alias, dayLimit, monthLimit) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.addPrepaidAccount(type, currency, color, alias, dayLimit, monthLimit)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function addAtivos(type, currency, color, alias, dayLimit, monthLimit) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.addAtivos(type, currency, color, alias, dayLimit, monthLimit)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function addBankAccount(type, color, alias, currency, accountName, accountNumber, swift, dayLimit, monthLimit) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.addBankAccount(type, color, alias, currency, accountName, accountNumber, swift, dayLimit, monthLimit)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function addCard(type, currency, nameOnCard, panNumber, expiryDate, cvv, color, cardAlias, dayLimit, monthLimit) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.addCard(type, currency, nameOnCard, panNumber, expiryDate, cvv, color, cardAlias, dayLimit, monthLimit)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function addCustodianCrypto(type, currency, color, cardAlias, dayLimit, monthLimit) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.addCustodianCrypto(type, currency, color, cardAlias, dayLimit, monthLimit)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function editPaymentMethod(paymentMethodId, alias, dayLimit, monthLimit, color, receiveNotifications, receiveEmail, receiveSMS) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.editPaymentMethod(paymentMethodId, alias, dayLimit, monthLimit, color, receiveNotifications, receiveEmail, receiveSMS)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function exchangePayment(fromPaymentMethodId, currency, amount, description, conversionAmount, toPaymentMethodId) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.exchangePayment(fromPaymentMethodId, currency, amount, description, conversionAmount, toPaymentMethodId)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
					Utils.showToast('The exchange is successful!');
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function sendToCrypto(fromPaymentMethodId, currency, amount, description, address) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.sendToCrypto(fromPaymentMethodId, currency, amount, description, address)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
					Utils.showToast('The payment is successful!');
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function sendToBank(fromPaymentMethodId, currency, amount, description, swift, accountHolder, accountNumber) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.sendToBank(fromPaymentMethodId, currency, amount, description, swift, accountHolder, accountNumber)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
					Utils.showToast('The payment is successful!');
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}


export function sendToUser(fromPaymentMethodId, currency, amount, description, userId) {
	return (dispatch) => {
		Utils.showProgress("Loading...", "Please wait...");

		ApiInterface.instance.sendToUser(fromPaymentMethodId, currency, amount, description, userId)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.reset('mainTabs', {});
					Utils.showToast('The payment is successful!');
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch((error) => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function getExchangeRate(fromCurrency, toCurrency, amount, method) {
	return (dispatch) => {
		dispatch({type: GET_EXCHANGE_RATE});

		ApiInterface.instance.getExchangeRate(fromCurrency, toCurrency, amount, method)
			.then(response => {
				if (response.data.code === 0) {
					dispatch({
						type: GET_EXCHANGE_RATE_SUCCESS,
						payload: response.data.result
					});
				} else {
					dispatch({type: GET_DASHBOARD_FAIL});
				}
			})
			.catch((error) => {
				dispatch({type: GET_EXCHANGE_RATE_FAIL});
				console.log(error);
			});
	};
}

