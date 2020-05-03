import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	logo: {
		width: 50,
		height: 50
	},
	header: {
		width: '100%',
		height: 80,
		alignItems: 'center',
		flexDirection: 'row'
	},
	headerItemMiddle: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		margin: 15
	},
	containerInput: {
		backgroundColor: 'white',
		height: 50,
		width: '100%',
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		...Platform.select({
			ios: {
				borderBottomWidth: 1,
				borderBottomColor: colors.textInputUnderline
			},
			android: {}
		})
	},
	buttonNextText: {
		fontSize: 20,
		color: colors.buttonColor
	},
	buttonNext: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		elevation: 5,
		marginRight: 40,
		marginLeft: 40,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: colors.buttonBackgroundColor
		// borderRadius: 1,
		// borderWidth: 1,
		// borderColor: '#fff',
	},
	inputStyle: {
		flex: 1,
		fontSize: 20,
		marginLeft: 10,
		marginRight: 10
	},
	titleText: {
		color: 'black',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		lineHeight: 35,
		fontSize: 20,
		textAlign: 'center'
	},
	bodyContainer: {
		flex: 1,
		marginLeft: 30,
		marginTop: 10,
		marginRight: 30
	}
});
