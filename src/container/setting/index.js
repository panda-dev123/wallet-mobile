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
	Share
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import Ripple from 'react-native-material-ripple';

export default class Setting extends Component {
	state = {};

	renderHeader() {
		return (
			<Header
				style={(styles.header, { backgroundColor: colors.statusBarColor })}
				iosBarStyle="dark-content"
				barStyle="dark-content"
				androidStatusBarColor={colors.statusBarColor}
			>
				<Left style={{ flex: 1 }}>
					<View style={styles.iconBack} />
				</Left>
				<Body style={{ flex: 3, justifyContent: 'center' }}>
					<Title
						style={
							(styles.headerTitle,
							{ alignSelf: 'center', color: colors.navBarColor })
						}
					>
						Settings
					</Title>
				</Body>
				<Right style={{ flex: 1 }}>
					<Ripple></Ripple>
				</Right>
			</Header>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<View style={styles.bodyContainer}>
						<View
							style={{
								alignItems: 'center',
								flexDirection: 'column',
								justifyContent: 'center',
								paddingTop: 20
							}}
						></View>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
