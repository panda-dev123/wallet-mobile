import {Dimensions, StyleSheet, TextInput, View} from "react-native";
import iconBack from "../../assets/icons/icon_back.png";
import colors from "../../theme/colors";


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
	iconQR: {
		width: 150,
		height: 150,
		marginTop: 50,
	},
	iconCopy: {
		width: 26,
		height: 26,
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
	containerInputAmount: {
		height: 40,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				borderBottomWidth: 1,
				borderBottomColor: colors.textInputUnderline,
			},
			android: {}
		}),
	},
	containerInputDescription: {
		height: 30,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: '#fff',
		...Platform.select({
			ios: {
				borderBottomWidth: 1,
				borderBottomColor: colors.textInputUnderline,
			},
			android: {}
		}),
	},

	containerInput: {
		backgroundColor: 'white',
		width: '100%',
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
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
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: colors.buttonBackgroundColor,
		// borderRadius: 1,
		// borderWidth: 1,
		// borderColor: '#fff',
	},
	buttonCreateDisabled: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		elevation: 5,
		marginRight: 40,
		marginLeft: 40,
		marginTop: 10,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: colors.buttonBackgroundColorDisabled,
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
	},
	dividerStyle: {
		marginTop: 10,
		marginBottom: 10,
		width: Dimensions.get('window').width,
		height: 2,
		backgroundColor: '#333'
	},
	textAmount: {
		fontSize: 18,
	},
	textAmountCurrency: {
		fontSize: 20,
		color: colors.navBarColor
	},
	textLink: {
		marginTop: 10,
		fontSize: 18,
		alignSelf: 'flex-start',
	},
	textDescription: {
		marginTop: 20,
		fontSize: 18,
		alignSelf: 'flex-start',
	},
});

