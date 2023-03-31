import React from "react";
import { countryCodeMapper } from "../consts";
type props = {
  countryCode: string;
  onShowDetail: (code: string) => void;
};

const CountryBlock = (props: props) => {
  const { countryCode, onShowDetail } = props;
  const countryName = countryCodeMapper.getCountryName(countryCode);
  return (
    <button
      title={countryName}
      aria-label={countryName}
      onClick={() => onShowDetail(countryCode)}
      className={`country-block ${countryCode}`}
    >
      <img alt="" src={countryCodeMapper.getCountryFlag(countryCode)} />
    </button>
  );
};

export default CountryBlock;
