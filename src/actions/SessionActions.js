import ApiInterface from '../utils/ApiInterface';
import Database from '../utils/Database';
import NavigationService from '../utils/NavigationService';
import Utils from '../utils/Utils';
import SplashScreen from 'react-native-splash-screen';

export function createSession() {
	return dispatch => {
		ApiInterface.instance
			.createSession()
			.then(response => {
				if (response.data.code === 0) {
					Database.saveSessionId(response.data.result);
					SplashScreen.hide();

					NavigationService.reset('AnimatedSplashScreen', {});

					//vvvvvvvvvvTESTCODE BYPASSING OTHER SCREEN vvvvvv
					//NavigationService.reset('SetUpBiometrics', {});
					//return;
					//^^^^^^^^^TESTCODE BYPASSING OTHER SCREEN
				} else {
					Utils.showToast(response.data.message);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}
