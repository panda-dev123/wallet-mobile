import firebase from 'react-native-firebase';
import type {RemoteMessage} from 'react-native-firebase';

export default async (message: RemoteMessage) => {
	console.log('async RemoteMessage', message);

	if (message.data.key == "1") {
		const notification = new firebase.notifications.Notification()
			.setNotificationId('notificationId')
			.setTitle(message.data.title)
			.setBody(message.data.body)
			.setData(message.data)
			.android.setChannelId('channelId')
			.android.setSmallIcon('ic_launcher');
		firebase.notifications().displayNotification(notification)
			.catch(err => console.error(err));
	}

	return Promise.resolve();
}
