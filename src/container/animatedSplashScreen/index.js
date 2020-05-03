import React, { Component } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';
import { styles } from './styles';
import Database from '../../utils/Database';
import NavigationService from '../../utils/NavigationService';

export default class AnimatedSplashScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Video
					source={require('../../assets/videos/TFX_wallet.mp4')} // Can be a URL or a local file.
					onBuffer={this.onBuffer} // Callback when remote video is buffering
					onError={this.videoError} // Callback when video cannot be loaded
					onEnd={this.onVideoEnd}
					style={styles.backgroundVideo}
					resizeMode="cover"
				/>
			</View>
		);
	}

	onVideoEnd() {
		if (Database.getHasConfirmedOtp()) {
			NavigationService.reset('EnterPinCode', {});
		} else {
			if (Database.isIntroDone() === true) {
				NavigationService.reset('OTPScreen', {});
			} else {
				NavigationService.reset('Intro', {});
			}
		}
	}
}
