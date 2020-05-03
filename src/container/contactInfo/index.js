import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	StatusBar,
	Image,
	SafeAreaView,
	TextInput,
	Alert
} from 'react-native';
import { Text, Card } from 'native-base';
import { styles } from './styles';
import { CustomButton } from '../../components/common';
import { widgets, containers } from '../../styles';
import { TIPPER } from '../../styles/colors';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class ContactInfo extends Component {
	state = {};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Contact Info"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={containers.commonBg}>
				<View style={styles.container}>
					{this.renderHeader()}
					<Card style={styles.bodyContainer}>
						<View>
							<Image
								style={styles.listItemImage}
								source={require('../../assets/images/avatar.png')}
							/>
							<Text style={styles.textLink}>John Smith</Text>
							<Text
								style={{
									marginTop: 5,
									fontSize: 15,
									alignSelf: 'center'
								}}
							>
								+9912343231
							</Text>
							<Text
								style={{
									marginTop: 5,
									fontSize: 15,
									alignSelf: 'center'
								}}
							>
								test@gmail.com
							</Text>
						</View>
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('ContactEdit');
							}}
							title="Edit Contact"
							buttonStyle={widgets.commonBtnStyle}
							containerStyle={{ marginTop: 20 }}
						/>
					</Card>

					<View
						style={{
							justifyContent: 'flex-end',
							paddingTop: 10,
							paddingBottom: 20,
							flex: 1,
							width: '95%',
							alignSelf: 'center'
						}}
					>
						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('ContactSendMoney');
							}}
							title="Send Money"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 10 }}
						/>

						<CustomButton
							onPress={() => {
								this.props.navigation.navigate('ContactRequestMoney');
							}}
							title="Request Money"
							titleStyle={{ color: TIPPER }}
							buttonStyle={widgets.commonBtnStyleWithBorder}
							containerStyle={{ marginTop: 10 }}
						/>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}
