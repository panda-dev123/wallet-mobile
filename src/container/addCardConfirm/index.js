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
import Ripple from 'react-native-material-ripple';

export default class AddCardConfirm extends Component {
	renderHeader() {
		return (
			<Header
				style={(styles.header, { backgroundColor: colors.statusBarColor })}
				iosBarStyle="dark-content"
				barStyle="dark-content"
				androidStatusBarColor={colors.statusBarColor}
			>
				<Left style={{ flex: 1 }}>
					<Ripple
						onPress={() => {
							this.props.navigation.pop();
						}}
					>
						<Icon
							name={'chevron-left'}
							style={(styles.iconHeaderStyle, { marginLeft: 5, fontSize: 42 })}
						/>
					</Ripple>
				</Left>
				<Body style={{ flex: 3, justifyContent: 'center' }}>
					<Title
						style={
							(styles.headerTitle,
							{ alignSelf: 'center', color: colors.navBarColor })
						}
					>
						Confirm Card
					</Title>
				</Body>
				<Right style={{ flex: 1 }}></Right>
			</Header>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<ScrollView style={{ flex: 1 }}>
						<View style={styles.bodyContainer}>
							<View
								style={{
									alignItems: 'center',
									flexDirection: 'column',
									justifyContent: 'center'
								}}
							>
								<Text style={styles.titleText}>
									Please confirm if information supplied below are correct.
								</Text>
								<View style={styles.dividerStyle} />

								<Text style={styles.textLink}>Name on Card</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>Name</Text>
								</View>
								<Text style={styles.textLink}>Address</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>Address</Text>
								</View>
								<Text style={styles.textLink}>PAN</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>1233455645213</Text>
								</View>
								<Text style={styles.textLink}>Payment Type</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>Visa</Text>
								</View>
								<Text style={styles.textLink}>Expiry Date</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>08/20</Text>
								</View>
								<Text style={styles.textLink}>CVV</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>358</Text>
								</View>
								<Text style={styles.textLink}>Billing Address</Text>
								<Text style={styles.textLink}>Street</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>Street</Text>
								</View>
								<Text style={styles.textLink}>City</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>City</Text>
								</View>
								<Text style={styles.textLink}>State</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>State</Text>
								</View>

								<Text style={styles.textLink}>Country</Text>
								<View style={styles.containerInput}>
									<Text style={styles.textLink}>Country</Text>
								</View>

								<Ripple
									style={styles.buttonSecondary}
									onPress={() => this.onClickGo()}
								>
									<Text style={styles.buttonNextText}>Edit</Text>
								</Ripple>

								<Ripple
									style={styles.buttonGo}
									onPress={() => this.onClickSave()}
								>
									<Text style={styles.buttonNextText}>Save</Text>
								</Ripple>
							</View>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}

	onClickSave() {
		Alert.alert(
			'Card Verified',
			`Card verified successfully.`,
			[
				{
					text: 'Yes',
					onPress: () => {
						this.props.navigation.popToTop();
					}
				}
			],
			{ cancelable: false }
		);
	}
}
