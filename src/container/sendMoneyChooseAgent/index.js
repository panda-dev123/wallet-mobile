import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	SafeAreaView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
	FlatList
} from 'react-native';
import { styles } from './styles';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class SendMoneyChooseAgent extends Component {
	state = {
		agentsList: [
			{ id: 1, name: 'John Doe 1' },
			{ id: 2, name: 'John Doe 2' },
			{ id: 3, name: 'John Doe 3' },
			{ id: 4, name: 'John Doe 4' }
		]
	};

	renderHeader() {
		return (
			<HeaderWithBack
				headerTitle="Send Money to Agent"
				navigation={this.props.navigation}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{this.renderHeader()}
					<View style={styles.bodyContainer}>
						<View
							style={{
								alignItems: 'center',
								flexDirection: 'column',
								justifyContent: 'center'
							}}
						>
							<Text style={styles.titleText}>
								Please choose an agent to send to
							</Text>
							<View style={styles.dividerStyle} />

							<FlatList
								data={this.state.agentsList}
								scrollEnabled={true}
								keyExtractor={item => item.id.toString()}
								renderItem={this.renderListItem.bind(this)}
							/>
						</View>
					</View>
				</View>
			</SafeAreaView>
		);
	}

	renderListItem({ item }) {
		return (
			<View style={{ flexDirection: 'column' }}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						style={styles.listItemImage}
						source={{
							uri:
								'https://www.chccw.org/wp-content/uploads/profile-icon-IMG-2-300x300.png'
						}}
					/>
					<Text style={styles.listItemText}>{item.name}</Text>
				</View>
				<View style={styles.dividerStyle} />
			</View>
		);
	}

	onClickItem() {
		Alert.alert(
			'Information',
			`Send 50 $\n from My Bank\nTo Agent`,
			[
				{
					text: 'No',
					onPress: () => this.props.navigation.pop(2)
				},
				{
					text: 'Yes',
					onPress: () => {
						Toast.show('Information added Successfully', {
							duration: Toast.durations.LONG,
							position: Toast.positions.BOTTOM,
							shadow: true,
							animation: true,
							hideOnPress: true,
							delay: 0,
							onHide: () => {
								this.props.navigation.pop(2);
							}
						});
					}
				}
			],
			{ cancelable: false }
		);
	}
}
