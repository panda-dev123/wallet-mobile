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
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconLock from '../../assets/images/icon_lock.png';
import logo from '../../assets/images/logo-small.png';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { loginBiometrics, loginPin, resendSMS, verifySms } from '../../actions';
import Utils from '../../utils/Utils';
import Biometrics from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import { widgets, containers } from '../../styles';
import { Header } from 'react-navigation';
import { CustomButton, Card } from '../../components/common';
import Ripple from 'react-native-material-ripple';

class EnterPinCode extends Component {
	state = {
		pin: '1234',
		touchId: false,
		faceId: false,
		touchIdDone: false,
		faceIdDone: false
	};

	componentDidMount() {
		Biometrics.isSensorAvailable().then(biometryType => {
			if (biometryType === Biometrics.TouchID) {
				this.setState({ touchId: true });
				console.log('TouchID is supported');
			} else if (biometryType === Biometrics.FaceID) {
				this.setState({ faceId: true });
				console.log('FaceID is supported');
			} else {
				this.setState({ touchId: false, faceId: false });
				console.log('Biometrics not supported');
			}
		});
	}

	renderHeader() {
		return (
			<View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
				<Image
					style={widgets.headerLogo}
					resizeMode="contain"
					source={require('../../assets/images/logo.png')}
				/>
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<View style={styles.container}>
						{this.renderHeader()}

						<View style={{ alignItems: 'center' }}>
							<View>
								<Image
									style={styles.icon}
									resizeMode="contain"
									source={iconLock}
								/>
							</View>
							<View style={styles.titleContainer}>
								<Text style={styles.titleStyle}>Enter your PIN</Text>
							</View>
							<SmoothPinCodeInput
								style={{ alignSelf: 'center' }}
								cellSize={36}
								codeLength={4}
								cellStyle={{
									borderBottomWidth: 2,
									borderColor: 'gray'
								}}
								cellStyleFocused={{
									borderColor: 'black'
								}}
								password
								mask="﹡"
								value={this.state.pin}
								onTextChange={pin => this.setState({ pin })}
							/>
						</View>
						<View
							style={{
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'space-evenly'
							}}
						>
							{this.state.touchId ? (
								<Ripple onPress={() => this.onClickLinkTouchId()}>
									<Icon
										color={colors.textInputIconColor}
										size={80}
										name="fingerprint"
									/>
									{this.state.touchIdDone ? (
										<Icon
											style={{
												color: '#228B22',
												fontSize: 35,
												marginTop: -10,
												alignSelf: 'center'
											}}
											name="check"
										/>
									) : null}
								</Ripple>
							) : null}
							{this.state.faceId ? (
								<Ripple onPress={() => this.onClickLinkFaceId()}>
									<Icon
										color={colors.textInputIconColor}
										size={70}
										name="face-recognition"
									/>
									{this.state.faceIdDone ? (
										<Icon
											style={{
												color: '#228B22',
												fontSize: 35,
												marginTop: -10,
												alignSelf: 'center'
											}}
											name="check"
										/>
									) : null}
								</Ripple>
							) : null}
						</View>
						<View style={styles.bodyContainer}>
							<View style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
								<CustomButton
									onPress={() => this.loginPin()}
									title="Login"
									titleStyle={widgets.commonBtnTitleStyle}
									buttonStyle={widgets.commonBtnStyle}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => this.loginPin()}
									title="Forgot PIN"
									titleStyle={widgets.commonBtnTitleStyle}
									buttonStyle={widgets.warningBtnStyle}
									containerStyle={{ marginTop: 15 }}
								/>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}

	onClickLinkTouchId() {
		let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
		let payload = epochTimeSeconds + 'some message';

		Biometrics.createSignature('Sign in', payload).then(signature => {
			console.log(signature);
			this.verifySignatureWithServer(signature, payload);
		});
	}

	onClickLinkFaceId() {
		let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
		let payload = epochTimeSeconds + 'some message';

		Biometrics.createSignature('Sign in', payload).then(signature => {
			console.log(signature);
			this.verifySignatureWithServer(signature, payload);
		});
	}

	verifySignatureWithServer(signature, payload) {
		this.props.loginBiometrics(signature, payload);
	}

	loginPin() {
		if (this.state.pin.length < 4) {
			Utils.showToast('Pin must be 4 digits!');
			return;
		}
		this.props.loginPin(this.state.pin);
	}
}

export default connect(null, { loginPin, loginBiometrics })(EnterPinCode);
