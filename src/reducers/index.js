import {combineReducers} from "redux";
import UserReducer from "./UserReducer";
import WalletReducer from "./WalletReducer";
import ContactsReducer from "./ContactsReducer";
import DialogReducer from "./DialogReducer";

export default combineReducers({
	user: UserReducer,
	wallet: WalletReducer,
	contact: ContactsReducer,
	dialog: DialogReducer,
});
