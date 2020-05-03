import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 100,
		height: 100
	},
	backgroundVideo: {
		height: height,
		position: 'absolute',
		top: 0,
		left: 0,
		alignItems: 'stretch',
		bottom: 0,
		right: 0
	}
});
