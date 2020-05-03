import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
	Dimensions
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Toast from 'react-native-root-toast';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Card } from 'native-base';
import { widgets, text, containers } from '../../styles';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

const SCREEN_HEIGHT = Dimensions.get('window').height;
export default class ScanQR extends Component {
	state = {};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Scan QR"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<Card style={styles.bodyContainer}>
						<View
							style={{
								alignItems: 'flex-start',
								flexDirection: 'column'
							}}
						>
							<QRCodeScanner
								showMarker
								onRead={this.onSuccess}
								cameraStyle={{ height: SCREEN_HEIGHT }}
								customMarker={
									<View style={styles.rectangleContainer}>
										<View style={styles.topOverlay}>
											<Text style={{ fontSize: 20, color: 'white' }}>
												ALIGN QR TO CENTER
											</Text>
										</View>

										<View style={{ flexDirection: 'row' }}>
											<View style={styles.leftAndRightOverlay} />

											<View style={styles.rectangle}></View>

											<View style={styles.leftAndRightOverlay} />
										</View>

										<View style={styles.bottomOverlay} />
									</View>
								}
							/>
						</View>
					</Card>
				</View>
			</SafeAreaView>
		);
	}

	onClickSave() {
		this.props.navigation.pop();
		Toast.show('Contact saved successfully', {
			duration: Toast.durations.LONG,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 0
		});
	}

	onSuccess = e => {
		Linking.openURL(e.data).catch(err =>
			console.error('An error occured', err)
		);
	};
}
