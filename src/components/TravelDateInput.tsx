import React from "react";

type props = {
  index: number;
  onChange: ({
    key,
    val,
    index,
  }: {
    key: number;
    val: string;
    index: number;
  }) => void;
  onDelete: (key: number) => void;
};

const TravelDateInput = ({ index, onChange, onDelete }: props) => {
  console.log(index);
  return (
    <div className="travel-date-entry">
      <input
        onChange={(e) => {
          console.log(e.target.value);
          onChange({ key: index, val: e.target.value, index: 0 });
        }}
        type="date"
      />
      -
      <input
        onChange={(e) => {
          console.log(e.target.value);
          onChange({ key: index, val: e.target.value, index: 1 });
        }}
        type="date"
      />
      <button onClick={() => onDelete(index)}>-</button>
    </div>
  );
};

export default TravelDateInput;
