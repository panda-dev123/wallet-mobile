import {StyleSheet, TextInput, View} from "react-native";
import colors from "../../theme/colors";


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
		width: 70,
		height: 70
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
		backgroundColor: '#fff',
		height: 50,
		width: '100%',
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonNextText: {
		fontSize: 20,
		color: colors.buttonColor,
	},
	errorTextStyle: {
		fontSize: 14,
		color: colors.textInputUnderlineWrong,
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
		backgroundColor: colors.buttonBackgroundColor,
		// borderRadius: 1,
		// borderWidth: 1,
		// borderColor: '#fff',
	},
	buttonNext2: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		elevation: 5,
		marginRight: 40,
		marginLeft: 40,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: colors.buttonPrimaryBackgroundColor,
		// borderRadius: 1,
		// borderWidth: 1,
		// borderColor: '#fff',
	},
	inputStyle: {
		width: 200,
		fontSize: 20,
		marginLeft: 10,
	},
	titleStyle: {
		color: 'black',
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 30,
		lineHeight: 35,
		fontSize: 20,
		alignSelf: 'center',
		textAlign: 'center',
	}
});






