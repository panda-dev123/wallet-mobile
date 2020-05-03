import React, {Component} from 'react';
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
import {styles} from './styles';
import {NavigationActions, StackActions} from "react-navigation";
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SyncStorage from 'sync-storage';
import Database from "../../utils/Database";

const slides = [
	{
		key: 'somethun',
		title: 'Know Your Customer!',
		text: 'Because of the regulatory in your region, we need a little bit more information before you can use the wallet.',
		icon: 'passport',
		backgroundColor: '#59b2ab',
	},
	{
		key: 'somethun-dos',
		title: 'Identification Document',
		text: 'We require a photo of your passport or ID card. Make sure everything is easy to read.',
		icon: 'passport',
		backgroundColor: '#febe29',
	},
	{
		key: 'somethun1',
		title: 'Your Photo',
		text: 'Then we need a picture of you holding your ID card. Make sure your face is clearly showing both on the document and your head shot.',
		icon: 'face',
		backgroundColor: '#22bcb5',
	}
];

export default class Kyc extends Component {

	_renderItem = ({item, dimensions}) => (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
				width: dimensions.width,
				backgroundColor: item.backgroundColor,
			}}>
			<Icon
				name={item.icon}
				size={200}
				color="white"
			/>
			<View>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		</View>
	);

	_onDone = () => {
		Database.setKycDone();
		//this.props.navigation.pop();
		//this.props.navigation.navigate('OTPScreen');
	};

	render() {
		return <AppIntroSlider
			renderItem={this._renderItem}
			slides={slides}
			onDone={this._onDone}
			doneLabel = "Let's Go"
		/>;
	}

}
