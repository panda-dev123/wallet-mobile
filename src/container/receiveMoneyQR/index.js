import React, { Component } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
	Card
} from 'native-base';
import colors from '../../theme/colors';
import QRCode from 'react-native-qrcode-svg';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class ReceiveMoneyQR extends Component {
	state = {};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Receive Money by QR"
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
								alignItems: 'flex-start',
								flexDirection: 'column',
								paddingBottom: 20
							}}
						>
							<View style={{ alignSelf: 'center', marginTop: 10 }}>
								<Text style={styles.titleStyle}>Receive:</Text>
								<Text style={styles.textAmountCurrency}>$47</Text>
								<Text style={styles.titleText}>Description</Text>
								<QRCode value="http://awesome.link.qr" size={200} />
							</View>
						</View>
					</Card>
				</View>
			</SafeAreaView>
		);
	}
}
