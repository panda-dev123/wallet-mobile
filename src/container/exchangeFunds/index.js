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
	PickerIOS,
	ScrollView,
	Dimensions,
	KeyboardAvoidingView
} from 'react-native';
import { styles } from './styles';
import { Header, NavigationActions, StackActions } from 'react-navigation';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import iconBack from '../../assets/icons/icon_back.png';
import iconCopy from '../../assets/icons/icon_copy.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { CustomButton } from '../../components/common';
import { widgets, containers, text } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { Text } from 'react-native-elements';
import { Form, Item, Input, Label, Picker } from 'native-base';
import { getContrastYIQ } from '../../libraries/color-picker/HelperFunctions';
import { connect } from 'react-redux';
import { exchangePayment, getExchangeRate } from '../../actions';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import colors from '../../theme/colors';

class ExchangeFunds extends Component {
	constructor(props, context, state) {
		super(props, context);
		let sliderIndex = props.navigation.getParam('sliderIndex', null);
		let initCard = props.navigation.getParam('card', null);
		let dashboard = props.navigation.getParam('dashboard', null);
		console.log(initCard);
		console.log(dashboard.paymentMethods);
		let paymentMethods = dashboard.paymentMethods.filter(
			item => item.id !== initCard.id
		);
		console.log(paymentMethods);
		this.state = {
			initCard: initCard,
			fromSource: initCard.currency,
			sliderIndex: 0,
			card: paymentMethods[0],
			dashboard: dashboard,
			paymentMethods: paymentMethods,
			amount: '',
			description: ''
		};
		this.timeout = 0;
	}

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Exchange Funds"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		if (this.props.dashboardLoading) {
			let Spinner = require('react-native-spinkit');
			return (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Spinner size={100} type={'Bounce'} color={colors.navBarColor} />
				</View>
			);
		}

		return (
			<SafeAreaView style={containers.commonBg}>
				<View style={styles.container}>
					{this.renderHeader()}
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : null}
						keyboardVerticalOffset={Header.HEIGHT + 20}
						style={containers.commonFlex}
					>
						<ScrollView>
							<View>
								<Form style={{ padding: 20 }}>
									<Text style={widgets.commonText}>From:</Text>
									<Text
										style={{
											marginLeft: 20,
											fontSize: 16,
											marginTop: 5,
											marginBottom: 10
										}}
									>
										{this.state.initCard.name}
									</Text>

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
											selectedValue={this.state.fromSource}
											onValueChange={value => {
												this.setState({ fromSource: value });
											}}
										>
											<Picker.Item
												label={this.state.initCard.currency}
												value={this.state.initCard.currency}
											/>
										</Picker>
									</Item>
									<Text style={widgets.commonText}>
										Currency of current payment method selection
									</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.amount}
											onChangeText={amount => {
												this.setState({ amount });
												let that = this;
												setTimeout(function() {
													that.updateExchangeRate();
												}, 0);
											}}
											placeholder={'0 ' + this.state.initCard.currency}
											placeholderTextColor="#C0C0C0"
										/>
									</Item>

									{!this.props.getExchangeRateLoading && (
										<Text style={widgets.commonTextConversion}>
											~ {this.props.exchangeRate.convertedAmount}{' '}
											{this.state.card.currency}
										</Text>
									)}

									<Text style={widgets.commonText}>Description</Text>
									<Item
										regular
										style={[
											widgets.commonInput,
											widgets.formItemMarginForCardDetails
										]}
									>
										<Input
											value={this.state.description}
											onChangeText={description =>
												this.setState({ description })
											}
											placeholder="Description (Optional)"
											placeholderTextColor="#C0C0C0"
										/>
									</Item>
								</Form>
								<Text style={widgets.commonText}>Pick method</Text>
								<View style={{ marginTop: 20 }}>{this.renderSlider()}</View>
								<CustomButton
									onPress={() => this.onClickExchange()}
									title="Submit"
									titleStyle={{ color: TIPPER }}
									buttonStyle={widgets.commonBtnStyleWithBorder}
									containerStyle={{ padding: 20 }}
								/>
							</View>
						</ScrollView>
					</KeyboardAvoidingView>
				</View>
			</SafeAreaView>
		);
	}

	renderSlider() {
		if (this.state.sliderIndex === null) {
			let sliderIndex = this.props.dashboard.selectedMethodIndex;
			let card = this.props.dashboard.paymentMethods[sliderIndex];
			this.setState({ sliderIndex, card });
		}

		return (
			<View>
				<Carousel
					ref={c => {
						this._carousel = c;
					}}
					data={this.state.paymentMethods}
					renderItem={this.renderSliderItem.bind(this)}
					sliderWidth={Dimensions.get('window').width}
					useScrollView={true}
					firstItem={0}
					itemWidth={Dimensions.get('window').width * 0.77}
					onSnapToItem={index => {
						let card = this.state.paymentMethods[index];
						this.setState({ sliderIndex: index, card });
						let that = this;
						setTimeout(function() {
							that.updateExchangeRate();
						}, 0);
					}}
				/>
				<Pagination
					dotsLength={this.state.paymentMethods.length}
					activeDotIndex={this.state.sliderIndex}
					containerStyle={{ paddingVertical: 8 }}
					dotColor={colors.navBarColor}
					dotStyle={{
						width: 8,
						height: 8,
						borderRadius: 4,
						marginHorizontal: 8
					}}
					inactiveDotColor={colors.black}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
					carouselRef={this._carousel}
					tappableDots={!!this._carousel}
				/>
			</View>
		);
	}

	renderSliderItem({ item, index }) {
		this.paymentMethod = item;
		// let imagePath = '../../assets/images/' + item.image;
		let color = getContrastYIQ(item.color);
		// console.log('item', item, imagePath);
		return (
			<View
				style={{
					backgroundColor: item.color,
					height: 180,
					borderRadius: 20
				}}
			>
				<Image
					style={{
						width: '100%',
						height: '100%',
						opacity: 0.4,
						position: 'absolute',
						borderRadius: 20
					}}
					resizeMode={'cover'}
					source={this.getImagez(item.type, item.currencySymbol)}
				/>
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
						marginLeft: 20,
						paddingTop: 10
					}}
				>
					<Text style={[styles.slideType, { color: color }]}>
						TYPE:&nbsp;
						{item.type == 'custcrypto'
							? item.currency
							: item.type.toUpperCase()}
					</Text>
					<Text style={[styles.slideType, { color: color }]}>
						CURRENCY: {item.currency}
					</Text>

					<Ripple
						onPress={() => {
							let card = this.state.card;
							console.log(card);
							this.props.navigation.navigate('EditPaymentMethod', { card });
						}}
					>
						<View>
							<MaterialIcon
								name={'information-outline'}
								style={[styles.iconSlide, { paddingBottom: 18, color: color }]}
							/>
						</View>
					</Ripple>
				</View>
			</View>
		);
	}

	getImagez(type, currency) {
		switch (type) {
			case 'card':
				return require('../../assets/images/card.png');
			case 'custcrypto':
				switch (currency) {
					case 'ETH':
						return require('../../assets/images/eth.png');
					case 'DASH':
						return require('../../assets/images/dash.png');
					case 'BTC':
						return require('../../assets/images/btc.png');
					default:
						return require('../../assets/images/bg-card.png');
				}
			case 'prepaid':
				return require('../../assets/images/prepaid.png');
			default:
				return require('../../assets/images/bg-card.png');
		}
	}

	updateExchangeRate() {
		if (this.state.amount.length === 0) {
			return;
		}
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.timeout = setTimeout(() => {
			this.updateExchangeRate2();
		}, 500);
	}

	updateExchangeRate2() {
		this.props.getExchangeRate(
			this.state.initCard.currency,
			this.state.card.currency,
			this.state.amount,
			'exchange'
		);
	}

	onClickExchange(id) {
		this.props.exchangePayment(
			this.state.initCard.id,
			this.state.initCard.currency,
			this.state.amount,
			this.state.description,
			this.state.amount,
			this.state.card.id
		);
	}
}

const mapStateToProps = state => {
	return {
		getExchangeRateLoading: state.wallet.getExchangeRateLoading,
		exchangeRate: state.wallet.exchangeRate,
		getExchangeRateError: state.wallet.getExchangeRateError
	};
};

export default connect(mapStateToProps, { exchangePayment, getExchangeRate })(
	ExchangeFunds
);
