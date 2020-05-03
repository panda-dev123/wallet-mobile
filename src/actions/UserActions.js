import ApiInterface from '../utils/ApiInterface';
import Database from '../utils/Database';
import NavigationService from '../utils/NavigationService';
import Utils from '../utils/Utils';
import {
	GET_AVAILABLE_REGIONS,
	GET_AVAILABLE_REGIONS_FAIL,
	GET_AVAILABLE_REGIONS_SUCCESS,
	OTP_CONFIRMATION,
	OTP_CONFIRMATION_FAIL,
	OTP_CONFIRMATION_SUCCESS,
	OTP_EMAIL_CONFIRMATION,
	OTP_EMAIL_CONFIRMATION_FAIL,
	OTP_EMAIL_CONFIRMATION_SUCCESS
} from './types';
import { RSA } from 'react-native-rsa-native';
import Biometrics from 'react-native-biometrics';

export function verifyMobile(MobileNumber) {
	return dispatch => {
		// dispatch({type: FETCH_LOGIN});
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.verifyMobile(MobileNumber)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					Database.saveMobileNumber(MobileNumber);
					NavigationService.navigate('OtpConfirmation', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function verifySms(pin, resendSMS = false) {
	return dispatch => {
		dispatch({ type: OTP_CONFIRMATION });
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.verifySMS(Database.getMobileNumber(), pin)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.navigate('CreatePinCode', {});
					dispatch({
						type: OTP_CONFIRMATION_SUCCESS
					});
				} else if (response.data.code === 1003) {
					NavigationService.navigate('EnterPinCode', {});
					Utils.showToast(response.data.message);
				} else {
					if (resendSMS) {
						this.resendSMS();
					} else {
						//temporary bypass, for styling
						// NavigationService.navigate('CreatePinCode', {});
						// dispatch({
						// 	type: OTP_CONFIRMATION_SUCCESS
						// });

						Utils.showToast(response.data.message);
						dispatch({
							type: OTP_CONFIRMATION_FAIL,
							payload: response.data.message
						});
					}
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function loginPin(pin) {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		// let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString();
		// let payload = epochTimeSeconds + 'some message';
		// RSA.encrypt(payload, Database.getPublicKey())
		// 	.then(signature => {
		// 		console.log('the encoded message is ' + signature);
		let signature = '';
		ApiInterface.instance
			.loginPin(pin, signature, Database.getMobileNumber())
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					Database.saveHasConfirmedOtp(true);
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
		// });
	};
}

export function loginBiometrics(signature, payload) {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.loginBiometrics(Database.getMobileNumber(), signature, payload)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.navigate('CreatePinCode', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function resendSMS() {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.resendSMS(Database.getMobileNumber())
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					// dispatch({
					// 	type: OTP_CONFIRMATION_SUCCESS
					// });
				} else {
					Utils.showToast(response.data.message);
					// dispatch({
					// 	type: OTP_CONFIRMATION_FAIL,
					// 	payload: response.data.Message
					// });
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function setAuth(pin) {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		RSA.generateKeys(4096).then(keys => {
			console.log('4096 private:', keys.private);
			console.log('4096 public:', keys.public);

			Database.savePrivateKey(keys.private);
			Database.savePublicKey(keys.public);

			ApiInterface.instance
				.setAuth(pin, keys.public)
				.then(response => {
					if (response.data.code === 0) {
						Database.saveServerPublicKey(response.data.result);
						Biometrics.isSensorAvailable().then(biometryType => {
							Utils.hideProgress();
							if (
								biometryType === Biometrics.TouchID ||
								biometryType === Biometrics.FaceID
							) {
								NavigationService.navigate('SetUpBiometrics', {});
							} else {
								NavigationService.navigate('SignUp', {});
							}
						});
					} else {
						Utils.showToast(response.data.message);
					}
				})
				.catch(error => {
					Utils.hideProgress();
					console.log(error);
				});
		});
	};
}

export function signUp(
	firstName,
	middleName,
	lastName,
	street,
	houseNumber,
	postcode,
	city,
	state,
	country,
	email
) {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.setUserInfo(
				firstName,
				middleName,
				lastName,
				street,
				houseNumber,
				postcode,
				city,
				state,
				country,
				email
			)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					Database.saveEmail(email);
					NavigationService.navigate('OtpConfirmationEmail', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function verifyEmail(pin) {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.verifyEmail(pin, Database.getEmail())
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					Database.saveHasConfirmedOtp(true);
					NavigationService.reset('mainTabs', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function resendEmail() {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		dispatch({
			type: OTP_EMAIL_CONFIRMATION
		});

		ApiInterface.instance
			.resendEmail(Database.getEmail())
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					dispatch({
						type: OTP_EMAIL_CONFIRMATION_SUCCESS
					});
					// NavigationService.navigate('OtpConfirmationEmail', {});
				} else {
					Utils.showToast(response.data.message);
					dispatch({
						type: OTP_EMAIL_CONFIRMATION_FAIL,
						payload: response.data.message
					});
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function setBiometrics(publicKey) {
	return dispatch => {
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.setBiometrics(publicKey)
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					NavigationService.navigate('SignUp', {});
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
			});
	};
}

export function getAvailableRegions() {
	return dispatch => {
		dispatch({ type: GET_AVAILABLE_REGIONS });
		Utils.showProgress('Loading...', 'Please wait...');

		ApiInterface.instance
			.getAvailableRegions()
			.then(response => {
				Utils.hideProgress();
				if (response.data.code === 0) {
					dispatch({
						type: GET_AVAILABLE_REGIONS_SUCCESS,
						payload: response.data.result
					});
				} else {
					Utils.showToast(response.data.message);
					dispatch({
						type: GET_AVAILABLE_REGIONS_FAIL,
						payload: response.data.message
					});
				}
			})
			.catch(error => {
				Utils.hideProgress();
				console.log(error);
				dispatch({
					type: GET_AVAILABLE_REGIONS_FAIL,
					payload: error
				});
			});
	};
}

export function addDevice(fcmToken) {
	return dispatch => {
		if (Database.getFcmToken() === fcmToken) {
			return;
		}

		let deviceType = Platform.OS === 'ios' ? 'iOS' : 'Android';
		ApiInterface.instance
			.addDevice(fcmToken, deviceType)
			.then(response => {
				if (response.data.code === 0) {
					Database.saveFcmToken(fcmToken);
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}
