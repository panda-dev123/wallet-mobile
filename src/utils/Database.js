import SyncStorage from "sync-storage";

export default class Database {

	static saveSessionId(sessionId) {
		SyncStorage.set('sessionId', sessionId);
	}

	static getSessionId() {
		return SyncStorage.get('sessionId');
	}

	static saveMobileNumber(mobileNumber) {
		SyncStorage.set('mobileNumber', mobileNumber);
	}

	static getMobileNumber() {
		return SyncStorage.get('mobileNumber');
	}

	static savePublicKey(value) {
		SyncStorage.set('publicKey', value);
	}

	static getPublicKey() {
		return SyncStorage.get('publicKey');
	}

	static saveFcmToken(value) {
		SyncStorage.set('fcmToken', value);
	}

	static getFcmToken() {
		return SyncStorage.get('fcmToken');
	}

	static saveServerPublicKey(value) {
		SyncStorage.set('serverPublicKey', value);
	}

	static getServerPublicKey() {
		return SyncStorage.get('serverPublicKey');
	}

	static saveEmail(value) {
		SyncStorage.set('email', value);
	}

	static getEmail() {
		return SyncStorage.get('email');
	}

	static saveHasConfirmedOtp(value) {
		SyncStorage.set('hasConfirmedOtp', value);
	}

	static getHasConfirmedOtp() {
		let value = SyncStorage.get('hasConfirmedOtp');
		return !(value === undefined || value === null || value === false);
	}

	static saveLoginTouchId(value) {
		SyncStorage.set('loginTouchId', value);
	}

	static getLoginTouchId() {
		let value = SyncStorage.get('loginTouchId');
		return !(value === undefined || value === null || value === false);
	}

	static saveLoginFaceId(value) {
		SyncStorage.set('loginFaceId', value);
	}

	static getLoginFaceId() {
		let value = SyncStorage.get('loginFaceId');
		return !(value === undefined || value === null || value === false);
	}

	static savePrivateKey(value) {
		SyncStorage.set('privateKey', value);
	}

	static getPrivateKey() {
		return SyncStorage.get('privateKey');
	}


	static setIntroDone() {
		SyncStorage.set('isIntroDone', true);
	}

	static setKycDone() {
		SyncStorage.set('isKycDone', true);
	}

	static isIntroDone() {
		return SyncStorage.get('isIntroDone') === true;
	}

	static isKycDone() {
		return SyncStorage.get('isKycDone') === true;
	}

	static saveAvailableCrypto(value) {
		SyncStorage.set('availableCrypto', JSON.stringify(value));
	}

	static getAvailableCrypto() {
		let value = SyncStorage.get('availableCrypto');
		if (value === undefined || value === null | value === '') {
			return [];
		}
		return JSON.parse(value);
	}

	static saveAvailablePaymentMethods(value) {
		SyncStorage.set('availablePaymentMethods', JSON.stringify(value));
	}

	static getAvailablePaymentMethods() {
		let value = SyncStorage.get('availablePaymentMethods');
		if (value === undefined || value === null | value === '') {
			return [];
		}
		return JSON.parse(value);
	}

	static isAtivosAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'ativos') {
				return true;
			}
		}
		return false;
	}

	static isCardAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'card') {
				return true;
			}
		}
		return false;
	}

	static isPrepaidAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'prepaid') {
				return true;
			}
		}
		return false;
	}

	static isBankAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'bank') {
				return true;
			}
		}
		return false;
	}

	static isCustcryptoAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'custcrypto') {
				return true;
			}
		}
		return false;
	}

	static getAtivosMethodsAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let ativosMethodsAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'ativos') {
				ativosMethodsAvailable.push(availablePaymentMethod);
			}
		}
		return ativosMethodsAvailable;
	}

	static getCardMethodsAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let cardMethodsAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'card') {
				cardMethodsAvailable.push(availablePaymentMethod);
			}
		}
		return cardMethodsAvailable;
	}

	static getPrepaidMethodsAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let prepaidMethodsAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'prepaid') {
				prepaidMethodsAvailable.push(availablePaymentMethod);
			}
		}
		return prepaidMethodsAvailable;
	}

	static getBankMethodsAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let bankMethodsAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'bank') {
				bankMethodsAvailable.push(availablePaymentMethod);
			}
		}
		return bankMethodsAvailable;
	}

	static getCustcryptoMethodsAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let custcryptoMethodsAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'custcrypto') {
				custcryptoMethodsAvailable.push(availablePaymentMethod);
			}
		}
		return custcryptoMethodsAvailable;
	}

	static getAtivosCurrenciesAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let ativosCurrenciesAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'ativos') {
				for (let availableCurrency of availablePaymentMethod.currency) {
					ativosCurrenciesAvailable.push(availableCurrency);
				}
			}
		}
		return ativosCurrenciesAvailable;
	}

	static getCardCurrenciesAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let cardCurrenciesAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'card') {
				for (let availableCurrency of availablePaymentMethod.currency) {
					cardCurrenciesAvailable.push(availableCurrency);
				}
			}
		}
		return cardCurrenciesAvailable;
	}

	static getPrepaidCurrenciesAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let prepaidCurrenciesAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'prepaid') {
				for (let availableCurrency of availablePaymentMethod.currency) {
					prepaidCurrenciesAvailable.push(availableCurrency);
				}
			}
		}
		return prepaidCurrenciesAvailable;
	}

	static getBankCurrenciesAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let bankCurrenciesAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'bank') {
				for (let availableCurrency of availablePaymentMethod.currency) {
					bankCurrenciesAvailable.push(availableCurrency);
				}
			}
		}
		return bankCurrenciesAvailable;
	}

	static getCustcryptoCurrenciesAvailable() {
		let availablePaymentMethods = Database.getAvailablePaymentMethods();
		let custcryptoCurrenciesAvailable = [];
		for (let availablePaymentMethod of availablePaymentMethods) {
			if (availablePaymentMethod.baseType === 'custcrypto') {
				for (let availableCurrency of availablePaymentMethod.currency) {
					custcryptoCurrenciesAvailable.push(availableCurrency);
				}
			}
		}
		return custcryptoCurrenciesAvailable;
	}


}
