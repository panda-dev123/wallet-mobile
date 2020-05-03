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
	TouchableOpacity,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions
} from 'react-native';
import { styles } from './styles';
import { Header, NavigationActions, StackActions } from 'react-navigation';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { createSession, getAvailableRegions, signUp } from '../../actions';
import Utils from '../../utils/Utils';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { widgets, text, containers } from '../../styles';
import { CustomButton } from '../../components/common';
import Database from '../../utils/Database';

const countries = [
	// {
	// 	label: 'England',
	// 	value: '44',
	// },
	{
		label: 'Netherlands',
		value: 'NL'
	},
	{
		label: 'Spain',
		value: 'spain'
	},
	{
		label: 'United Sates',
		value: 'US'
	}
];

class signUpComponent extends Component {
	state = {
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		street: '',
		houseNumber: '',
		postcode: '',
		city: '',
		state: '',
		country: countries[0].value
	};

	constructor(props, context, state) {
		super(props, context);
		this.props.getAvailableRegions();
	}

	renderHeader() {
		return (
			<View style={styles.header}>
				<View style={styles.headerItemMiddle}>
					<Image
						style={styles.logo}
						resizeMode="contain"
						source={require('../../assets/images/logo-small.png')}
					/>
				</View>
			</View>
		);
	}

	render() {
		return (
			<View style={containers.commonBg}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<ScrollView>
						<View style={containers.commonBg}>
							<View style={styles.bodyContainer}>
								<Text style={styles.titleText}>
									Please complete the following details to complete signup:
								</Text>

								<Form>
									<Text style={widgets.commonText}>First Name</Text>
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
									</Item>

									<Text style={widgets.commonText}>Middle Name</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.middleName}
											onChangeText={text => this.setState({ middleName: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>Last Name</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.lastName}
											onChangeText={text => this.setState({ lastName: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>Email address</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.email}
											onChangeText={text => this.setState({ email: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>Street</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.street}
											onChangeText={text => this.setState({ street: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>House Number</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.houseNumber}
											onChangeText={text =>
												this.setState({ houseNumber: text })
											}
										/>
									</Item>

									<Text style={widgets.commonText}>Post Code</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.postcode}
											onChangeText={text => this.setState({ postcode: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>City</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.city}
											onChangeText={text => this.setState({ city: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>State</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.state}
											onChangeText={text => this.setState({ state: text })}
										/>
									</Item>

									<Text style={widgets.commonText}>Country</Text>
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
											{this.props.availableRegions.map(availableRegion => (
												<Picker.Item
													label={availableRegion.name}
													value={availableRegion.name}
												/>
											))}
										</Picker>
									</Item>
								</Form>
							</View>
							<View
								style={{
									justifyContent: 'flex-end',
									paddingTop: 10,
									paddingBottom: 20
								}}
							>
								<CustomButton
									onPress={() => this.onClickSubmit()}
									title="Signup"
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
					</ScrollView>
				</KeyboardAvoidingView>
			</View>
		);
	}

	onClickSubmit() {
		if (this.state.firstName.length < 3) {
			Utils.showToast('First name is not long enough!');
			return;
		}
		if (this.state.lastName.length < 3) {
			Utils.showToast('Last name is not long enough!');
			return;
		}
		if (!Utils.validateEmail(this.state.email)) {
			Utils.showToast('Email is not valid!');
		}
		if (this.state.street.length < 3) {
			Utils.showToast('Street is not long enough!');
			return;
		}
		if (this.state.houseNumber.length < 1) {
			Utils.showToast('House number is not long enough!');
			return;
		}
		if (this.state.postcode.length < 1) {
			Utils.showToast('Post code is not long enough!');
			return;
		}
		if (this.state.city.length < 3) {
			Utils.showToast('City is not long enough!');
			return;
		}
		if (this.state.state.length < 3) {
			Utils.showToast('State is not long enough!');
			return;
		}
		Alert.alert(
			'Confirm?',
			'By clicking Yes, you comply to agree with the Terms and Conditions of the app.',
			[
				{ text: 'No', onPress: () => console.log('Cancel Pressed') },
				{ text: 'Yes', onPress: () => this.onClickSubmitSend() }
			],
			{ cancelable: false }
		);
	}

	onClickSubmitSend() {
		this.props.signUp(
			this.state.firstName,
			this.state.middleName,
			this.state.lastName,
			this.state.street,
			this.state.houseNumber,
			this.state.postcode,
			this.state.city,
			this.state.state,
			this.state.country,
			this.state.email
		);
	}
}

const mapStateToProps = state => {
	return {
		availableRegionsLoading: state.user.availableRegionsLoading,
		availableRegions: state.user.availableRegions,
		availableRegionsError: state.user.availableRegionsError
	};
};

export default connect(mapStateToProps, { signUp, getAvailableRegions })(
	signUpComponent
);
