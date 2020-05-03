import React from 'react';
import Routing from './routing';
import {connect} from "react-redux";
import AwesomeAlert from 'react-native-awesome-alerts';

class AppDialogWrapper extends React.Component {

	render() {
		return (
			<>
				<Routing/>
				{this.props.showProgressDialog &&
				<AwesomeAlert
					show={() => {
					}}
					showProgress={true}
					title={this.props.progressDialogTitle}
					message={this.props.progressDialogDescription}
					progressSize={'large'}
					contentContainerStyle={{minWidth: 250, paddingTop: 25, marginBottom: 10}}
					titleStyle={{marginTop: 15}}
					closeOnTouchOutside={false}
					closeOnHardwareBackPress={false}
					showCancelButton={false}
					showConfirmButton={false}
					// cancelText="No, cancel"
					// confirmText="Yes, delete it"
					confirmButtonColor="#DD6B55"
					onCancelPressed={() => {
						// this.hideAlert();
					}}
					onConfirmPressed={() => {
						// this.hideAlert();
					}}
				/>
				}
			</>
		);
	}

}


const mapStateToProps = state => {
	return {
		showProgressDialog: state.dialog.showProgressDialog,
		progressDialogTitle: state.dialog.progressDialogTitle,
		progressDialogDescription: state.dialog.progressDialogDescription,
	};
};

export default connect(mapStateToProps, {})(AppDialogWrapper);

