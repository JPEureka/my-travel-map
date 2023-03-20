import React from "react";
import { countryCodeMapper } from "../consts";
type props = {
  countryCode: string;
  onShowDetail: (code: string) => void;
};
const CountryBlock = (props: props) => {
  const { countryCode, onShowDetail } = props;
  return (
    <button
      onClick={() => onShowDetail(countryCode)}
      className={`country-block ${countryCode}`}
    >
      <img
        alt={countryCode}
        src={countryCodeMapper.getCountryFlag(countryCode)}
      />
    </button>
  );
};

export default CountryBlock;
