import React, { Component } from 'react';
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

class ChooseContact extends Component {
	state = {};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.getContacts();
	}

	renderHeader() {
		return (
			<View style={styles.header}>
				<Ripple
					onPress={() => {
						this.props.navigation.pop();
					}}
				>
					<Icon
						color={'#fff'}
						style={{ marginLeft: 5, fontSize: 42 }}
						name="chevron-left"
					/>
				</Ripple>
				<Text style={styles.headerTitle}>Contacts</Text>
				<View style={styles.iconBack} />
			</View>
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
					<Text>No Contact</Text>
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
						let callback = this.props.navigation.getParam('callback', null);
						if (callback !== null) {
							callback(data);
						}
						this.props.navigation.pop();
					}}
				>
					<View style={styles.cell}>
						<Image
							style={styles.listItemImage}
							source={require('../../assets/images/avatar.png')}
						/>
						<View>
							<Text style={styles.listItemText}>{data.nickName}</Text>
							<Text style={styles.listItemDesc}>{data.name}</Text>
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
export default connect(mapStateToProps, { getContacts })(ChooseContact);
