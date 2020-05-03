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
	ScrollView,
	Text,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { addBankAccount } from '../../actions';
import { connect } from 'react-redux';
import ColorPicker from '../../libraries/color-picker/ColorPicker';
import { containers, TIPPER, widgets } from '../../styles';
import {
	Form,
	Input,
	Item,
	Picker,
	Header,
	Left,
	Body,
	Right,
	Title
} from 'native-base';
import Database from '../../utils/Database';
import { CustomButton } from '../../components/common';
import colors from '../../theme/colors';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

const currencies = [
	{
		label: 'Euro',
		value: 'euro'
	},
	{
		label: 'USD',
		value: 'usd'
	},
	{
		label: 'Pound',
		value: 'pound'
	}
];

class AddBank extends Component {
	state = {
		colors: [
			'#F44336',
			'#E91E63',
			'#9C27B0',
			'#673AB7',
			'#3F51B5',
			'#2196F3',
			'#03A9F4',
			'#00BCD4',
			'#009688',
			'#4CAF50',
			'#8BC34A',
			'#CDDC39',
			'#FFEB3B',
			'#FFC107',
			'#FF9800',
			'#FF5722',
			'#795548',
			'#9E9E9E',
			'#607D8B'
		],
		selectedColor: '#F44336',
		alias: '',
		accountName: '',
		accountNumber: '',
		swift: '',
		dayLimit: 0,
		monthLimit: 0,
		currency: currencies[0].value
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Add Bank"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={containers.commonBg}>
				{this.renderHeader()}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<ScrollView style={{ flex: 1 }}>
						<Form style={{ padding: 20 }}>
							<Text style={widgets.commonText}>Nickname</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.alias}
									onChangeText={alias => this.setState({ alias })}
									placeholder="ex. John's Bank 1 (Optional)"
								/>
							</Item>

							<Text style={widgets.commonText}>Account Name</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.accountName}
									onChangeText={accountName => this.setState({ accountName })}
									placeholder="John Smith"
								/>
							</Item>

							<Text style={widgets.commonText}>Account Number</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.accountNumber}
									onChangeText={accountNumber =>
										this.setState({ accountNumber })
									}
									placeholder="123456798123"
								/>
							</Item>

							<Text style={widgets.commonText}>BSB/SWIFT</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.swift}
									onChangeText={swift => this.setState({ swift })}
									placeholder="1234567981"
								/>
							</Item>

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
									{Database.getBankCurrenciesAvailable().map(
										prepaidCurrencyAvailable => (
											<Picker.Item
												key={prepaidCurrencyAvailable.id}
												label={prepaidCurrencyAvailable.name}
												value={prepaidCurrencyAvailable.name}
											/>
										)
									)}
								</Picker>
							</Item>

							<Text style={widgets.commonText}>Select Color:</Text>
							<ColorPicker
								colors={this.state.colors}
								selectedColor={this.state.selectedColor}
								onSelect={selectedColor => this.setState({ selectedColor })}
							/>

							<Text style={widgets.commonText}>Daily Limit:</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.dayLimit}
									onChangeText={dayLimit => this.setState({ dayLimit })}
									placeholder="0 (optional)"
								/>
							</Item>

							<Text style={widgets.commonText}>Monthly Limit:</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.monthLimit}
									onChangeText={monthLimit => this.setState({ monthLimit })}
									placeholder="0 (optional)"
								/>
							</Item>

							<CustomButton
								onPress={() => this.onClickGo()}
								title="Save Bank"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>
						</Form>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}

	onClickGo() {
		Alert.alert(
			'Are you sure?',
			'Are you sure?',
			[
				{
					text: 'No'
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.addBankAccount(
							'bank',
							this.state.selectedColor,
							this.state.alias,
							this.state.currency,
							this.state.accountName,
							this.state.accountNumber,
							this.state.swift,
							this.state.dayLimit,
							this.state.monthLimit
						);
					}
				}
			],
			{ cancelable: true }
		);
	}
}

const mapStateToProps = state => {
	return {
		// error: state.user.otpConfirmationError,
	};
};
export default connect(mapStateToProps, { addBankAccount })(AddBank);
