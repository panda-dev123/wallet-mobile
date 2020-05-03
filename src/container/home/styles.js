import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	bodyContainer: {
		marginTop: 20
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
		height: 2,
		backgroundColor: colors.navBarColor
	},
	dividerVerticalStyle: {
		width: 2,
		height: '100%',
		backgroundColor: colors.navBarColor
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
	},
	titleTextStyle: {
		fontSize: 14,
		textAlign: 'center'
	},
	titlePrice: {
		fontSize: 14,
		marginTop: 5,
		marginBottom: 7,
		fontWeight: 'bold'
	},
	table: {
		marginTop: 20,
		borderTopWidth: 1,
		borderColor: colors.navBarColor
	},
	tableAmountColumn: {
		minWidth: 60,
		flex: 1,
		alignSelf: 'stretch',
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderColor: colors.navBarColor,
		alignItems: 'center',
		flexDirection: 'column'
	},
	tableTypeColumn: {
		minWidth: 60,
		flex: 1,
		alignSelf: 'stretch',
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderColor: colors.navBarColor,
		alignItems: 'center',
		flexDirection: 'column'
	},
	tableDateColumn: {
		minWidth: 100,
		flex: 1,
		alignSelf: 'stretch',
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderColor: colors.navBarColor,
		alignItems: 'center',
		flexDirection: 'column'
	},
	streamsTimeColumn: {
		minWidth: 100,
		flex: 1,
		alignSelf: 'stretch',
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderColor: colors.navBarColor,
		alignItems: 'center',
		flexDirection: 'column'
	},
	tableColumnTitle: {
		fontSize: 15,
		color: colors.black
		// textDecorationLine: 'underline'
	},
	tableColumnText: {},
	slide: {
		height: 180,
		resizeMode: 'stretch'
	},
	slideName: {
		fontSize: 20
	},
	slideType: {
		fontSize: 11
	},
	slideCurrency: {
		fontSize: 18
	},
	slideBalance: {
		fontSize: 17
	},
	iconSlide: {
		fontSize: 25,
		color: '#fff',
		alignSelf: 'flex-end',
		marginRight: 20
	},
	iconMiddle: {
		fontSize: 50,
		color: colors.navBarColor
	},
	iconHeaderStyle: {
		fontSize: 30,
		color: colors.navBarColor,
		marginHorizontal: 10
	},
	iconTitleStyle: {
		marginHorizontal: 10,
		fontSize: 40,
		color: colors.navBarColor
	},
	safeArea: {
		flex: 1,
		backgroundColor: colors.black
	},
	container: {
		flex: 1,
		backgroundColor: colors.background1
	},
	gradient: {
		...StyleSheet.absoluteFillObject
	},
	scrollview: {
		flex: 1
	},
	exampleContainer: {
		paddingVertical: 30
	},
	exampleContainerDark: {
		backgroundColor: colors.black
	},
	exampleContainerLight: {
		backgroundColor: 'white'
	},
	title: {
		paddingHorizontal: 30,
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.9)',
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	titleDark: {
		color: colors.black
	},
	subtitle: {
		marginTop: 5,
		paddingHorizontal: 30,
		backgroundColor: 'transparent',
		color: 'rgba(255, 255, 255, 0.75)',
		fontSize: 13,
		fontStyle: 'italic',
		textAlign: 'center'
	},
	slider: {
		marginTop: 15,
		overflow: 'visible' // for custom animations
	},
	sliderContentContainer: {
		paddingVertical: 10 // for custom animation
	},
	paginationContainer: {
		paddingVertical: 8
	},
	paginationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		marginHorizontal: 8
	}
});
