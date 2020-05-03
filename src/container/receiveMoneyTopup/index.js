import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
	Share
} from 'react-native';
import { styles } from './styles';
import { CustomButton } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { Text } from 'react-native-elements';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import Ripple from 'react-native-material-ripple';

export default class ReceiveMoneyTopup extends Component {
	state = {
		password: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Receive via Top-up"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}

					<View style={[containers.commonBg, { padding: 20 }]}>
						<View style={{ alignSelf: 'center', marginTop: 10 }}>
							<Text style={styles.titleStyle}>Receive:</Text>
							<Text style={styles.textAmountCurrency}>$47</Text>
							<Text style={styles.titleText}>Description</Text>
						</View>

						<CustomButton
							onPress={() => this.onClickPayViaBank()}
							title="Pay via Bank"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 25 }}
						/>
						<CustomButton
							onPress={() => this.onClickPayViaCreditCredit()}
							title="Pay via Credit Card"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 25 }}
						/>
						<CustomButton
							onPress={() => this.onClickPayViaWallet()}
							title="Pay via Wallet"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 25 }}
						/>
						<CustomButton
							onPress={() => this.onClickPayViaCrypto()}
							title="Pay via Crypto"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 25 }}
						/>
						<CustomButton
							onPress={() => {}}
							title="Send Directly"
							titleStyle={{ color: 'white' }}
							buttonStyle={widgets.commonDisabledBtnStyleWithBorder}
							containerStyle={{ marginTop: 25 }}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	onClickPayViaBank() {
		this.props.navigation.navigate('ReceiveMoneyTopupPayViaBank');
	}

	onClickPayViaCreditCredit() {
		this.props.navigation.navigate('ReceiveMoneyTopupPayViaCreditCard');
	}

	onClickPayViaWallet() {
		this.props.navigation.navigate('ReceiveMoneyTopupPayViaWallet');
	}

	onClickPayViaCrypto() {
		this.props.navigation.navigate('ReceiveMoneyTopupPayViaCrypto');
	}
}
