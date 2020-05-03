import React, { Component } from 'react';
import {
	Platform,
	Text,
	View,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';
import { styles } from './styles';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';
import { widgets, text, containers } from '../../styles';
import { Form, Input, Item, Card, Header } from 'native-base';
import { CustomButton } from '../../components/common';

export default class ReceiveMoneyTopupPayViaBank extends Component {
	state = {};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Top-up via Bank"
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
								<Text style={styles.titleStyle}>Receive:</Text>
								<Text style={styles.textAmountCurrency}>$47</Text>
								<Text style={styles.titleText}>Description</Text>
							</View>
							<Form>
								<Text style={widgets.commonText}>Account (IBAN)</Text>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
									/>
								</Item>

								<Text style={widgets.commonText}>Swift</Text>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										placeholder="Put in description/note: xxxxxx"
										placeholderTextColor="#C0C0C0"
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
									/>
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

								<Text style={widgets.commonText}>Address</Text>
								<Item
									regular
									style={[
										widgets.commonInput,
										widgets.formItemMarginForCardDetails
									]}
								>
									<Input
										placeholderTextColor="#C0C0C0"
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
									/>
								</Item>
							</Form>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		);
	}
}
