import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around'
	},
	bodyContainer: {
		marginLeft: 30,
		marginTop: 10,
		marginRight: 30,
		justifyContent: 'center'
	},
	logo: {
		width: '90%',
		height: '50%'
	},
	icon: {
		width: 30,
		height: 30
	},
	header: {
		width: '100%',
		height: 80,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center'
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
		width: '80%',
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5
	},
	buttonNextText: {
		fontSize: 20,
		color: colors.buttonColor
	},
	buttonCreate: {
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
	buttonForgot: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		elevation: 5,
		marginRight: 40,
		marginLeft: 40,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: colors.buttonPrimaryBackgroundColor
		// borderRadius: 1,
		// borderWidth: 1,
		// borderColor: '#fff',
	},
	inputStyle: {
		width: 200,
		fontSize: 20,
		marginLeft: 10,
		textAlign: 'center'
	},
	titleStyle: {
		color: 'black',
		marginLeft: 10,
		marginRight: 10,
		lineHeight: 35,
		fontSize: 20
	},
	titleContainer: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	}
});
