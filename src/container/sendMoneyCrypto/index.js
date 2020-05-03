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
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { sendToCrypto } from '../../actions';
import { containers, TIPPER, widgets } from '../../styles';
import { Form, Input, Item, Picker } from 'native-base';
import Database from '../../utils/Database';
import { CustomButton } from '../../components/common';
import { Header } from 'react-navigation';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import colors from '../../theme/colors';
import Ripple from 'react-native-material-ripple';

class SendMoneyCrypto extends Component {
	constructor(props, context, state) {
		super(props, context);
		let sliderIndex = props.navigation.getParam('sliderIndex', null);
		let initCard = props.navigation.getParam('card', null);
		let dashboard = props.navigation.getParam('dashboard', null);
		let paymentMethods = dashboard.paymentMethods;
		this.state = {
			card: initCard,
			sliderIndex: sliderIndex,
			dashboard: dashboard,
			paymentMethods: paymentMethods,
			currency: '',
			amount: '',
			address: '',
			description: ''
		};
	}

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Send Money to Crypto"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={containers.commonBg}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<View style={styles.container}>
						{this.renderHeader()}
						<ScrollView>
							<View style={styles.bodyContainer}>
								<Form>
									<Text style={widgets.commonText}>Currency</Text>
									<Item
										picker
										style={[
											widgets.formPickerItem,
											widgets.formItemMargin,
											{ marginTop: 5, marginBottom: 5 }
										]}
									>
										<Picker
											mode="dropdown"
											iosIcon={<Icon name="chevron-down" type="Entypo" />}
											style={{ width: undefined }}
											placeholder="Currency"
											placeholderStyle={{ color: '#bfc6ea' }}
											placeholderIconColor="#007aff"
											selectedValue={this.state.currency}
											onValueChange={currency => this.setState({ currency })}
										>
											{Database.getCustcryptoCurrenciesAvailable().map(
												prepaidCurrencyAvailable => (
													<Picker.Item
														label={prepaidCurrencyAvailable.name}
														value={prepaidCurrencyAvailable.name}
													/>
												)
											)}
										</Picker>
									</Item>

									<Text style={widgets.commonText}>Amount</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.amount}
											onChangeText={amount => this.setState({ amount })}
											placeholder="0.0"
											placeholderTextColor="#C0C0C0"
										/>
									</Item>

									<Text style={widgets.commonText}>Wallet Address</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.address}
											onChangeText={address => this.setState({ address })}
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

									<Text style={widgets.commonText}>Description</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.description}
											onChangeText={description =>
												this.setState({ description })
											}
										/>
									</Item>

									<CustomButton
										onPress={() => this.onClickGo()}
										title="Send"
										titleStyle={{ color: TIPPER }}
										buttonStyle={widgets.commonBtnStyleWithBorder}
										containerStyle={{ marginTop: 15 }}
									/>
								</Form>
							</View>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}

	onClickGo() {
		Alert.alert(
			'Information',
			`Send ${this.state.amount}  ${this.state.currency} \n from ${this.state.card.name}\nTo ${this.state.address}`,
			[
				{
					text: 'No',
					onPress: () => {}
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.sendToCrypto(
							this.state.card.id,
							this.state.currency,
							this.state.amount,
							this.state.description,
							this.state.address
						);
					}
				}
			],
			{ cancelable: false }
		);
	}
}

const mapStateToProps = state => {
	return {
		// dashboardLoading: state.wallet.dashboardLoading,
	};
};

export default connect(mapStateToProps, { sendToCrypto })(SendMoneyCrypto);
