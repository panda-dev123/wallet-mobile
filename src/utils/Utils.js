import Toast from "react-native-root-toast";
import {Platform} from 'react-native';
import SweetAlert from "react-native-sweet-alert-best";
import {HIDE_PROGRESS_DIALOG, SHOW_PROGRESS_DIALOG} from "../actions/types";
import {store} from '../app';

class Utils {
	static showToasts(messages) {
		let i = 0;
		for (let errorMessage of messages) {
			Toast.show(errorMessage, {
				duration: Toast.durations.SHORT,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: i * Toast.durations.SHORT,
			});
			i++;
		}
	}

	static showToast(message) {
		Toast.show(message, {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
		});
	}


	static validateEmail(email) {
		let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
		return reg.test(email) === true;
	}

	static createFormData = (photo, type, body) => {
		const formData = new FormData();

		formData.append('photo', {
			type: type,
			uri: Platform.OS === "android" ? photo : photo.replace("file://", ''),
			mineType: type,
			fileType: type,
			name: photo.substring(photo.lastIndexOf('/') + 1),
			filename: photo.substring(photo.lastIndexOf('/') + 1)
		});

		Object.keys(body).forEach(key => {
			formData.append(key, body[key]);
		});

		return formData;
	};

	static showProgress(title, subTitle, style = 'progress', cancellable = true, confirmButtonTitle = 'OK', confirmButtonColor = "#000000", barColor = '#000000', otherButtonTitle = 'Cancel', otherButtonColor = '#dedede') {
		if (Platform.OS === 'ios') {
			store.dispatch({type: SHOW_PROGRESS_DIALOG, payload: {title: title, description: subTitle}});
		} else {
			SweetAlert.showAlertWithOptions({
					title: title,
					subTitle: subTitle,
					confirmButtonTitle: confirmButtonTitle,
					confirmButtonColor: confirmButtonColor,
					barColor: barColor,
					otherButtonTitle: otherButtonTitle,
					otherButtonColor: otherButtonColor,
					style: style,
					cancellable: cancellable
				},
				callback => console.log('callback'));
		}
	}

	static hideProgress() {
		if (Platform.OS === 'ios') {
			store.dispatch({type: HIDE_PROGRESS_DIALOG});
		} else {
			SweetAlert.dismissAlert();
		}
	}


}

export default Utils;
