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
	Share
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import { CustomButton, Card } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { Text } from 'react-native-elements';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import Ripple from 'react-native-material-ripple';

export default class Pairing extends Component {
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
						Pair with user
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
					<Card
						addStyle={[
							containers.screenHeight,
							widgets.centerView,
							{ padding: 15, margin: 15 }
						]}
					>
						<View>
							<Text h4 style={[text.centerText, { color: colors.black }]}>
								Pairing
							</Text>

							<CustomButton
								onPress={() => this.onClickScanQR()}
								title="Scan QR"
								titleStyle={widgets.commonBtnTitleStyle}
								buttonStyle={widgets.commonBtnStyle}
								containerStyle={{ marginTop: 25 }}
							/>

							<CustomButton
								onPress={() => this.onClickShowQR()}
								title="Show QR"
								titleStyle={widgets.commonBtnTitleStyle}
								buttonStyle={widgets.commonBtnStyle}
								containerStyle={{ marginTop: 25 }}
							/>

							<CustomButton
								onPress={() => this.onClickBLE()}
								title="BLE"
								titleStyle={widgets.commonBtnTitleStyle}
								buttonStyle={widgets.commonBtnStyle}
								containerStyle={{ marginTop: 25 }}
							/>
						</View>
					</Card>
				</View>
			</SafeAreaView>
		);
	}

	onClickScanQR() {
		this.props.navigation.navigate('ScanQR');
	}

	onClickShowQR() {
		//this.props.navigation.navigate('PairingQR');
	}

	onClickBLE() {}
}
