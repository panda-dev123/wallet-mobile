import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import colors from './theme/colors';
import iconBack from './assets/icons/icon_back.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import {
	createAppContainer,
	createSwitchNavigator,
	createStackNavigator,
	createBottomTabNavigator,
	createDrawerNavigator
} from 'react-navigation';

import {
	Splash,
	OTPScreen,
	SignUp,
	OtpConfirmation,
	OtpConfirmationEmail,
	CreatePinCode,
	EnterPinCode,
	AddNewPaymentMethod,
	ReceiveMoneyMethod,
	ReceiveMoneyQR,
	ReceiveMoneyLink,
	ReceiveMoneyChooseAgent,
	Home,
	SendMoney,
	SendMoneyQr,
	SendMoneyChooseAgent,
	SendMoneyLink,
	SendMoneyBank,
	SendMoneyCrypto,
	Intro,
	Kyc,
	Contacts,
	ContactInfo,
	ContactEdit,
	AddCard,
	AddCardOptions,
	AddCardConfirm,
	AddBank,
	AddPrePaid,
	AddCrypto,
	AddAtivosCoin,
	ReceiveMoneyTopup,
	ReceiveMoneyTopupPayViaBank,
	ReceiveMoneyTopupPayViaCreditCard,
	ReceiveMoneyTopupPayViaWallet,
	ReceiveMoneyTopupPayViaCrypto,
	SendMoneyTopup,
	SendMoneyCard,
	SendMoneyTopupPayViaBank,
	SendMoneyTopupPayViaCreditCard,
	SendMoneyTopupPayViaCrypto,
	SendMoneyTopupPayViaWallet,
	Pairing,
	EditPaymentMethod,
	ExchangeFunds,
	Setting,
	ContactRequestMoney,
	ContactSendMoney,
	ScanQR,
	SetUpBiometrics,
	ContactAdd,
	SendMoneyContact,
	ChooseContact
} from './container';

import AnimatedSplashScreen from './container/animatedSplashScreen/index';
import PairingQR from './container/pairingQR/index';
import NavigationService from './utils/NavigationService';

const TabNavigator = createBottomTabNavigator(
	{
		Home: Home,
		Contacts: Contacts,
		Pairing: Pairing,
		Settings: Setting
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				let iconColor = focused ? colors.navBarColor : colors.black;
				if (routeName === 'Home') {
					iconName = `home${focused ? '' : '-outline'}`;
					return <Icon name={iconName} size={28} color={iconColor} />;
				} else if (routeName === 'Contacts') {
					iconName = `account${focused ? '' : '-outline'}`;
					return <Icon name={iconName} size={30} color={iconColor} />;
				} else if (routeName === 'Pairing') {
					iconName = focused
						? 'checkbox-multiple-marked'
						: 'checkbox-multiple-blank-outline';
					return <Icon name={iconName} size={25} color={iconColor} />;
				} else {
					iconName = `settings${focused ? '' : '-outline'}`;
					return <Icon name={iconName} size={27} color={iconColor} />;
				}
			}
		}),
		tabBarOptions: {
			activeTintColor: colors.navBarColor,
			inactiveTintColor: colors.black,
			labelStyle: { fontSize: 13 },
			style: { height: 60 },
			allowFontScaling: true
		}
	}
);

const AppNavigator = createStackNavigator(
	{
		SplashScreen: Splash,
		AnimatedSplashScreen: AnimatedSplashScreen,
		EnterPinCode: EnterPinCode,
		OTPScreen: OTPScreen,
		OtpConfirmation: OtpConfirmation,
		CreatePinCode: CreatePinCode,
		SignUp: SignUp,
		OtpConfirmationEmail: OtpConfirmationEmail,
		mainTabs: TabNavigator,
		AddNewPaymentMethod: AddNewPaymentMethod,
		ReceiveMoneyMethod: ReceiveMoneyMethod,
		ReceiveMoneyQR: ReceiveMoneyQR,
		ReceiveMoneyLink: ReceiveMoneyLink,
		ReceiveMoneyChooseAgent: ReceiveMoneyChooseAgent,
		SendMoney: SendMoney,
		SendMoneyQr: SendMoneyQr,
		SendMoneyChooseAgent: SendMoneyChooseAgent,
		SendMoneyLink: SendMoneyLink,
		SendMoneyBank: SendMoneyBank,
		SendMoneyCrypto: SendMoneyCrypto,
		Intro: Intro,
		Kyc: Kyc,
		Contacts: Contacts,
		ContactAdd: ContactAdd,
		ContactInfo: ContactInfo,
		ContactEdit: ContactEdit,
		AddCard: AddCard,
		AddCardOptions: AddCardOptions,
		AddCardConfirm: AddCardConfirm,
		AddBank: AddBank,
		AddPrePaid: AddPrePaid,
		AddCrypto: AddCrypto,
		AddAtivosCoin: AddAtivosCoin,
		ReceiveMoneyTopup: ReceiveMoneyTopup,
		ReceiveMoneyTopupPayViaBank: ReceiveMoneyTopupPayViaBank,
		ReceiveMoneyTopupPayViaCreditCard: ReceiveMoneyTopupPayViaCreditCard,
		ReceiveMoneyTopupPayViaWallet: ReceiveMoneyTopupPayViaWallet,
		ReceiveMoneyTopupPayViaCrypto: ReceiveMoneyTopupPayViaCrypto,
		SendMoneyTopup: SendMoneyTopup,
		SendMoneyCard: SendMoneyCard,
		SendMoneyTopupPayViaBank: SendMoneyTopupPayViaBank,
		SendMoneyTopupPayViaCreditCard: SendMoneyTopupPayViaCreditCard,
		SendMoneyTopupPayViaCrypto: SendMoneyTopupPayViaCrypto,
		SendMoneyTopupPayViaWallet: SendMoneyTopupPayViaWallet,
		Pairing: Pairing,
		PairingQR: PairingQR,
		EditPaymentMethod: EditPaymentMethod,
		ExchangeFunds: ExchangeFunds,
		Setting: Setting,
		ContactRequestMoney: ContactRequestMoney,
		ContactSendMoney: ContactSendMoney,
		ScanQR: ScanQR,
		SetUpBiometrics: SetUpBiometrics,
		SendMoneyContact: SendMoneyContact,
		ChooseContact: ChooseContact
	},
	{
		initialRouteName: 'SplashScreen',
		// initialRouteName: "mainTabs",
		// initialRouteName: "SetUpBiometrics",
		headerMode: 'none'
	}
);

// export default createAppContainer(AppNavigator);
const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
	render() {
		return (
			<AppContainer
				ref={navigatorRef => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	icon: { height: 22, width: 22 }
});
