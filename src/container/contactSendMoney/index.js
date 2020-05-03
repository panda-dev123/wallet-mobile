import React, { Component } from 'react';
import {
	Platform,
	Text,
	View,
	KeyboardAvoidingView,
	Dimensions,
	Image,
	ScrollView
} from 'react-native';
import { getContrastYIQ } from '../../libraries/color-picker/HelperFunctions';
import { styles } from './styles';
import colors from '../../theme/colors';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import { widgets, text, containers } from '../../styles';
import { Form, Input, Item, Card, Header } from 'native-base';
import { CustomButton } from '../../components/common';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';
import {
	addDevice,
	getAvailableCrypto,
	getAvailablePaymentMethods,
	getDashboard
} from '../../actions';
import { connect } from 'react-redux';
class ContactSendMoney extends Component {
	state = {};

	componentDidMount() {
		this.props.getDashboard();
		this.props.getAvailablePaymentMethods();
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
			<View style={containers.commonBg}>
				{this.renderHeader()}

				<View style={styles.container}>
					<View style={styles.bodyContainer}>
						<View style={{ alignSelf: 'flex-start', marginTop: 10 }}>
							<Form>
								<Text style={widgets.commonText}>Amount</Text>
								<Item
									regular
									style={[
										{ width: '550%' },
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										value={this.state.description}
										onChangeText={description => this.setState({ description })}
										placeholder="0.02"
										placeholderTextColor="#C0C0C0"
									/>
								</Item>
							</Form>
						</View>
						<Text
							style={(widgets.commonText, { marginTop: 15, marginBottom: 15 })}
						>
							Select Wallet:
						</Text>
						<View style={{ marginLeft: -30 }}>{this.renderSlider()}</View>
					</View>

					<View
						style={{
							alignItems: 'stretch',
							flexDirection: 'column',
							paddingTop: 10,
							paddingBottom: 20
						}}
					>
						<CustomButton
							onPress={() => this.onClickSubmit()}
							title="Pay Now"
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
			</View>
		);
	}

	onClickSubmit() {
		Alert.alert(
			'Information',
			`Are you sure?`,
			[
				{
					text: 'No',
					onPress: () => {}
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props.navigation.pop(1);
						Toast.show('Money Sent Successfully!', {
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
				return require('../../assets/images/prepaid.png');
			default:
				return require('../../assets/images/bg-card.png');
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
})(ContactSendMoney);
