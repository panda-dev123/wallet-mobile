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
	ScrollView,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import { Header, NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { addCustodianCrypto, addPrepaidAccount } from '../../actions';
import { containers, TIPPER, widgets } from '../../styles';
import { Form, Input, Item, Picker } from 'native-base';
import Database from '../../utils/Database';
import ColorPicker from '../../libraries/color-picker/ColorPicker';
import { CustomButton } from '../../components/common';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

class AddCrypto extends Component {
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
		dayLimit: 0,
		monthLimit: 0,
		currency: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Add Crypto"
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
							<Text style={widgets.commonText}>Name:</Text>
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
									placeholder="ex. John Smith"
									placeholderTextColor="#C0C0C0"
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
									placeholderTextColor="#C0C0C0"
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
									placeholderTextColor="#C0C0C0"
								/>
							</Item>

							<CustomButton
								onPress={() => this.onClickGo()}
								title="Submit"
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
			'Confirmation',
			'Are you sure you want to submit?',
			[
				{
					text: 'No'
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.addCustodianCrypto(
							'custcrypto',
							this.state.currency,
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

const mapStateToProps = state => {
	return {
		// error: state.user.otpConfirmationError,
	};
};

export default connect(mapStateToProps, { addCustodianCrypto })(AddCrypto);
