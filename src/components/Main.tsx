import React from "react";
import RecordInputBoard from "./RecordInputBoard";
import LocationBoard from "./LocationBoard";
import "./Main.scss";

const Main = () => {
  return (
    <div className="main">
      <h1>Karen's Travel Map</h1>
      <RecordInputBoard />
      <LocationBoard />
    </div>
  );
};

export default Main;
