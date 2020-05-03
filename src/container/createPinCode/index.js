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
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconLock from '../../assets/images/icon_lock.png';
import logo from '../../assets/images/logo-small.png';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';
import { resendSMS, setAuth, verifySms } from '../../actions';
import { CustomButton, Card } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { Text } from 'react-native-elements';

class CreatePinCode extends Component {
	state = {
		password: ''
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
								<Text style={styles.titleStyle}>Create new PIN</Text>
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
								value={this.state.password}
								onTextChange={password => this.setState({ password })}
							/>
						</View>
						<View
							style={{
								alignItems: 'center',
								flexDirection: 'row',
								justifyContent: 'space-evenly'
							}}
						></View>
						<View style={styles.bodyContainer}>
							<View style={{ justifyContent: 'flex-end', paddingTop: 20 }}>
								<CustomButton
									onPress={() => this.onClickCreatePin()}
									title="Create PIN"
									titleStyle={widgets.commonBtnTitleStyle}
									buttonStyle={widgets.commonBtnStyle}
									containerStyle={{ marginTop: 15 }}
								/>
							</View>
						</View>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}

	onClickCreatePin() {
		if (this.state.password.length === 4) {
			this.props.setAuth(this.state.password);
			// this.props.navigation.navigate('SignUp')
		} else {
			Toast.show('Please choose a 4-digit PIN', {
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

export default connect(null, { setAuth })(CreatePinCode);
