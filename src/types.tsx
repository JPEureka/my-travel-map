export type countryListActionType = {
  type: string;
  key?: number;
  payload?: countryInfo;
};

export type countryInfo = {
  name: string;
  code: string;
  dates: string[];
};
