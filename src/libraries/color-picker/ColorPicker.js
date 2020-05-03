import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getContrastYIQ } from './HelperFunctions';
import Ripple from 'react-native-material-ripple';

export default class ColorPicker extends Component {
	state = {
		colors: this.props.colors,
		selectedColor: this.props.selectedColor
	};

	renderItem = ({ item }) => {
		const fontColor = getContrastYIQ(item);
		return (
			<Ripple
				style={[styles.circle, { backgroundColor: item }]}
				onPress={() => {
					this.setState({ selectedColor: item });
					this.props.onSelect(item);
				}}
			>
				{this.state.selectedColor === item && (
					<Icon name="check" style={{ color: fontColor, fontSize: 24 }} />
				)}
			</Ripple>
		);
	};

	_keyExtractor = (item, index) => index;

	render() {
		return (
			<FlatList
				data={this.state.colors}
				extraData={this.state}
				renderItem={this.renderItem}
				keyExtractor={this._keyExtractor}
				horizontal={true}
				keyboardShouldPersistTaps="always"
				style={{ maxHeight: 75 }}
			/>
		);
	}
}

const styles = StyleSheet.create({
	circle: {
		width: 40,
		height: 40,
		borderRadius: 40,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
