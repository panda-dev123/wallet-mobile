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
import iconBack from '../../assets/icons/icon_back.png';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton, Card } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER, FORM_BG } from '../../styles/colors';
import { Form, Item, Input, Label, Picker } from 'native-base';
import ColorPicker from '../../libraries/color-picker/ColorPicker';
import { connect } from 'react-redux';
import {
	addDevice,
	editPaymentMethod,
	getAvailableCrypto,
	getAvailablePaymentMethods,
	getDashboard
} from '../../actions';
import { CheckBox } from 'react-native-elements';
import { Header } from 'react-navigation';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import colors from '../../theme/colors';

class EditPaymentMethod extends Component {
	constructor(props, context, state) {
		super(props, context);
		let card = props.navigation.getParam('card', null);
		this.state = {
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
			card: card,
			selectedColor: card.color,
			alias: card.name,
			dayLimit: card.dayLimit.toString(),
			monthLimit: card.monthLimit.toString(),
			receiveNotifications: true,
			receiveEmail: true,
			receiveSMS: false
		};
	}

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Edit Payment Method"
				navigation={this.props.navigation}
			/>
		);
	}

	// paymentMethodId, alias, dayLimit, monthLimit, color, receiveNotifications, receiveEmail, receiveSMS
	render() {
		console.log('state', this.state, this.state.dayLimit);
		return (
			<SafeAreaView style={containers.commonBg}>
				{this.renderHeader()}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<View style={[{ padding: 20 }]}>
						<ScrollView>
							<Form>
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
										onChangeText={alias => this.setState({ alias })}
										placeholder="Name"
									/>
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
								<CheckBox
									title="Receive Notifications"
									containerStyle={[
										{ color: '#fff' },
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
									checkedColor={colors.navBarColor}
									checked={this.state.receiveNotifications}
									onPress={() =>
										this.setState({
											receiveNotifications: !this.state.receiveNotifications
										})
									}
									checkedIcon={'checkbox-marked-outline'}
									uncheckedIcon={'checkbox-blank-outline'}
									iconType={'material-community'}
								/>

								<CheckBox
									title="Receive Email"
									containerStyle={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
									checked={this.state.receiveEmail}
									onPress={() =>
										this.setState({ receiveEmail: !this.state.receiveEmail })
									}
									checkedColor={colors.navBarColor}
									checkedIcon={'checkbox-marked-outline'}
									uncheckedIcon={'checkbox-blank-outline'}
									iconType={'material-community'}
								/>

								<CheckBox
									title="Receive SMS"
									containerStyle={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
									checked={this.state.receiveSMS}
									onPress={() =>
										this.setState({ receiveSMS: !this.state.receiveSMS })
									}
									checkedColor={colors.navBarColor}
									checkedIcon={'checkbox-marked-outline'}
									uncheckedIcon={'checkbox-blank-outline'}
									iconType={'material-community'}
								/>
							</Form>

							<CustomButton
								onPress={() => this.onClickDelete()}
								title="Delete"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 25 }}
							/>

							<CustomButton
								onPress={() => this.onClickSave()}
								title="Save"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 25 }}
							/>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}

	onClickSave() {
		this.props.editPaymentMethod(
			this.state.card.id,
			this.state.alias,
			this.state.dayLimit,
			this.state.monthLimit,
			this.state.selectedColor,
			this.state.receiveNotifications,
			this.state.receiveEmail,
			this.state.receiveSMS
		);
	}

	onClickDelete() {
		Alert.alert(
			'Warning',
			`Are you sure delete this payment method?`,
			[
				{
					text: 'No',
					onPress: () => {}
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.navigation.pop(1);
						Toast.show('Payment method successfully deleted!', {
							duration: Toast.durations.LONG,
							position: Toast.positions.BOTTOM,
							shadow: true,
							animation: true,
							hideOnPress: true,
							delay: 0,
							onHide: () => {}
						});
					}
				}
			],
			{ cancelable: false }
		);
	}
}

export default connect(null, { editPaymentMethod })(EditPaymentMethod);
