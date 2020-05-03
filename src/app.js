import React from 'react';
import {StatusBar} from 'react-native';
import Routing from './routing';
import Colors from './theme/colors';
import {connect, Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers";
import AppDialogWrapper from "./appDialogWrapper";
import ReduxThunk from "redux-thunk";
import type {Notification, NotificationOpen} from 'react-native-firebase';
import * as firebase from "react-native-firebase";

StatusBar.setHidden(false);
StatusBar.setBarStyle('dark-content');
StatusBar.setBackgroundColor(Colors.white);

console.disableYellowBox = true;

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends React.Component {

	render() {
		return (
			<Provider store={store}>
				<AppDialogWrapper/>
			</Provider>
		);
	}

	componentDidMount() {
		const channel = new firebase.notifications.Android.Channel('channelId', 'Pharmacy app channel', firebase.notifications.Android.Importance.Max).setDescription('essential notification for app');
		firebase.notifications().android.createChannel(channel);
		console.log('dfsdf ');
		

		this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
			// Process your notification as required
			// ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
		});
		this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
			console.log('onNotification1 ', notification);
			// Process your notification as required
		});
		this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
			// Get the action triggered by the notification being opened
			const action = notificationOpen.action;
			// Get information about the notification that was opened
			const notification: Notification = notificationOpen.notification;
			console.log("notification", notification);
		});
		firebase.notifications().getInitialNotification()
			.then((notificationOpen: NotificationOpen) => {
				if (notificationOpen) {
					// App was opened by a notification
					// Get the action triggered by the notification being opened
					const action = notificationOpen.action;
					// Get information about the notification that was opened
					const notification: Notification = notificationOpen.notification;
				}
			});


		this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
			console.log("firebase 2 ", message);
			console.log("firebase 2 ", message.data.key);
			console.log("firebase 2 ", typeof (message.data.key));

			if (message.data.key == "1") {
				console.log("firebase 2 lets show");

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

		});
	}
	
	componentWillUnmount() {
		this.notificationDisplayedListener();
		this.notificationListener();
		this.removeNotificationOpenedListener();
		this.messageListener();
	}

}


export default App;
