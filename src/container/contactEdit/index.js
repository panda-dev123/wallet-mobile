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

const fromSources = [
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

export default class contactEdit extends Component {
	state = {
		fromSource: fromSources[0].value
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Edit Contact"
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
							onPress={() => this.onClickSave()}
							title="Save"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>

						<CustomButton
							onPress={() => this.onClickDelete()}
							title="Delete"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					</Form>
				</ScrollView>
			</SafeAreaView>
		);
	}

	onClickDelete() {
		Alert.alert(
			'Alert',
			`Are you want to delete John Doe?`,
			[
				{
					text: 'No',
					onPress: () => {}
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.navigation.pop();
						Toast.show('Contact Deleted Successfully', {
							duration: Toast.durations.LONG,
							position: Toast.positions.BOTTOM,
							shadow: true,
							animation: true,
							hideOnPress: true,
							delay: 0
						});
					}
				}
			],
			{ cancelable: false }
		);
	}

	onClickSave() {
		this.props.navigation.pop();
		Toast.show('Contact saved successfully', {
			duration: Toast.durations.LONG,
			position: Toast.positions.BOTTOM,
			shadow: true,
			animation: true,
			hideOnPress: true,
			delay: 0
		});
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
