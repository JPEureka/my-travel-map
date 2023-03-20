//@ts-nocheck
import { legacy_createStore as createStore } from "redux";
import countryListReducer from "../reducers/countryListReducer";

const store = createStore(countryListReducer);

export default store;
