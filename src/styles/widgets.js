import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import {
	TEXT_INPUT_UNDERLINE,
	TIPPING_COLOR,
	ICON,
	NAV_BAR,
	TEXT_LIGHT,
	WHITE,
	TIPEE,
	TIPPER,
	BLACK
} from '../styles/colors';

function commonMiniMarginSizer(screenWidth) {
	if (screenWidth > 400) {
		return 10;
	} else if (screenWidth > 250) {
		return 5;
	} else {
		return 3;
	}
}

function commonSmallMarginSizer(screenWidth) {
	if (screenWidth > 400) {
		return 15;
	} else if (screenWidth > 250) {
		return 10;
	} else {
		return 5;
	}
}

//Used in slider
const sliderColors = {
	black: '#1a1917',
	gray: '#888888',
	background1: '#B721FF',
	background2: '#21D4FD'
};

const widgets = StyleSheet.create({
	arrowBack: {
		position: 'absolute',
		height: 50,
		width: 50
	},
	textNoData: {
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center'
	},
	textLeftArrow: {
		flex: 1,
		fontSize: 26,
		textAlign: 'right',
		marginRight: 50
	},
	textRightArrow: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 50,
		justifyContent: 'flex-end',
		fontSize: 26
	},
	centerText: {
		textAlign: 'center'
	},
	leftText: {
		textAlign: 'left'
	},
	commonMarginTop2: {
		marginTop: 15
	},
	header: {
		height: 230,
		width: null
	},
	underLinedText: {
		textDecorationLine: 'underline'
	},
	commonMarginTop: {
		marginTop: 20
	},
	centerView: {
		justifyContent: 'center'
	},
	centerImage: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	flexEndView: {
		justifyContent: 'flex-end'
	},
	alignRightView: {
		flex: 1,
		alignItems: 'flex-end',
		marginRight: commonMiniMarginSizer(width)
	},
	alignRightViewWithNoMargin: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	alignLeftView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginLeft: 10
	},
	textAlignRight: {
		flex: 1,
		textAlign: 'right'
	},
	textAlignLeft: {
		flex: 1,
		textAlign: 'left'
	},
	commonMarginRight: {
		marginRight: 10
	},
	commonMarginLeft: {
		marginLeft: 10
	},
	commonPaddingRight: {
		paddingRight: 10
	},
	commonPaddingLeft: {
		paddingLeft: 10
	},
	commonPaddingBottom: {
		paddingLeft: 10
	},
	commonPaddingTop: {
		paddingTop: 10
	},
	commonMarginLeft2: {
		marginLeft: commonSmallMarginSizer(width)
	},
	commonFlex: {
		flex: 1
	},
	commonMarginLeftRight: {
		marginLeft: 10,
		marginRight: 10
	},
	alignRightViewIcon: {
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	spaceAround: {
		justifyContent: 'space-around'
	},
	commonMarginBottom: {
		marginBottom: 10
	},
	commonPadding: {
		paddingLeft: 20,
		paddingRight: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	commonPaddingTopAndBottom: {
		paddingTop: 5,
		paddingBottom: 5
	},
	flexRow: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center'
	},
	commonPaddingSmall: {
		padding: 5
	},
	commonTextInput: {
		marginLeft: 10,
		flex: 1,
		height: 40,
		paddingLeft: 6
	},
	commonTextInputWithNoMarLeft: {
		flex: 1,
		height: 40,
		paddingLeft: 6
	},
	countryText: {
		paddingLeft: 10,
		paddingTop: 5
	},
	iconTextInputView: {
		marginLeft: 30,
		marginRight: 30,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: WHITE,
		backgroundColor: WHITE,
		padding: 10
	},
	loginBtn: {
		backgroundColor: WHITE,
		paddingTop: 10,
		paddingBottom: 10,
		marginLeft: 35,
		marginRight: 35,
		marginBottom: 10,
		textAlign: 'center'
	},
	centerItemsInside: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	setupDoneIcon: {
		height: 75,
		width: 75
	},
	editIcon: {
		height: 12,
		width: 12
	},
	validatePinIcon: {
		height: 20,
		width: 20
	},
	continueMarginTop: {
		marginTop: 10
	},
	bottomView: {
		justifyContent: 'space-between'
	},
	continueButton: {
		marginRight: 40,
		marginLeft: 40,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: TEXT_INPUT_UNDERLINE,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	continueBtnWithNoMarLeftRight: {
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: TEXT_INPUT_UNDERLINE,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	tippingButton: {
		marginRight: 40,
		marginLeft: 40,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: TIPPING_COLOR,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	changeCardButton: {
		marginRight: 20,
		marginLeft: 20,
		marginTop: 5,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: TIPPING_COLOR,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	tippingBtnWithNoMarLeftRight: {
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: TIPPING_COLOR,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	cancelButton: {
		marginRight: 80,
		marginLeft: 80,
		marginTop: 30,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: ICON,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	continueButtonText: {
		color: WHITE,
		textAlign: 'center',
		paddingLeft: 10,
		paddingRight: 10
	},
	appHeaderBg: {
		backgroundColor: NAV_BAR,
		borderBottomColor: 'transparent',
		borderBottomWidth: 0
	},
	profileIcon: {
		height: 150,
		width: 150
	},
	mapView: {
		flex: 1,
		marginLeft: 10,
		marginRight: 10
	},
	cardImg: {
		flex: 1,
		marginRight: 20,
		marginLeft: 20
	},
	cardImg2: {
		width: null,
		height: 150,
		marginRight: 20,
		marginLeft: 20
	},
	tippableThumbnail: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100
	},
	confirmTippableThumbnail: {
		width: 150,
		height: 150
	},
	//Used in slider
	safeArea: {
		flex: 1,
		backgroundColor: sliderColors.black
	},
	container: {
		flex: 1,
		backgroundColor: sliderColors.background1
	},
	gradient: {
		...StyleSheet.absoluteFillObject
	},
	scrollview: {
		flex: 1
	},
	exampleContainer: {
		paddingVertical: 0
	},
	exampleContainerDark: {
		backgroundColor: sliderColors.black
	},
	exampleContainerLight: {
		backgroundColor: 'white'
	},
	slider: {
		marginTop: 0,
		overflow: 'visible' // for custom animations
	},
	sliderContentContainer: {
		paddingVertical: 0 // for custom animation
	},
	paginationContainer: {
		paddingVertical: 8
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 8
	},
	deleteCardBtn: {
		padding: 10,
		marginTop: 10,
		backgroundColor: TEXT_INPUT_UNDERLINE,
		borderRadius: 1,
		borderWidth: 1,
		borderColor: WHITE
	},
	deleteCardText: {
		color: WHITE,
		fontSize: 10,
		marginTop: -8
	},
	logo: {
		height: null,
		width: null
	},
	commonInput: {
		backgroundColor: WHITE,
		borderColor: WHITE,
		borderRadius: 15,
		margin: 8
	},
	commonInputErr: {
		backgroundColor: WHITE,
		borderColor: 'red',
		borderRadius: 5,
		margin: 8
	},
	commonTextErr: {
		marginLeft: 20,
		fontSize: 12,
		marginTop: 5,
		color: 'red'
	},
	commonText: {
		marginLeft: 20,
		fontSize: 12,
		marginTop: 5,
		color: TEXT_LIGHT
	},
	commonText: {
		marginLeft: 20,
		fontSize: 12,
		marginTop: 5,
		color: TEXT_LIGHT
	},
	commonTextConversion: {
		marginLeft: 20,
		marginBottom: 10,
		fontSize: 12,
		color: BLACK
	},
	formItemForFloatingLabel: {
		backgroundColor: WHITE,
		borderColor: WHITE,
		borderRadius: 5,
		paddingLeft: 10
	},
	formPickerItem: {
		backgroundColor: WHITE,
		borderColor: WHITE,
		borderRadius: 15
	},
	formItemMarginForCardDetails: {
		marginLeft: 5,
		marginRight: 0
	},
	formItemMargin: {
		marginLeft: 5,
		marginRight: 0,
		marginTop: 25,
		paddingBottom: 5
	},
	cardOptionSize: {
		width: 175,
		height: 150,
		resizeMode: 'contain'
	},
	commonBtnTitleStyle: {
		color: WHITE
	},
	commonBtnStyle: {
		backgroundColor: TIPPER,
		borderRadius: 57
	},
	warningBtnStyle: {
		backgroundColor: TIPEE,
		borderRadius: 57
	},
	commonBtnStyleWithBorder: {
		backgroundColor: WHITE,
		borderRadius: 57,
		borderColor: TIPPER,
		borderWidth: 1
	},
	commonDisabledBtnStyleWithBorder: {
		backgroundColor: TEXT_LIGHT,
		borderRadius: 57,
		borderColor: TEXT_LIGHT,
		borderWidth: 1
	},
	commonBtnConStyle: {
		marginLeft: 30,
		marginTop: 10,
		marginRight: 30,
		marginBottom: 30
	},
	viewAlignBottom: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	headerLogo: {
		width: '90%',
		height: '50%'
	}
});

export { widgets, sliderColors };
