import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	Alert
} from 'react-native';
import { styles } from './styles';
import { Header, NavigationActions, StackActions } from 'react-navigation';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from 'react-native-phone-input';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { createSession, setBiometrics, verifyMobile } from '../../actions';
import Biometrics from 'react-native-biometrics';
import NavigationService from '../../utils/NavigationService';
import Database from '../../utils/Database';
import { CustomButton, Card } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { Text } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

class SetUpBiometrics extends Component {
	state = {
		touchId: false,
		faceId: false,
		touchIdDone: false,
		faceIdDone: false
	};

	componentDidMount() {
		Biometrics.isSensorAvailable().then(biometryType => {
			if (biometryType === Biometrics.TouchID && Database.getLoginTouchId()) {
				this.setState({ touchId: true });
				console.log('TouchID is supported');
			} else if (
				biometryType === Biometrics.FaceID &&
				Database.getLoginFaceId()
			) {
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
				<Text style={[text.selectPintitle, text.centerText]}>
					{`Select supported biometrics\nto add in login.`}
				</Text>
			</View>
		);
	}

	render() {
		if (this.phone !== undefined) {
			console.log('isvalid', this.phone.isValidNumber());
			console.log('isvalid', this.state.phone);
			console.log('isvalid', this.phone.getValue());
			console.log('isvalid', this.phone.getCountryCode());
		}

		return (
			<View style={containers.common3}>
				<SafeAreaView style={containers.commonFlex}>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : null}
						keyboardVerticalOffset={Header.HEIGHT + 20}
						style={containers.commonFlex}
					>
						<Card
							addStyle={[
								containers.screenHeight,
								{ marginTop: 5, marginBottom: 5 }
							]}
						>
							{this.renderHeader()}

							<View
								style={{
									flex: 1,
									alignItems: 'center',
									flexDirection: 'row',
									justifyContent: 'space-evenly'
								}}
							>
								{this.state.touchId ? (
									<Ripple onPress={() => this.onClickLinkTouchId()}>
										<Icon
											color={colors.navBarColor}
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
											color={colors.navBarColor}
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
							<View style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
								<CustomButton
									onPress={() => this.onClickNext()}
									title="Next"
									titleStyle={widgets.commonBtnTitleStyle}
									buttonStyle={widgets.commonBtnStyle}
									containerStyle={{ marginTop: 15 }}
								/>
							</View>
						</Card>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</View>
		);
	}

	onClickLinkTouchId() {
		Biometrics.createKeys('Confirm fingerprint').then(publicKey => {
			console.log(publicKey);
			this.setState({ touchIdDone: true });
			this.props.setBiometrics(publicKey);
			Database.saveLoginTouchId(true);
		});
	}

	onClickLinkFaceId() {
		Biometrics.createKeys('Confirm face id').then(publicKey => {
			console.log(publicKey);
			this.setState({ faceIdDone: true });
			this.props.setBiometrics(publicKey);
			Database.saveLoginFaceId(true);
		});
	}

	onClickNext() {
		if (this.state.touchIdDone || this.state.faceIdDone) {
			Alert.alert(
				'Are you sure?',
				'No biometrics is selected are you sure?',
				[
					{
						text: 'No',
						onPress: () => {}
					},
					{
						text: 'Yes',
						onPress: () => {
							this.onNext();
						}
					}
				],
				{ cancelable: false }
			);
		} else {
			this.onNext();
		}
	}

	onNext() {
		NavigationService.navigate('SignUp', {});
	}
}

export default connect(null, { setBiometrics })(SetUpBiometrics);
