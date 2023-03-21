import { ADD_COUNTRY, REMOVE_COUNTRY } from "./actionTypes";

const addCountry = ({
  name,
  code,
  logs,
}: {
  name: string;
  code: string;
  logs: Array<{}>;
}) => {
  return {
    type: ADD_COUNTRY,
    payload: { name, code, logs },
  };
};

const removeCounrty = (key: number) => {
  return {
    type: REMOVE_COUNTRY,
    key,
  };
};

export { addCountry, removeCounrty };
