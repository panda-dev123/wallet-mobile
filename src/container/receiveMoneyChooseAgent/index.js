import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
	SafeAreaView,
	TouchableOpacity,
	Alert,
	FlatList
} from 'react-native';
import { styles } from './styles';
import iconBack from '../../assets/icons/icon_back.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
	CardItem
} from 'native-base';
import colors from '../../theme/colors';
import { HeaderWithBack } from '../../components/common/HeaderWithBack';

export default class ReceiveMoneyChooseAgent extends Component {
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
				headerTitle="Receive Money from Agent"
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
								Please choose an agent to receive from
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
}
