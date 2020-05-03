import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	Linking,
	Dimensions
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SyncStorage from 'sync-storage';
import Database from '../../utils/Database';
import { Header } from 'native-base';
import colors from '../../theme/colors';

const slides = [
	{
		key: 'somethun',
		title: 'Welcome to TFX Wallet',
		text: 'All your payment methods in one app!',
		icon: 'security',
		backgroundColor: '#59b2ab'
	},
	{
		key: 'somethun-dos',
		title: 'Pay anyone with anything',
		text:
			'Pay your across borders by any means: credit/debit card, bank, peer to peer, loyalty & crypto!',
		icon: 'clock-fast',
		backgroundColor: '#febe29'
	},
	{
		key: 'somethun1',
		title: 'Start using TFX Wallet today!',
		text:
			'Just fill in some basic information and we will have you up and running in minutes!',
		icon: 'cash-multiple',
		backgroundColor: '#22bcb5'
	}
];

export default class Intro extends Component {
	_renderItem = ({ item, dimensions }) => (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
				width: dimensions.width,
				backgroundColor: item.backgroundColor
			}}
		>
			<Icon name={item.icon} size={200} color="white" />
			<View>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		</View>
	);

	_onDone = () => {
		Database.setIntroDone();
		this.props.navigation.pop();
		this.props.navigation.navigate('OTPScreen');
	};

	render() {
		return (
			<AppIntroSlider
				renderItem={this._renderItem}
				slides={slides}
				onDone={this._onDone}
			/>
		);
	}
}
