import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bodyContainer: {
		marginTop: 10,
		justifyContent: 'center'
	},
	iconBack: {
		width: 30,
		height: 30,
		marginLeft: 5,
		marginRight: 5
	},
	header: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		backgroundColor: colors.statusBarColor,
		alignItems: 'center'
	},
	headerTitle: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		color: colors.navBarColor
	},
	titleText: {
		textAlign: 'center',
		fontSize: 15,
		marginTop: 10,
		marginBottom: 10
	},
	dividerStyle: {
		marginTop: 10,
		marginBottom: 10,
		width: Dimensions.get('window').width,
		height: 1
		//backgroundColor: colors.navBarColor,
	},
	listItemImage: {
		width: 50,
		height: 50,
		borderRadius: 50,
		overflow: 'hidden',
		marginLeft: 30
	},
	listItemText: {
		marginLeft: 20,
		fontSize: 18
	}
});
