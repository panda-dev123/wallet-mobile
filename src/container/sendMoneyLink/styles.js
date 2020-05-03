import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import iconBack from '../../assets/icons/icon_back.png';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bodyContainer: {
		marginLeft: 30,
		marginTop: 10,
		marginRight: 30,
		justifyContent: 'center',
		flex: 1
	},
	iconBack: {
		width: 30,
		height: 30,
		marginLeft: 5,
		marginRight: 5
	},
	icon: {
		width: 30,
		height: 30
	},
	iconQR: {
		width: 150,
		height: 150,
		marginTop: 50
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
		fontSize: 17,
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	containerInput: {
		backgroundColor: 'white',
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		paddingLeft: 10,
		paddingRight: 10,
		...Platform.select({
			ios: {
				borderBottomWidth: 1,
				borderBottomColor: colors.textInputUnderline
			},
			android: {}
		})
	},
	buttonCreate: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: 45,
		marginTop: 10,
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 2,
		elevation: 5
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
		elevation: 5
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
		alignSelf: 'center'
	},
	titleContainer: {
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	dividerStyle: {
		marginTop: 10,
		marginBottom: 10,
		width: Dimensions.get('window').width,
		height: 2,
		backgroundColor: colors.navBarColor
	},
	textAmount: {
		fontSize: 30
	},
	textAmountCurrency: {
		fontSize: 20,
		color: colors.navBarColor,
		alignSelf: 'center'
	},
	qrIcon: {
		marginLeft: 5,
		fontSize: 100,
		color: colors.navBarColor,
		alignSelf: 'center'
	}
});
