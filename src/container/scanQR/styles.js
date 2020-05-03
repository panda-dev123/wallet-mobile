import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import iconBack from '../../assets/icons/icon_back.png';
import colors from '../../theme/colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'red';
const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';
const iconScanColor = 'blue';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bodyContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
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
	},
	rectangleContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},

	rectangle: {
		height: rectDimensions,
		width: rectDimensions,
		borderWidth: rectBorderWidth,
		borderColor: rectBorderColor,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},

	topOverlay: {
		flex: 1,
		height: SCREEN_WIDTH,
		width: SCREEN_WIDTH,
		backgroundColor: overlayColor,
		justifyContent: 'center',
		alignItems: 'center'
	},

	bottomOverlay: {
		flex: 1,
		height: SCREEN_WIDTH,
		width: SCREEN_WIDTH,
		backgroundColor: overlayColor,
		paddingBottom: SCREEN_WIDTH * 0.25
	},

	leftAndRightOverlay: {
		height: SCREEN_WIDTH * 0.65,
		width: SCREEN_WIDTH,
		backgroundColor: overlayColor
	},

	scanBar: {
		width: scanBarWidth,
		height: scanBarHeight,
		backgroundColor: scanBarColor
	}
});
