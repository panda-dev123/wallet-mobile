import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	SafeAreaView,
	Alert,
	FlatList,
	Dimensions,
	ImageBackground,
	StatusBar
} from 'react-native';
import { styles } from './styles';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import {
	addDevice,
	getAvailableCrypto,
	getAvailablePaymentMethods,
	getDashboard
} from '../../actions';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../theme/colors';
import { getContrastYIQ } from '../../libraries/color-picker/HelperFunctions';
import * as firebase from 'react-native-firebase';
import { CustomButton } from '../../components/common';
import { TIPPER, widgets } from '../../styles';
import { Header, Form, Card, Left, Body, Right, Title } from 'native-base';
import Utils from '../../utils/Utils';
import moment from 'moment';
import { Card as TransactionCard } from '@paraboly/react-native-card';
import Ripple from 'react-native-material-ripple';

class Home extends Component {
	constructor(props, context, state) {
		super(props, context);
		this.state = {
			sliderIndex: null,
			smailsliderIndex : null,
			card: null
		};
	}

	componentDidMount() {
		this.props.getDashboard();
		this.props.getAvailablePaymentMethods();
		this.props.getAvailableCrypto();

		firebase
			.messaging()
			.hasPermission()
			.then(enabled => {

				if (enabled) {
					console.log('user has permissions');
				} else {
					console.log("user doesn't have permission");
					firebase
						.messaging()
						.requestPermission()
						.then(() => {
							console.log('User has authorised  ');
							console.log("firebase" + firebase);
						})
						.catch(error => {
							console.log('User has rejected permissions');
						});
				}
			});

		firebase
			.messaging()
			.getToken()
			.then(fcmToken => {
				if (fcmToken) {
					// todo send to server
					console.log(fcmToken);
					this.props.addDevice(fcmToken);
					// user has a device token
				} else {
					// user doesn't have a device token yet
				}
			});
	}

	renderHeader() {
		return (
			<Header
				style={(styles.header, { backgroundColor: colors.statusBarColor })}
				iosBarStyle="dark-content"
				barStyle="dark-content"
				androidStatusBarColor={colors.statusBarColor}
			>
				<Left style={{ flex: 1 }}>
					<View style={styles.iconBack} />
				</Left>
				<Body style={{ flex: 3, justifyContent: 'center' }}>
					<Title
						style={
							(styles.headerTitle,
							{ alignSelf: 'center', color: colors.navBarColor })
						}
					>
						{this.state.card !== null && this.state.card.name}
					</Title>
				</Body>
				<Right style={{ flex: 1 }}>
					<Ripple
						onPress={() => {
							this.addPaymentMethod();
						}}
					>
						<MaterialIcon
							name={'plus-circle-outline'}
							style={styles.iconHeaderStyle}
						/>
					</Ripple>
				</Right>
			</Header>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				{this.renderHeader()}
				{this.renderBody()}
			</SafeAreaView>
		);
	}

	renderBody() {
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

		if (
			this.props.dashboard.paymentMethods === undefined ||
			this.props.dashboard.paymentMethods.length === 0
		) {
			return (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Text>No payment method added.</Text>
					<CustomButton
						onPress={() => this.addPaymentMethod()}
						title="Add Payment Method"
						titleStyle={{ color: TIPPER }}
						buttonStyle={widgets.commonBtnStyleWithBorder}
						containerStyle={{ marginTop: 15, width: '80%', maxWidth: 400 }}
					/>
				</View>
			);
		}

		return (
			<ScrollView>
				<View
					style={{
						flex: 1
					}}
				>
					<View style={styles.bodyContainer}>
						
						<Card
							noShadow={true}
							style={{
								flexDirection: 'row',
								justifyContent: 'space-around',
								borderBottomColor: 'transparent',
								borderTopColor: 'transparent',
								backgroundColor: 'white',
							}}
						>
							<Ripple
								onPress={() => {
									this.props.navigation.navigate('SendMoney', {
										sliderIndex: this.state.sliderIndex,
										card: this.state.card,
										dashboard: this.props.dashboard
									});
								}}
							>
								<View>
									<MaterialIcon
										name={'send-circle-outline'}
										style={styles.iconTitleStyle}
									/>
									<Text style={styles.titleTextStyle}>Send</Text>
								</View>
							</Ripple>
							<Ripple
								onPress={() => {
									this.props.navigation.navigate('ReceiveMoneyMethod', {
										sliderIndex: this.state.sliderIndex,
										card: this.state.card,
										dashboard: this.props.dashboard
									});
								}}
							>
								<View>
									<MaterialIcon
										name={'arrow-down-bold-circle-outline'}
										style={styles.iconTitleStyle}
									/>
									<Text style={styles.titleTextStyle}>Receive</Text>
								</View>
							</Ripple>
							<Ripple
								onPress={() => {
									if (this.props.dashboard.paymentMethods.length < 2) {
										Utils.showToast(
											'You need at least 2 payment method to use exchange funds.'
										);
										return;
									}
									this.props.navigation.navigate('ExchangeFunds', {
										sliderIndex: this.state.sliderIndex,
										card: this.state.card,
										dashboard: this.props.dashboard
									});
								}}
							>
								<View>
									<MaterialIcon name={'sync'} style={styles.iconTitleStyle} />
									<Text style={styles.titleTextStyle}>Exchange</Text>
								</View>
							</Ripple>
							<Ripple
								onPress={() => {
									if (this.props.dashboard.paymentMethods.length < 2) {
										Utils.showToast(
											'You need at least 2 payment method to use exchange funds.'
										);
										return;
									}
									this.props.navigation.navigate('ExchangeFunds', {
										sliderIndex: this.state.sliderIndex,
										card: this.state.card,
										dashboard: this.props.dashboard
									});
								}}
							>
								<View>
									<MaterialIcon name={'currency-eur'} style={styles.iconTitleStyle} />
									<Text style={styles.titleTextStyle}>Currencies</Text>
								</View>
							</Ripple>
							<Ripple
								onPress={() => {
									if (this.props.dashboard.paymentMethods.length < 2) {
										Utils.showToast(
											'You need at least 2 payment method to use exchange funds.'
										);
										return;
									}
									this.props.navigation.navigate('ExchangeFunds', {
										sliderIndex: this.state.sliderIndex,
										card: this.state.card,
										dashboard: this.props.dashboard
									});
								}}
							>
								<View>
									<MaterialIcon name={'credit-card'} style={styles.iconTitleStyle} />
									<Text style={styles.titleTextStyle}>Card</Text>
								</View>
							</Ripple>
						</Card>
						{this.renderSlider()}
						{this.smallrenderSlider()}
						<View style={{
							flexDirection:'row', 
							flexWrap:'wrap',
							justifyContent: 'space-around'
						}}>
							<Text style={widgets.commonText}>Transactions:</Text>
							<Text style={{float:'right'}} sytle={widgets.commonText}>  View all </Text>
						</View>
						<Card
							style={{
								marginLeft: 10,
								marginRight: 10
							}}
						>
							<ScrollView
								style={{
									height: 250
								}}
								nestedScrollEnabled={true}
							>
								{this.state.card !== null &&
								this.state.card.transactions == 0 ? (
									<View
										style={{
											flex: 1,
											alignItems: 'center'
										}}
									>
										<MaterialIcon
											name={'cash'}
											style={[
												styles.iconMiddle,
												{
													marginTop: 80,
													paddingBottom: 5,
													color: '#9B9B9B'
												}
											]}
										/>
										<Text style={{ fontSize: 20, textColor: '#9B9B9B' }}>
											No transactions to be shown.
										</Text>
									</View>
								) : (
									<FlatList
										style={{ marginLeft: -10 }}
										contentContainerStyle={{
											flexGrow: 1
										}}
										data={
											this.state.card !== null && this.state.card.transactions
										}
										scrollEnabled={false}
										renderItem={this.renderTableItem.bind(this)}
										keyExtractor={item => item.id.toString()}
									/>
								)}
							</ScrollView>
						</Card>
					</View>
				</View>
			</ScrollView>
		);
	}

	renderTableItem({ item }) {
		return (
			<View>
				<TransactionCard
					title={item.type.toUpperCase()}
					iconName="cash"
					iconBackgroundColor={colors.navBarColor}
					defaultTitle=""
					iconType="MaterialCommunityIcons"
					defaultContent=""
					onPress={() => {}}
					topRightText={moment(item.created).format('LT')}
					bottomRightText={item.currencyTo.symbol + item.amountFrom}
					content={moment(item.created).format('L')}
				/>
			</View>
		);
	}

	renderSlider() {
		if (this.state.sliderIndex === null) {
			let sliderIndex = this.props.dashboard.selectedMethodIndex;
			let card = this.props.dashboard.paymentMethods[sliderIndex];
			this.setState({ sliderIndex, card });
		}
		return (
			<View style={{
				marginTop: 50
			}}>
				<Carousel
					ref={c => {
						this._carousel = c;
					}}
					data={this.props.dashboard.paymentMethods}
					renderItem={this.renderSliderItem.bind(this)}
					sliderWidth={Dimensions.get('window').width}
					firstItem={this.props.dashboard.selectedMethodIndex}
					itemWidth={Dimensions.get('window').width * 0.77}
					onSnapToItem={index => {
						let card = this.props.dashboard.paymentMethods[index];
						this.setState({ sliderIndex: index, card });
					}}
				/>
				<Pagination
					dotsLength={this.props.dashboard.paymentMethods.length}
					activeDotIndex={this.state.sliderIndex}
					containerStyle={{ paddingVertical: 8 }}
					dotColor={colors.navBarColor}
					dotStyle={{
						width: 30,
						height: 8,
						borderRadius: 4,
						marginHorizontal: 3
					}}
					inactiveDotColor={colors.black}
					inactiveDotStyle={{
						width: 8,
						height: 8,
						borderRadius: 4,
						marginHorizontal: 3
					}}
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
		let color = getContrastYIQ(item.color);
		console.log('item', item);
		return (
			<View
				style={{
					backgroundColor: item.color,
					height: 180,
					borderRadius: 20
				}}
			>
				{/*<Image*/}
				{/*	style={styles.slide}*/}
				{/*	source={this.getImage(item.id)}/>*/}
				<Image
					style={{
						width: '100%',
						height: '100%',
						opacity: 0.4,
						position: 'absolute',
						borderRadius: 20
					}}
					resizeMode={'cover'}
					source={this.getImage(item.type,item.cuurency)}
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
							? item.currencySymbol
							: item.type.toUpperCase()}
					</Text>
					<Text style={[styles.slideType, { color: color }]}>
						CURRENCY: {item.currencySymbol}
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

	getImage(type, currency) {
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
				switch (currency) {
					case 'GBP':
						return require('../../assets/images/eth.png');
					case 'EUR':
						return require('../../assets/images/dash.png');
					case 'HKD ':
						return require('../../assets/images/btc.png');
					default:
						return require('../../assets/images/bg-card.png');
				}
			default:
				return require('../../assets/images/bg-card.png');
		}
	}

	addPaymentMethod() {
		this.props.navigation.navigate('AddNewPaymentMethod');
	}

	smallrenderSlider(){
		console.log("data" + this.props.dashboard.paymentMethods)
		return (
			<View style={{
				marginTop: 30
			}}>
				<Carousel
					ref={c => {
						this._carousel = c;
					}}
					data={this.props.dashboard.paymentMethods}
					renderItem={this.smallrenderSliderItem.bind(this)}
					sliderWidth={Dimensions.get('window').width}
					firstItem={this.props.dashboard.selectedMethodIndex}
					itemWidth={120}
					onSnapToItem={index => {
						let card = this.props.dashboard.paymentMethods[index];
						this.setState({ smallsliderIndex: index, card });
					}}
				/>
			</View>
		);
	}

	

	smallrenderSliderItem({ item, index }) {

		this.paymentMethod = item;
		let color = getContrastYIQ(item.color);
		console.log('item', item);
		return (
			<View
				style={{
					backgroundColor: item.color,
					height: 90,
					borderRadius: 20
				}}
			>
				{/*<Image*/}
				{/*	style={styles.slide}*/}
				{/*	source={this.getImage(item.id)}/>*/}
				<Image
					style={{
						width: '100%',
						height: '100%',
						opacity: 0.4,
						position: 'absolute',
						borderRadius: 20
					}}
					resizeMode={'cover'}
					source={this.getImage(item.type, item.currencySymbol)}
				/>

				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
						marginLeft: 20,
						paddingTop: 10
					}}
				>
					
					<Text style={[styles.slideType, { color: color, marginBottom: 30}]}>
						
						{
						item.cuurency == 'custcrypto'
							? <Text>Spent Today</Text>
							: item.type == 'card'
							? <Text>Current Balance</Text>: 
							<Text>Weekly Spend</Text>}
					</Text>
					<Text style={[styles.slideType, { color: color, marginBottom: 10}]}>
						{item.currencySymbol} {item.balance}
					</Text>
				</View>
			</View>
		);
	}

	smallgetImage(){
		switch (type) {
			case 'card':
				return require('../../assets/images/visa_image.png');
			case 'custcrypto':
				switch (currency) {
					case 'ETH':
						return require('../../assets/images/eth.png');
					case 'DASH':
						return require('../../assets/images/dash.png');
					case 'BTC':
						return require('../../assets/images/bitcoin.png');
					default:
						return require('../../assets/images/bank_image.png');
				}
			case 'prepaid':
				return require('../../assets/images/prepaid.png');
			default:
				return require('../../assets/images/bank_image.png');
		}
	}
}

const mapStateToProps = state => {
	return {
		dashboardLoading: state.wallet.dashboardLoading,
		dashboard: state.wallet.dashboard,
		dashboardError: state.wallet.dashboardError
	};
};

export default connect(mapStateToProps, {
	getDashboard,
	getAvailablePaymentMethods,
	getAvailableCrypto,
	addDevice
})(Home);
