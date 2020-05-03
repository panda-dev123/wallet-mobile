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
	ScrollView
} from 'react-native';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import RNPickerSelect from 'react-native-picker-select';
import { CustomButton } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { Form, Item, Input, Picker } from 'native-base';
import { Text } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

export default class AddCardOptions extends Component {
	state = {
		fromSource: 'Currency'
	};

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
				<Text style={styles.headerTitle}>Card Options</Text>
				<View style={styles.iconBack} />
			</View>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<View style={[containers.commonBg, { padding: 20 }]}>
						<Text h4 style={[text.centerText, { paddingBottom: 15 }]}>
							Please Enter Below Card Options
						</Text>
						<Form>
							<Text style={widgets.commonText}>Name this card</Text>
							<Item
								regular
								style={[
									widgets.commonInput,
									widgets.formItemMarginForCardDetails
								]}
							>
								<Input placeholder="Name" />
							</Item>
							<Text style={widgets.commonText}>Currency</Text>
							<Item
								picker
								style={[
									widgets.formPickerItem,
									{ marginTop: 8, marginLeft: 5, marginRight: 0 }
								]}
							>
								<Picker
									mode="dropdown"
									iosIcon={<Icon name="chevron-down" type="Entypo" />}
									style={{ width: undefined }}
									placeholder="Currency"
									placeholderStyle={{ color: '#bfc6ea' }}
									placeholderIconColor="#007aff"
									selectedValue={this.state.fromSources}
									onValueChange={value => {
										this.setState({ fromSources: value });
									}}
								>
									<Picker.Item label="Currency" value="currency" />
									<Picker.Item label="USD" value="usd" />
									<Picker.Item label="EURO" value="euro" />
									<Picker.Item label="POUND" value="pound" />
									<Picker.Item label="BTC" value="btc" />
								</Picker>
							</Item>
						</Form>
						<CustomButton
							onPress={() => this.onClickGo()}
							title="Save"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 15 }}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	onClickGo() {
		this.props.navigation.navigate('AddCardConfirm');
	}
}
