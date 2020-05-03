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
	ScrollView
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import { SendMoney } from '../index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import { CustomButton } from '../../components/common';
import { containers, TIPPER, widgets } from '../../styles';
import {
	Form,
	Input,
	Item,
	Picker,
	Header,
	Left,
	Body,
	Right,
	Title
} from 'native-base';
import Database from '../../utils/Database';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class AddNewPaymentMethod extends Component {
	state = {
		password: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Add Payment Method"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={containers.commonBg}>
				{this.renderHeader()}

				<Form style={{ padding: 20 }}>
					<Text style={styles.titleText}> Please choose any method:</Text>
					{Database.isCardAvailable() && (
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('AddCard');
							}}
							title="Payment Card"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					)}
					{Database.isBankAvailable() && (
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('AddBank');
							}}
							title="Bank Acount"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					)}
					{Database.isPrepaidAvailable() && (
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('AddPrePaid');
							}}
							title="Prepaid Account"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					)}
					{Database.isAtivosAvailable() && (
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('AddAtivosCoin');
							}}
							title="TFX Coin"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					)}

					{Database.isCustcryptoAvailable() && (
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('AddCrypto');
							}}
							title="Crypto Cash"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					)}
				</Form>
			</SafeAreaView>
		);
	}
}
