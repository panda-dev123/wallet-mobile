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
import { Header, NavigationActions, StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import Toast from 'react-native-root-toast';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';
import { resendEmail, resendSMS, verifyEmail, verifySms } from '../../actions';
import Utils from '../../utils/Utils';
import { CustomButton, Card } from '../../components/common';
import { widgets, containers, text } from '../../styles';

class OtpEmailConfirmation extends Component {
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
								{`Please enter the code sent \n on your email.`}
							</Text>

							<View
								style={{
									alignItems: 'center',
									flexDirection: 'column',
									justifyContent: 'center'
								}}
							>
								<View>
									{/*<View style={[this.isOtpValid() ? styles.containerInput : styles.containerInputWrong]}>*/}
									{/*<Icon color={colors.textInputIconColor} size={28} name="lock-outline"/>*/}
									{/*<TextInput*/}
									{/*	placeholder='Enter Code'*/}
									{/*	multiline={false}*/}
									{/*	style={styles.inputStyle}*/}
									{/*	selectionColor={colors.textInputUnderline}*/}
									{/*	keyboardType={'decimal-pad'}*/}
									{/*	onChangeText={(text) => this.setState({otp: text})}*/}
									{/*	underlineColorAndroid={colors.textInputUnderline}/>*/}

									<SmoothPinCodeInput
										style={{ alignSelf: 'center' }}
										cellSize={36}
										codeLength={4}
										value={this.state.otp}
										cellStyle={{
											borderBottomWidth: 2,
											borderColor: 'gray'
										}}
										cellStyleFocused={{
											borderColor: 'black'
										}}
										onTextChange={text => this.setState({ otp: text })}
									/>
								</View>
								{this.props.error === '' ? null : (
									<Text style={styles.errorTextStyle}>{this.props.error}</Text>
								)}
							</View>
							<View style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
								<CustomButton
									onPress={() => this.onClickNext()}
									title="Next"
									titleStyle={widgets.commonBtnTitleStyle}
									buttonStyle={widgets.commonBtnStyle}
									containerStyle={{ marginTop: 15 }}
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
			this.props.verifyEmail(this.state.otp);
		} else {
			Utils.showToast('OTP length is 4');
		}
	}

	onClickResendOtp() {
		if (this.state.timer <= 0) {
			this.setState({ timer: 60 });
			this.props.resendEmail();
		}
	}

	isOtpValid() {
		return this.state.otp.length === 4;
	}
}

const mapStateToProps = state => {
	return {
		error: state.user.otpEmailConfirmationError
	};
};

export default connect(mapStateToProps, { verifyEmail, resendEmail })(
	OtpEmailConfirmation
);
