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
  if (state?.countries) {
    travelInfo = state.countries.filter((data) => data.code === code);
  }
  return (
    <div className="details-modal">
      <section className="card-header">
        <h2>DETAILS</h2>
        <button
          aria-label="Close"
          className="close-modal"
          onClick={onModalClose}
        >
          x
        </button>
      </section>
      <section className="card-content">
        {travelInfo.length ? (
          <div className="travel-details">
            <span className="detail-counrty-name">{travelInfo[0].name}</span>
            <div className="travel-logs">
              {travelInfo[0].logs.map((log, i) => (
                <div key={i} className="travel-log">
                  <div className="travel-dates">
                    <span>{log.st}</span> - <span>{log.et}</span>
                  </div>
                  <div className="travel-notes">
                    <label>Travel Notes</label>
                    <div className="notes">{log.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <span>{`OOPS! NO TRAVEL RECORDS FOR THIS COUNTRY: ${countryName}`}</span>
        )}
      </section>
      <section className="card-footer">
        <button
          aria-label="Close"
          className="close-modal"
          onClick={onModalClose}
        >
          Close
        </button>
      </section>
    </div>
  );
};

export default DetailsModel;
