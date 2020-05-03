import {Dimensions, StyleSheet} from "react-native";
import colors from "../../theme/colors";


export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bodyContainer: {
		marginTop: 10,
		justifyContent: 'center'
	},
	iconBack: {
		width: 30,
		height: 30,
		marginLeft: 5,
		marginRight: 5,
	},
	header: {
		width: '100%',
		height: 50,
		flexDirection: 'row',
		backgroundColor: colors.navBarColor,
		alignItems: 'center'
	},
	headerTitle: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		color: '#fff'
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
		height: 1,
		backgroundColor: colors.navBarColor,
	},

	scrollContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 50,
	},
	itemContainer: {
		width: Dimensions.get('window').width,
		flex: 1,
		flexDirection: 'row',
		height: 50,
	},
	itemTitle: {
		fontWeight: 'bold',
		color: '#333',
		padding: 5,
	},
	itemSubtitle: {
		color: '#555',
		padding: 5,
		paddingTop: 0,
	},
	swipeContainer: {},
	alphabetSidebar: {
		position: 'absolute',
		backgroundColor: 'transparent',
		top: 0,
		bottom: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listItemImage: {
		width: 50,
		height: 45,
		borderRadius: 50,
		overflow: 'hidden',
		marginLeft: 10,
	},
	listItemText: {
		fontSize: 15,
		marginLeft: 10,
		color: colors.black,
	},
	listItemDesc: {
		fontSize: 13,
		marginLeft: 10,
		color: colors.black,
	},
	cell: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconHeaderStyle: {
		fontSize: 30,
		color: '#fff',
		marginHorizontal: 10,
	},
});

