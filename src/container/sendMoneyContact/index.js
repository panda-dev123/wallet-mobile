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
import { sendToCrypto, sendToUser } from '../../actions';
import { containers, TIPPER, widgets } from '../../styles';
import { Form, Input, Item, Picker } from 'native-base';
import Database from '../../utils/Database';
import { CustomButton } from '../../components/common';
import { Header } from 'react-navigation';
import Ripple from 'react-native-material-ripple';

class SendMoneyContact extends Component {
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
			description: '',
			contactData: null
		};
	}

	renderHeader() {
		return (
			<View style={styles.header}>
				<Ripple
					onPress={() => {
						this.props.navigation.pop();
					}}
				>
					<Icon
						color={'#fff'}
						style={{ marginLeft: 5, fontSize: 42 }}
						name="chevron-left"
					/>
				</Ripple>
				<Text style={styles.headerTitle}>Send Money To Contact</Text>
				<View style={styles.iconBack} />
			</View>
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
											{[
												...Database.getBankCurrenciesAvailable(),
												...Database.getCustcryptoCurrenciesAvailable()
											].map(prepaidCurrencyAvailable => (
												<Picker.Item
													label={prepaidCurrencyAvailable.name}
													value={prepaidCurrencyAvailable.name}
												/>
											))}
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
										/>
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
											placeholder="Description"
										/>
									</Item>

									<Ripple onPress={() => this.onclickChooseContact()}>
										<Text style={widgets.commonText}>Contact</Text>
										<View
											style={[
												widgets.commonInput,
												widgets.formItemMarginForCardDetails
											]}
										>
											<Text
												style={{
													paddingHorizontal: 10,
													paddingVertical: 14,
													color: '#333',
													fontSize: 16
												}}
											>
												{this.state.contactData === null
													? 'Choose Contact'
													: this.state.contactData.nickName}
											</Text>
										</View>
									</Ripple>

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

	callbackFunction(contactData) {
		console.log(contactData);
		this.setState({ contactData });
	}

	onclickChooseContact() {
		this.props.navigation.navigate('ChooseContact', {
			callback: this.callbackFunction.bind(this)
		});
	}

	onClickGo() {
		Alert.alert(
			'Information',
			`Send ${this.state.amount}  ${this.state.currency} \n from ${this.state.card.name}\nTo ${this.state.contactData.nickName}`,
			[
				{
					text: 'No',
					onPress: () => {}
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.sendToUser(
							this.state.card.id,
							this.state.currency,
							this.state.amount,
							this.state.description,
							this.state.contactData.id
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

export default connect(mapStateToProps, { sendToUser })(SendMoneyContact);
