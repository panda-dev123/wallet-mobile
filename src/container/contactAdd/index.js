import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { addContactByEmail, addContactByPhone } from '../../actions';
import { containers, TIPPER, widgets } from '../../styles';
import {
	Form,
	Input,
	Item,
	Header,
	Left,
	Body,
	Title,
	Right
} from 'native-base';
import { CustomButton } from '../../components/common';
import Utils from '../../utils/Utils';
import PhoneInput from 'react-native-phone-input';
import colors from '../../theme/colors';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

class ContactAdd extends Component {
	state = {
		alias: '',
		phone: '',
		email: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Add Contact"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={containers.commonBg}>
				{this.renderHeader()}
				<ScrollView style={{ flex: 1 }}>
					<Form style={{ padding: 20 }}>
						<Text style={widgets.commonText}>Name</Text>
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
								onChangeText={text => this.setState({ alias: text })}
								placeholder="ex. John Smith"
							/>
						</Item>

						<Text style={widgets.commonText}>Phone Number:</Text>
						<Item
							regular
							style={[
								widgets.commonInput,
								widgets.formItemMarginForCardDetails
							]}
						>
							{/*<Input*/}
							{/*	value={this.state.phone}*/}
							{/*	onChangeText={(phone) => this.setState({phone})}*/}
							{/*	placeholder='+11234561234 (optional)'/>*/}
							<PhoneInput
								ref={ref => {
									this.phone = ref;
								}}
								textProps={{ placeholder: 'ex. +12133734253 (optional)' }}
								value={this.state.phone}
								onChangePhoneNumber={number => {
									this.setState({ phone: number });
								}}
								style={{ fontStyle: 'italic', padding: 14 }}
							/>
						</Item>

						<Text style={widgets.commonText}>Email:</Text>
						<Item
							regular
							style={[
								widgets.commonInput,
								widgets.formItemMarginForCardDetails
							]}
						>
							<Input
								value={this.state.email}
								placeholderTextColor="#C0C0C0"
								onChangeText={email => this.setState({ email })}
								placeholder="ex. email@gmail.com (optional)"
							/>
						</Item>

						<CustomButton
							onPress={() => this.onClickGo()}
							title="Add"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					</Form>
				</ScrollView>
			</SafeAreaView>
		);
	}

	onClickGo() {
		if (this.state.alias < 3) {
			Utils.showToast('');
			return;
		}
		if (this.state.email.length < 5 && this.state.phone.length < 5) {
			Utils.showToast('email or phone is required.');
			return;
		}

		if (this.state.email.length > 5 && !Utils.validateEmail(this.state.email)) {
			Utils.showToast('email is not valid');
			return;
		}

		if (this.state.phone.length > 5 && !this.phone.isValidNumber()) {
			Utils.showToast('phone is not valid');
			return;
		}

		if (this.state.email.length > 5) {
			this.props.addContactByEmail(this.state.email, this.state.alias);
		} else {
			this.props.addContactByPhone(this.state.phone, this.state.alias);
		}
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

export default connect(mapStateToProps, {
	addContactByPhone,
	addContactByEmail
})(ContactAdd);
