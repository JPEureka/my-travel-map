import { ADD_COUNTRY, REMOVE_COUNTRY } from "./actionTypes";

const addCountry = ({
  name,
  code,
  dates,
}: {
  name: string;
  code: string;
  dates: string[][];
}) => {
  return {
    type: ADD_COUNTRY,
    payload: { name, code, dates },
  };
};

const removeCounrty = (key: number) => {
  return {
    type: REMOVE_COUNTRY,
    key,
  };
};

export { addCountry, removeCounrty };
