import React, { Component } from 'react';
import { Text, View, SafeAreaView, Alert } from 'react-native';
import {
	Form,
	Input,
	Item,
	Picker,
	Header,
	Left,
	Body,
	Right,
	Title,
	Card,
	Label
} from 'native-base';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';
import { widgets, text, containers } from '../../styles';
import colors from '../../theme/colors';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import Ripple from 'react-native-material-ripple';

export default class SendMoneyQr extends Component {
	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Send Money via QR"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<Card style={styles.bodyContainer}>
						<View
							style={{
								alignItems: 'stretch',
								flexDirection: 'column',
								marginTop: 30,
								paddingBottom: 20
							}}
						>
							<View
								style={{
									alignSelf: 'center',
									flex: 1,
									width: '80%'
								}}
							>
								<Text style={styles.titleStyle}>Receive:</Text>
								<Text style={styles.textAmountCurrency}>$47</Text>
								<Text style={styles.titleText}>Description</Text>
							</View>
						</View>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Ripple onPress={() => this.onClickCamera()}>
								<Icon name={'qrcode-scan'} style={styles.iconStyle} />
								<Text style={styles.titleText}>Click here to scan QR</Text>
							</Ripple>
						</View>
					</Card>
				</View>
			</SafeAreaView>
		);
	}

	onClickCamera() {
		this.props.navigation.navigate('ScanQR');
		// Alert.alert(
		// 	'Information',
		// 	`Send 50 $\n from My Bank\nTo Code`,
		// 	[
		// 		{text: 'No', onPress: () => this.props.navigation.pop(2)},
		// 		{
		// 			text: 'Yes', onPress: () => {
		// 				Toast.show('Information added Successfully', {
		// 					duration: Toast.durations.LONG,
		// 					position: Toast.positions.BOTTOM,
		// 					shadow: true,
		// 					animation: true,
		// 					hideOnPress: true,
		// 					delay: 0,
		// 					onHide: () => {
		// 						this.props.navigation.pop(2);
		// 					}
		// 				});
		// 			}
		// 		},
		// 	],
		// 	{cancelable: false},
		// );
	}
}
