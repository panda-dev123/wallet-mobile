import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
	_navigator = navigatorRef;
}

function navigate(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		})
	);
}

function reset(routeName, params) {
	const resetAction = StackActions.reset({
		index: 0, actions: [NavigationActions.navigate({routeName, params})]
	});
	_navigator.dispatch(resetAction);
}

function pop(n = 1) {
	const popAction = StackActions.pop({
		n,
	});

	_navigator.dispatch(popAction);
}

export default {
	navigate,
	pop,
	reset,
	setTopLevelNavigator,
};
