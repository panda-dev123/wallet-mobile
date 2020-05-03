import React, {Component} from 'react';
import {
	View,
} from 'react-native';
import SyncStorage from 'sync-storage';
import {createSession} from "../../actions";
import {connect} from "react-redux";

class Splash extends Component {
	async componentWillMount() {
		console.disableYellowBox = true;
		const data = await SyncStorage.init();
		console.log('AsyncStorage is ready!', data);
		this.props.createSession();
	}

	render() {
		return (
			<View/>
		);
	}
}

export default connect(null, {createSession})(Splash);
