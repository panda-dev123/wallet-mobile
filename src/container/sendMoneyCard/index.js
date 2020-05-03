import React, { Component } from 'react';
import {
	Platform,
	Text,
	View,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import { styles } from './styles';
import { ReceiveMoneyLink } from '../../components/common/HeaderWithBack';
import { widgets, text, containers } from '../../styles';
import { Form, Input, Item, Card, Header } from 'native-base';
import { CustomButton } from '../../components/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import colors from '../../theme/colors';
import Ripple from 'react-native-material-ripple';
export default class SendMoneyCard extends Component {
	state = {
		password: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Send Money to Card"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<View style={containers.commonBg}>
				{this.renderHeader()}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Header.HEIGHT + 20}
					style={containers.commonFlex}
				>
					<View style={containers.commonBg}>
						<View style={styles.bodyContainer}>
							<View style={{ alignSelf: 'center', marginTop: 10 }}>
								<Text style={styles.titleStyle}>Send:</Text>
								<Text style={styles.textAmountCurrency}>$47</Text>
								<Text style={styles.titleText}>Description</Text>
							</View>
							<Form>
								<Text style={widgets.commonText}>Card Number:</Text>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										placeholder="0000-0000-0000-0000"
										placeholderTextColor="#C0C0C0"
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
									/>
									<Ripple onPress={() => {}}>
										<Icon
											color={colors.buttonBackgroundColor}
											style={{ marginLeft: 5, fontSize: 22 }}
											name="credit-card-scan"
										/>
									</Ripple>
								</Item>

								<Text style={widgets.commonText}>Name</Text>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										placeholder="ex. John Smith"
										placeholderTextColor="#C0C0C0"
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
									/>
								</Item>

								<View style={{ flexDirection: 'row' }}>
									<View style={{ flexDirection: 'column', width: '50%' }}>
										<Text style={widgets.commonText}>Month</Text>
										<Item
											regular
											style={[
												widgets.commonInput,
												widgets.formItemMarginForCardDetails
											]}
										>
											<Input
												placeholder="01"
												placeholderTextColor="#C0C0C0"
												value={this.state.firstName}
												onChangeText={text =>
													this.setState({ firstName: text })
												}
											/>
										</Item>
									</View>

									<View style={{ flexDirection: 'column', width: '50%' }}>
										<Text style={widgets.commonText}>Year</Text>
										<Item
											regular
											style={[
												widgets.commonInput,
												widgets.formItemMarginForCardDetails
											]}
										>
											<Input
												placeholder="01"
												placeholderTextColor="#C0C0C0"
												value={this.state.firstName}
												onChangeText={text =>
													this.setState({ firstName: text })
												}
											/>
										</Item>
									</View>
								</View>
							</Form>
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
				</KeyboardAvoidingView>
			</View>
		);
	}

	onClickPayNow() {
		this.props.navigation.pop(3);
	}
}
