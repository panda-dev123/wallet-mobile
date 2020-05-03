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
	Text,
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import RNPickerSelect from 'react-native-picker-select';
import { addCard } from '../../actions';
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
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

class AddCard extends Component {
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
		nameOnCard: '',
		panNumber: '',
		cvv: '',
		alias: '',
		month: '',
		year: '',
		dayLimit: 0,
		monthLimit: 0,
		currency: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Add Card"
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
							<Text style={styles.titleText}>Enter card details below</Text>

							<Text style={widgets.commonText}>Alias:</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.alias}
									placeholderTextColor="#C0C0C0"
									onChangeText={alias => this.setState({ alias })}
									placeholder="ex. My Card 1"
								/>
							</Item>

							<Text style={widgets.commonText}>Name on Card:</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.nameOnCard}
									placeholderTextColor="#C0C0C0"
									onChangeText={nameOnCard => this.setState({ nameOnCard })}
									placeholder="ex. John Smith"
								/>
							</Item>

							<Text style={widgets.commonText}>PAN Number:</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.panNumber}
									placeholderTextColor="#C0C0C0"
									onChangeText={panNumber => this.setState({ panNumber })}
									placeholder="1234567890"
								/>
							</Item>

							<Text style={widgets.commonText}>Expiry Date:</Text>
							<View style={{ flexDirection: 'row' }}>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails,
										{ flex: 1 }
									]}
								>
									<Input
										value={this.state.month}
										placeholderTextColor="#C0C0C0"
										onChangeText={month => this.setState({ month })}
										placeholder="Month"
									/>
								</Item>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails,
										{ flex: 1 }
									]}
								>
									<Input
										value={this.state.year}
										placeholderTextColor="#C0C0C0"
										onChangeText={year => this.setState({ year })}
										placeholder="Year"
									/>
								</Item>
							</View>

							<Text style={widgets.commonText}>CVV:</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input
									value={this.state.cvv}
									placeholderTextColor="#C0C0C0"
									onChangeText={cvv => this.setState({ cvv })}
									placeholder="123"
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
									{Database.getCardCurrenciesAvailable().map(
										prepaidCurrencyAvailable => (
											<Picker.Item
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
									placeholderTextColor="#C0C0C0"
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
									placeholderTextColor="#C0C0C0"
									onChangeText={monthLimit => this.setState({ monthLimit })}
									placeholder="0 (optional)"
								/>
							</Item>

							<CustomButton
								onPress={() => this.onClickScan()}
								title="Scan Card"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>

							<CustomButton
								onPress={() => this.onClickGo()}
								title="Save Card"
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

	onClickScan() {}

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
						let date = '20' + this.state.year + '-' + this.state.month + '-01';
						this.props.addCard(
							'card',
							this.state.currency,
							this.state.nameOnCard,
							this.state.panNumber,
							date,
							this.state.cvv,
							this.state.selectedColor,
							this.state.alias,
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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 17,
		paddingHorizontal: 10,
		marginVertical: 5,
		color: '#000'
	},
	inputAndroid: {
		fontSize: 17,
		paddingHorizontal: 10,
		marginVertical: 5,
		color: '#000'
	}
});

const mapStateToProps = state => {
	return {
		// error: state.user.otpConfirmationError,
	};
};
export default connect(mapStateToProps, { addCard })(AddCard);
