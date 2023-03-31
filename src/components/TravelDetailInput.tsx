import React from "react";
import "./TravelDetailInput.scss";
type props = {
  index: number;
  onChange: ({
    key,
    val,
    dateType,
  }: {
    key: number;
    val: string;
    dateType: string;
  }) => void;
  onDelete: (key: number) => void;
};

const TravelDetailInput = ({ index, onChange, onDelete }: props) => {
  return (
    <div className="travel-detail-input">
      <div className="start-date">
        <label htmlFor="st">Start Date:</label>
        <input
          id="st"
          data-testid={`st-input-${index}`}
          onChange={e => {
            onChange({ key: index, val: e.target.value, dateType: "st" });
          }}
          type="date"
        />
      </div>
      <div className="end-date">
        <label htmlFor="et">End Date:</label>
        <input
          id="et"
          data-testid={`et-input-${index}`}
          onChange={e => {
            onChange({ key: index, val: e.target.value, dateType: "et" });
          }}
          type="date"
        />
      </div>
      <div className="travel-note">
        <label htmlFor="travelNote">Trip Note</label>
        <textarea
          className="travel-note-textarea"
          placeholder="Enter anything you want it to be recorded during the journey"
          id="travelNote"
          spellCheck="false"
        ></textarea>
      </div>
      <button
        data-testid="removeLogBtn"
        className="remove-log-btn"
        onClick={() => onDelete(index)}
      >
        -
      </button>
    </div>
  );
};

export default TravelDetailInput;
