import React, { Component } from 'react';
import { Header, Left, Body, Right, Title } from 'native-base';
import colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ripple from 'react-native-material-ripple';

const HeaderWithBack = ({ headerTitle, navigation }) => {
	return (
		<Header
			style={{
				width: '100%',
				height: 50,
				flexDirection: 'row',
				backgroundColor: colors.statusBarColor,
				alignItems: 'center'
			}}
			iosBarStyle="dark-content"
			barStyle="dark-content"
			androidStatusBarColor={colors.statusBarColor}
		>
			<Left style={{ flex: 1 }}>
				<Ripple
					onPress={() => {
						navigation.pop();
					}}
				>
					<Icon name={'chevron-left'} style={{ marginLeft: 5, fontSize: 42 }} />
				</Ripple>
			</Left>
			<Body style={{ flex: 3, justifyContent: 'center' }}>
				<Title
					style={
						({
							flex: 1,
							textAlign: 'center',
							fontSize: 20,
							color: colors.navBarColor
						},
						{ alignSelf: 'center', color: colors.navBarColor })
					}
				>
					{headerTitle}
				</Title>
			</Body>
			<Right style={{ flex: 1 }}></Right>
		</Header>
	);
};

export { HeaderWithBack };
