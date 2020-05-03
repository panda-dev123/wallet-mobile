import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	TextInput,
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import { Header, NavigationActions, StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';
import { resendSMS, verifyMobile, verifySms } from '../../actions';
import { CustomButton, Card } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { Text } from 'react-native-elements';

class OtpConfirmation extends Component {
	haveSentSms = false;

	state = {
		otp: '',
		timer: 60
	};

	componentDidMount() {
		this.startCountDown();
	}

	startCountDown() {
		this.clockCall = setInterval(() => {
			this.decrementClock();
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.clockCall);
	}

	decrementClock = () => {
		if (this.state.timer > 0) {
			this.setState(prevstate => ({ timer: prevstate.timer - 1 }));
		}
	};

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
								widgets.centerView,
								{ marginTop: 5, marginBottom: 5 }
							]}
						>
							{this.renderHeader()}

							<Text style={[text.selectPintitle, text.centerText]}>
								{`Please enter One Time Password\nsent to your number.`}
							</Text>

							{this.props.error === '' ? null : (
								<Text style={styles.errorTextStyle}>{this.props.error}</Text>
							)}

							<View style={styles.containerInput}>
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
									value={this.state.otp}
									onTextChange={text => this.setState({ otp: text })}
								/>
							</View>

							<View style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
								<CustomButton
									onPress={() => this.onClickNext()}
									title="Next"
									titleStyle={{ color: 'white' }}
									buttonStyle={widgets.commonBtnStyle}
								/>

								<CustomButton
									onPress={() => this.onClickResendOtp()}
									title={
										this.state.timer > 0
											? 'Resend OTP (' + this.state.timer + 's)'
											: 'Resend OTP'
									}
									titleStyle={{ color: 'white' }}
									buttonStyle={
										this.state.timer > 0
											? widgets.commonDisabledBtnStyleWithBorder
											: widgets.warningBtnStyle
									}
									containerStyle={{ marginTop: 15 }}
								/>
							</View>
						</Card>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</View>
		);
	}

	onClickNext() {
		if (this.isOtpValid()) {
			this.props.verifySms(this.state.otp);
			this.haveSentSms = true;
		} else {
			Toast.show('OTP length is 4', {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0
			});
		}
	}

	onClickResendOtp() {
		if (this.state.timer <= 0) {
			this.setState({ timer: 60 });
			if (this.haveSentSms) {
				this.props.resendSMS();
			} else {
				this.haveSentSms = true;
				this.props.verifySms(1111, true);
			}
		}
	}

	isOtpValid() {
		return this.state.otp.length === 4;
	}
}

const mapStateToProps = state => {
	return {
		error: state.user.otpConfirmationError
	};
};

export default connect(mapStateToProps, { verifySms, resendSMS })(
	OtpConfirmation
);
