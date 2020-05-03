import React, { Component } from 'react';
import {
	Platform,
	Text,
	View,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import { styles } from './styles';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import { widgets, text, containers } from '../../styles';
import { Form, Input, Item, Card, Header, Picker } from 'native-base';
import { CustomButton } from '../../components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import Ripple from 'react-native-material-ripple';

const cryptos = [
	{
		label: 'Bitcoin',
		value: 'btc'
	},
	{
		label: 'Ethereum',
		value: 'eth'
	},
	{
		label: 'Dash',
		value: 'dash'
	}
];

export default class ReceiveMoneyTopupPayViaCrypto extends Component {
	state = {
		crypto: cryptos[0].value
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Top-up via Crypto"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<View style={containers.commonBg}>
				{this.renderHeader()}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<View style={containers.commonBg}>
						<View style={styles.bodyContainer}>
							<View style={{ alignSelf: 'center', marginTop: 10 }}>
								<Text style={styles.titleStyle}>Receive:</Text>
								<Text style={styles.textAmountCurrency}>$47</Text>
								<Text style={styles.titleText}>Description</Text>
							</View>
							<Form>
								<Text style={widgets.commonText}>Currency</Text>
								<Item
									picker
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Picker
										mode="dropdown"
										iosIcon={<Icon name="chevron-down" type="Entypo" />}
										style={{ width: undefined }}
										placeholder="Country"
										placeholderStyle={{ color: '#bfc6ea' }}
										placeholderIconColor="#007aff"
										selectedValue={this.state.country}
										onValueChange={value => {
											console.log(value);
											this.setState({ country: value });
										}}
									>
										{cryptos.map(crypto => (
											<Picker.Item label={crypto.label} value={crypto.value} />
										))}
									</Picker>
								</Item>

								<Text style={widgets.commonText}>Address:</Text>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
									/>
									<Ripple
										onPress={() => {
											this.props.navigation.navigate('ScanQR');
										}}
									>
										<Icon
											color={colors.buttonBackgroundColor}
											style={{ marginLeft: 5, fontSize: 22 }}
											name="qrcode-scan"
										/>
									</Ripple>
								</Item>
							</Form>
						</View>
						<View
							style={{
								alignItems: 'stretch',
								flexDirection: 'column',
								paddingTop: 10,
								paddingBottom: 20
							}}
						>
							<CustomButton
								onPress={() => this.onClickSubmit()}
								title="Pay Now"
								titleStyle={widgets.commonBtnTitleStyle}
								buttonStyle={widgets.commonBtnStyle}
								containerStyle={{
									marginTop: 15,
									marginLeft: 10,
									marginRight: 10
								}}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		);
	}

	onClickPayNow() {
		this.props.navigation.pop(3);
	}
}
