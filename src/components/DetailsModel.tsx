import React from "react";
import { useSelector } from "react-redux";
import { countryInfo } from "../types";
import { countryCodeMapper } from "../consts";
import "./DetailsModel.scss";

type props = { code: string; onModalClose: () => void };
const DetailsModel = ({ code, onModalClose }: props) => {
  const state = useSelector((state: { countries: countryInfo[] }) => state);
  const countryName = countryCodeMapper.getCountryName(code);
  let travelInfo = [] as countryInfo[];
  console.log(state);
  if (state?.countries) {
    travelInfo = state.countries.filter((data) => data.code === code);
  }
  console.log(travelInfo);
  return (
    <div className="details-modal">
      <section className="card-header">
        <span>DETAILS</span>
        <button onClick={onModalClose}>x</button>
      </section>
      {travelInfo.length ? (
        <section>
          <span className="detail-counrty-name">{travelInfo[0].name}</span>
          <div className="detail-travel-dates">
            {travelInfo[0].dates.map((date, i) => (
              <div key={i}>
                <span>{date[0]}</span> -<span>{date[1]}</span>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <span>{`OOPS! NO TRAVEL RECORDS THIS COUNTRY: ${countryName}`}</span>
      )}
    </div>
  );
};

export default DetailsModel;
