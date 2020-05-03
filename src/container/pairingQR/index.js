import React, { Component } from 'react';
import { Text, View, SafeAreaView, TextInput } from 'react-native';
import { styles } from './styles';
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
import QRCode from 'react-native-qrcode-svg';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class PairingQR extends Component {
	state = {};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Pairing QR"
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
								<QRCode value="http://awesome.link.qr" size={300} />
							</View>
						</View>
					</Card>
				</View>
			</SafeAreaView>
		);
	}
}
