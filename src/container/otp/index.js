import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import { Header, NavigationActions, StackActions } from 'react-navigation';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from 'react-native-phone-input';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { createSession, verifyMobile } from '../../actions';
import { CustomButton } from '../../components/common';
import { widgets, text, containers, FORM_BG } from '../../styles';
import { Card } from '../../components/common';
import { Text } from 'react-native-elements';

class OTPScreen extends Component {
	state = {
		phone: ''
	};

	renderHeader() {
		return (
			<View style={styles.header}>
				<View style={styles.headerItemMiddle}>
					<Image
						style={{ width: 50, height: 50 }}
						resizeMode="contain"
						source={require('../../assets/images/logo-small.png')}
					/>
				</View>
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
					<Card
						addStyle={[
							containers.screenHeight,
							widgets.centerView,
							{ marginTop: 5, marginBottom: 5 }
						]}
					>
						<KeyboardAvoidingView
							behavior={Platform.OS === 'ios' ? 'padding' : null}
							keyboardVerticalOffset={Header.HEIGHT + 20}
							style={containers.commonFlex}
						>
							<View style={containers.commonFlex}>
								<View
									style={{
										justifyContent: 'flex-start',
										alignItems: 'center'
									}}
								>
									<Image
										source={require('../../assets/images/logo.png')}
										style={{
											resizeMode: 'contain',
											width: '90%',
											height: '50%'
										}}
									/>
								</View>
								<Text h4 style={widgets.centerText}>
									Enter Mobile Number
								</Text>
								<Text
									style={[
										text.subTitle,
										widgets.centerText,
										{ paddingTop: 10, paddingBottom: 20 }
									]}
								>{`A One Time Password (OTP)\nSMS will be sent for verification`}</Text>
								<View style={[widgets.centerView]}>
									<View
										style={{
											borderColor: FORM_BG,
											backgroundColor: FORM_BG,
											borderWidth: 1,
											padding: 8,
											marginTop: 10,
											borderRadius: 15
										}}
									>
										<PhoneInput
											ref={ref => {
												this.phone = ref;
											}}
											textProps={{ placeholder: 'Ex. +12133734253' }}
											value={this.state.phone}
											onChangePhoneNumber={number => {
												this.setState({ phone: number });
											}}
											style={{ fontStyle: 'italic' }}
										/>
									</View>
								</View>
							</View>
							<View style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
								<CustomButton
									onPress={() => this.onClickNext()}
									title="Next"
									titleStyle={widgets.commonBtnTitleStyle}
									buttonStyle={widgets.commonBtnStyle}
								/>
							</View>
						</KeyboardAvoidingView>
					</Card>
				</SafeAreaView>
			</View>
		);
	}

	onClickNext() {
		if (this.phone.isValidNumber()) {
			console.log('phone number: ', this.phone.getValue());
			this.props.verifyMobile(this.phone.getValue());
		} else {
			Toast.show('phone number is not valid!', {
				duration: Toast.durations.LONG,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
				delay: 0
			});
		}
	}
}

export default connect(null, { verifyMobile })(OTPScreen);
