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
	TouchableOpacity,
	Alert,
	Share
} from 'react-native';
import {
	Form,
	Input,
	Item,
	Picker,
	Header,
	Left,
	Body,
	Right,
	Title,
	Card,
	Label
} from 'native-base';
import { styles } from './styles';
import { NavigationActions, StackActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../theme/colors';
import { CustomButton } from '../../components/common';
import { widgets, text, containers } from '../../styles';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class SendMoneyLink extends Component {
	state = {
		password: ''
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Send Money via Link"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<Card style={styles.bodyContainer}>
						<View
							style={{
								alignItems: 'stretch',
								flexDirection: 'column',
								marginTop: 30,
								paddingBottom: 20
							}}
						>
							<View
								style={{
									alignSelf: 'center',
									flex: 1,
									width: '80%'
								}}
							>
								<Form>
									<Text style={(widgets.commonText, { marginBottom: 10 })}>
										Description
									</Text>
									<Item regular style={[widgets.commonInput]}>
										<Input
											placeholder="Description"
											placeholderTextColor="#C0C0C0"
										/>
									</Item>

									<Text
										style={
											(widgets.commonText, { marginTop: 10, marginBottom: 10 })
										}
									>
										Link
									</Text>
									<Item regular style={[widgets.commonInput]}>
										<Input
											placeholder="https://url.com/"
											placeholderTextColor="#C0C0C0"
										/>
										<Icon
											color={colors.navBarColor}
											style={{ marginLeft: 5, fontSize: 24 }}
											name="content-copy"
										/>
									</Item>
								</Form>
							</View>
						</View>
						<View
							style={{
								justifyContent: 'flex-end',
								paddingTop: 10,
								paddingBottom: 20,
								flex: 1
							}}
						>
							<CustomButton
								onPress={() => this.onClickSubmit()}
								title="Go"
								titleStyle={widgets.commonBtnTitleStyle}
								buttonStyle={widgets.commonBtnStyle}
								containerStyle={{
									marginTop: 15,
									marginLeft: 10,
									marginRight: 10
								}}
							/>
						</View>
					</Card>
				</View>
			</SafeAreaView>
		);
	}
}
