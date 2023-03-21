type logsType = Array<{ st: string; et: string; notes: string }>;
export type countryListActionType = {
  type: string;
  key?: number;
  payload?: countryInfo;
};

export type countryInfo = {
  name: string;
  code: string;
  logs: logsType;
};
