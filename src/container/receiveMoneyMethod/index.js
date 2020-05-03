import React, { Component } from 'react';
import {
	View,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	ScrollView
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../theme/colors';
import { CustomButton } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { Text } from 'react-native-elements';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
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

const fromSources = [
	{
		label: 'My Bank',
		value: 'myBank'
	},
	{
		label: 'test',
		value: '1'
	},
	{
		label: 'test 2',
		value: '2'
	}
];

export default class ReceiveMoneyMethod extends Component {
	state = {
		fromSource: fromSources[0].value
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Receive Money"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<View style={[containers.commonBg, { padding: 20 }]}>
						<ScrollView>
							<Form>
								<Text style={widgets.commonText}>From</Text>
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
										selectedValue={this.state.fromSource}
										onValueChange={value => {
											this.setState({ fromSource: value });
										}}
									>
										<Picker.Item label="My Bank" value="0" />
										<Picker.Item label="Test 1" value="1" />
										<Picker.Item label="Test 2" value="2" />
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
									<Input placeholder="$100" placeholderTextColor="#C0C0C0" />
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
										placeholder="Description (Optional)"
										placeholderTextColor="#C0C0C0"
									/>
								</Item>
							</Form>
							<Text style={widgets.commonText}>Pick method</Text>
							<CustomButton
								onPress={() => {
									this.props.navigation.navigate('ReceiveMoneyTopup');
								}}
								title="Top-up"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>

							<CustomButton
								onPress={() => {
									this.props.navigation.navigate('ReceiveMoneyQR');
								}}
								title="Show QR"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>

							<CustomButton
								onPress={() => {
									this.props.navigation.navigate('ReceiveMoneyLink');
								}}
								title="Send Link"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>

							<CustomButton
								onPress={() => {
									this.props.navigation.navigate('ReceiveMoneyChooseAgent');
								}}
								title="Ask Contact"
								titleStyle={{ color: TIPPER }}
								buttonStyle={widgets.commonBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>

							<CustomButton
								onPress={() => {}}
								title="Send Direct"
								titleStyle={{ color: 'gray' }}
								buttonStyle={widgets.commonDisabledBtnStyleWithBorder}
								containerStyle={{ marginTop: 15 }}
							/>
						</ScrollView>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
