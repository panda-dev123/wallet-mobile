import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title } from 'native-base';

import { View, Image, SafeAreaView, Alert } from 'react-native';
import { styles } from './styles';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AtoZList from '../../libraries/react-native-atoz-list';
import * as _ from 'lodash';
import { Text, Card } from 'react-native-elements';
import colors from '../../theme/colors';
import { connect } from 'react-redux';
import { addBankAccount, getContacts } from '../../actions';
import Ripple from 'react-native-material-ripple';

class Contacts extends Component {
	state = {};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.getContacts();
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
						Contacts
					</Title>
				</Body>
				<Right style={{ flex: 1 }}>
					<Ripple
						onPress={() => {
							this.props.navigation.navigate('ContactAdd');
						}}
					>
						<Icon
							name={'account-multiple-plus-outline'}
							style={styles.iconHeaderStyle}
						/>
					</Ripple>
				</Right>
			</Header>
		);
	}

	renderBody() {
		if (this.props.getContactsLoading) {
			let Spinner = require('react-native-spinkit');
			return (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Spinner size={100} type={'Bounce'} color={colors.navBarColor} />
				</View>
			);
		}
		if (_.size(this.props.contacts) === 0) {
			let Spinner = require('react-native-spinkit');
			return (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Icon name={'account-multiple'} style={styles.iconLarge} />
					<Text>You don't have any contacts yet.</Text>
				</View>
			);
		}

		console.log('data', _.size(this.props.contacts), this.props.contacts);
		return (
			<AtoZList
				sectionHeaderHeight={35}
				cellHeight={95}
				data={this.props.contacts}
				hideSectionList={true}
				renderCell={this._renderCell.bind(this)}
				renderSection={this._renderHeader}
			/>
		);
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				{this.renderHeader()}
				{this.renderBody()}
			</SafeAreaView>
		);
		// return (
		// 	<SafeAreaView style={{flex: 1, marginBottom: 50}}>
		// 		<View style={styles.container}>
		// 			{this.renderHeader()}
		// 			<View style={styles.bodyContainer}>
		//
		// 				<View style={{flexDirection: 'column',}}>
		//
		// 					{/*<AlphaScrollFlatList*/}
		// 					{/*	contectContainerStyle={styles.scrollContainer}*/}
		// 					{/*	keyExtractor={this.keyExtractor.bind(this)}*/}
		// 					{/*	data={this.state.people.sort((prev, next) => prev.name.localeCompare(next.name))}*/}
		// 					{/*	renderItem={this.renderItem.bind(this)}*/}
		// 					{/*	scrollKey={'name'}*/}
		// 					{/*	reverse={false}*/}
		// 					{/*	itemHeight={50}*/}
		// 					{/*/>*/}
		//
		// 					<AtoZList
		// 						style={{backgroundColor: '#f00', width: '100%', height: '100%'}}
		// 						sectionHeaderHeight={35}
		// 						cellHeight={95}
		// 						data={names}
		// 						renderCell={this._renderCell}
		// 						renderSection={this._renderHeader}
		// 					/>
		//
		// 				</View>
		// 			</View>
		//
		// 		</View>
		// 	</SafeAreaView>
		// );
	}

	_renderHeader(data) {
		return (
			<View style={{ height: 35, justifyContent: 'center', paddingLeft: 10 }}>
				<Text h4 style={{ color: colors.black }}>
					{data.sectionId}
				</Text>
			</View>
		);
	}

	_renderCell(data) {
		return (
			<Card>
				<Ripple
					onPress={() => {
						this.props.navigation.navigate('ContactInfo', { data });
					}}
				>
					<View style={styles.cell}>
						<Image
							style={styles.listItemImage}
							source={require('../../assets/images/avatar.png')}
						/>
						<View>
							<Text style={styles.listItemText}>{data.nickName}</Text>
							<Text style={styles.listItemDesc}>Nickname</Text>
						</View>
					</View>
				</Ripple>
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {
		getContactsLoading: state.contact.getContactsLoading,
		contacts: state.contact.contacts,
		getContactsError: state.contact.getContactsError
	};
};
export default connect(mapStateToProps, { getContacts })(Contacts);
