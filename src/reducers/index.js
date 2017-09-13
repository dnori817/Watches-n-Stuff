import { combineReducers } from "redux";
import products from "./products";
import cart from "./cart";
import checkout from "./checkout";

export default combineReducers({
	products,
	cart,
	checkout,
});
