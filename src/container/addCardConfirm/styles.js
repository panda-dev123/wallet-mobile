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
		fontSize: 17,
		marginTop: 10,
		marginBottom: 10
	},
	containerInputAmount: {
		backgroundColor: 'white',
		height: 40,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
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
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		...Platform.select({
			ios: {
				borderBottomWidth: 1,
				borderBottomColor: colors.textInputUnderline,
			},
			android: {}
		}),
	},
	containerInputDate: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 3,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		...Platform.select({
			ios: {
				borderBottomWidth: 1,
				borderBottomColor: colors.textInputUnderline,
			},
			android: {}
		}),
	},
	buttonNextText: {
		fontSize: 20,
		color: colors.buttonColor,
	},
	buttonGo: {
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
	buttonSecondary: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 45,
		elevation: 5,
		marginTop: 30,
		marginRight: 40,
		marginLeft: 40,
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
		height: 1,
		backgroundColor: colors.navBarColor
	},
	textAmount: {
		fontSize: 20,
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






