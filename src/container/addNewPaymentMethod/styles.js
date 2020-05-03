import {StyleSheet, TextInput, View} from "react-native";
import iconBack from "../../assets/icons/icon_back.png";
import colors from '../../theme/colors';


export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bodyContainer: {
		marginLeft: 30,
		marginTop: 10,
		marginRight: 30,
		justifyContent: 'center'
	},
	iconBack: {
		width: 30,
		height: 30,
		marginLeft: 5,
		marginRight: 5,
	},
	icon: {
		width: 30,
		height: 30
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
		fontSize: 20,
		marginTop: 30,
		marginBottom: 30
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
		marginTop: 5,
	},
	buttonText: {
		fontSize: 20,
		color: colors.buttonColor,
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
		backgroundColor: colors.buttonBackgroundColor,
		// borderRadius: 1,
		// borderWidth: 1,
		// borderColor: '#fff',
	},
	buttonForgot: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 200,
		height: 45,
		marginTop: 20,
		backgroundColor: '#aaa',
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 2,
		elevation: 5,
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
		fontSize: 20,
	},
	titleContainer: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
	}
});






