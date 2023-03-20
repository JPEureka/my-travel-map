import { ADD_COUNTRY, REMOVE_COUNTRY } from "../actions/actionTypes";
import { countryListActionType, countryInfo } from "../types";

const initState = {
  countries: [] as countryInfo[],
};
const countryListReducer = (
  state = initState,
  action: countryListActionType
) => {
  switch (action.type) {
    case ADD_COUNTRY:
      return { countries: [...state.countries, action.payload] };
    case REMOVE_COUNTRY:
      if (action.key !== undefined) {
        let newList = state.countries.slice();
        newList.splice(action.key, 1);
        return { countries: newList };
      }
      return state;
  }
};
export default countryListReducer;
