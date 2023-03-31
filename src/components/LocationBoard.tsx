import React from "react";
import CountryBlock from "./CountryBlock";
import { availableCountry } from "../consts";
import "./LocationBoard.scss";
import DetailsModel from "./DetailsModal";
const LocationBoard = () => {
  const [showDetailInfo, setShowDetailInfo] = React.useState(false);
  const [currentShowCode, setCurentShowCode] = React.useState("");
  const onShow = (code: string) => {
    setCurentShowCode(code);
    setShowDetailInfo(true);
  };
  return (
    <div className="location-board" data-testid="locationBoard">
      {showDetailInfo && currentShowCode ? (
        <DetailsModel
          countryCode={currentShowCode}
          onModalClose={() => setShowDetailInfo(false)}
        />
      ) : null}
      <div className="pn" />
      <div className="ps" />
      {availableCountry.map((code, i) => (
        <CountryBlock onShowDetail={onShow} key={i} countryCode={code} />
      ))}
    </div>
  );
};

export default LocationBoard;
