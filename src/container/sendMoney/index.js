import React, { Component } from 'react';
import {
	View,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform
} from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomButton } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { Text } from 'react-native-elements';
import { Header } from 'react-navigation';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class SendMoney extends Component {
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
			paymentMethods: paymentMethods
		};
	}

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Send Money"
				navigation={this.props.navigation}
			/>
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
						<View style={[containers.commonBg, { padding: 20 }]}>
							<ScrollView>
								<Text style={widgets.commonText}>Pick method</Text>
								<CustomButton
									onPress={() => {
										this.props.navigation.navigate('SendMoneyTopup', {
											sliderIndex: this.state.sliderIndex,
											card: this.state.card,
											dashboard: this.state.dashboard
										});
									}}
									title="Top-up"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => {
										this.props.navigation.navigate('SendMoneyQr', {
											sliderIndex: this.state.sliderIndex,
											card: this.state.card,
											dashboard: this.state.dashboard
										});
									}}
									title="Scan QR"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => {
										this.props.navigation.navigate('SendMoneyContact', {
											sliderIndex: this.state.sliderIndex,
											card: this.state.card,
											dashboard: this.state.dashboard
										});
									}}
									title="To Contact"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => {
										// this.props.navigation.navigate('SendMoneyChooseAgent', {sliderIndex: this.state.sliderIndex, card: this.state.card, dashboard: this.state.dashboard});
									}}
									title="Send Direct"
									titleStyle={{ color: 'gray' }}
									buttonStyle={widgets.commonDisabledBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => {
										this.props.navigation.navigate('SendMoneyBank', {
											sliderIndex: this.state.sliderIndex,
											card: this.state.card,
											dashboard: this.state.dashboard
										});
									}}
									title="To Bank Account"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => {
										this.props.navigation.navigate('SendMoneyCard', {
											sliderIndex: this.state.sliderIndex,
											card: this.state.card,
											dashboard: this.state.dashboard
										});
									}}
									title="To Card"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>

								<CustomButton
									onPress={() => {
										this.props.navigation.navigate('SendMoneyCrypto', {
											sliderIndex: this.state.sliderIndex,
											card: this.state.card,
											dashboard: this.state.dashboard
										});
									}}
									title="To Crypto"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ marginTop: 15 }}
								/>
							</ScrollView>
						</View>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}
