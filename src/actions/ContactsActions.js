import ApiInterface from "../utils/ApiInterface";
import Database from "../utils/Database";
import NavigationService from "../utils/NavigationService";
import Utils from "../utils/Utils";
import { GET_CONTACTS, GET_CONTACTS_SUCCESS, GET_CONTACTS_FAIL } from "./types";
import _ from "lodash";

export function getContacts() {
  return dispatch => {
    dispatch({ type: GET_CONTACTS });

		ApiInterface.instance.getContacts()
			.then(response => {
				if (response.data.code === 0) {
					let data = {};
					if (response.data.result.length > 0) {
						data = _.groupBy(response.data.result, ({nickName}) => nickName[0].toUpperCase());
					}
					console.log(data);
					dispatch({
						type: GET_CONTACTS_SUCCESS,
						payload: data
					});
				} else {
					Utils.showToast(response.data.message);
					dispatch({type: GET_CONTACTS_FAIL});
				}
			})
			.catch((error) => {
				dispatch({type: GET_CONTACTS_FAIL});
				console.log(error);
			});
	};
}

export function addContactByPhone(phone, alias) {
  return dispatch => {
    Utils.showProgress("Loading...", "Please wait...");
    ApiInterface.instance
      .findUserByMobileNumber(phone)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(addContact(response.data.result, alias));
        } else {
          Utils.showToast(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function addContactByEmail(email, alias) {
  return dispatch => {
    Utils.showProgress("Loading...", "Please wait...");
    ApiInterface.instance
      .findUserByMobileEmail(email)
      .then(response => {
        if (response.data.code === 0) {
          dispatch(addContact(response.data.result, alias));
        } else {
          Utils.showToast(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addContact(id, alias) {
  return dispatch => {
    ApiInterface.instance
      .addContact(id, alias)
      .then(response => {
        if (response.data.code === 0) {
          Utils.showToast("Contact Added successfully.");
          NavigationService.pop();
          dispatch(getContacts());
          Utils.hideProgress();
        } else {
          Utils.hideProgress();
          Utils.showToast(response.data.message);
        }
      })
      .catch(error => {
        Utils.hideProgress();
        console.log(error);
      });
  };
}
