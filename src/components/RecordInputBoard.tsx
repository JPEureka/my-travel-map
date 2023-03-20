import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountry, removeCounrty } from "../actions/countryListAction";
import { countryInfo } from "../types";
import { getCountryNameList, countryCodeMapper } from "../consts";
import "./RecordInputBoard.scss";
import TravelDateInput from "./TravelDateInput";
const RecordInputBoard = () => {
  const state = useSelector((state: { countries: countryInfo[] }) => state);
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showAutoComplete, setShowAutoComplete] = React.useState(false);
  const [travelDates, setTravelDates] = React.useState<string[][]>([]);
  const [autoCompleteList, setAutoCompleteList] =
    React.useState(getCountryNameList);
  console.log(state);
  let debunceTimeout: any;
  const debunceFilter = (val: any) => {
    clearTimeout(debunceTimeout);

    debunceTimeout = setTimeout(() => {
      if (val) {
        setAutoCompleteList(
          getCountryNameList.filter((item) =>
            item.toLowerCase().includes(val.toLowerCase())
          )
        );
      }
    }, 500);
  };

  const addDateEntry = () => {
    const newObj = ["", ""];
    setTravelDates([...travelDates, newObj]);
  };
  const onDateEntryUpdate = ({
    key,
    val,
    index,
  }: {
    key: number;
    val: string;
    index: number;
  }) => {
    console.log(val);
    let nv = travelDates.slice();
    nv[key][index] = val;
    setTravelDates(nv);
  };
  const onDateEntryDelete = (key: number) => {
    let nv = travelDates.slice();
    nv.splice(key, 1);
    setTravelDates(nv);
  };
  return (
    <div className="record-input-board">
      <h4>Input Your Travel Record</h4>
      <section
        className="country-input-section"
        onClick={() => setShowAutoComplete(!showAutoComplete)}
      >
        <span>Travel Country</span>
        <input
          type="text"
          ref={inputRef}
          placeholder="Enter country name"
          className="country-name-input"
          id="countryNameInput"
          aria-label="Enter country name"
          onKeyUp={(evt) =>
            debunceFilter((evt.target as HTMLInputElement).value)
          }
        />
        {showAutoComplete && autoCompleteList.length ? (
          <div className="auto-complete-list">
            {autoCompleteList.map((item, i) => (
              <span
                key={i}
                onClick={(event) => {
                  event?.stopPropagation();
                  (
                    document.querySelector(
                      "#countryNameInput"
                    ) as HTMLInputElement
                  ).value = item;
                  setShowAutoComplete(false);
                }}
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </section>
      <section className="travel-dates">
        <button className="add-travel-date-btn" onClick={addDateEntry}>
          Add travel date
        </button>
        {travelDates.map((entry, i) => (
          <TravelDateInput
            key={i}
            index={i}
            onChange={onDateEntryUpdate}
            onDelete={onDateEntryDelete}
          />
        ))}
      </section>
      <button
        onClick={() => {
          const input = document.querySelector(
            "#countryNameInput"
          ) as HTMLInputElement;
          if (input.value) {
            const code = countryCodeMapper.getCountryCode(input.value);
            dispatch(
              addCountry({ name: input.value, code, dates: travelDates })
            );
            input.value = "";
            setTravelDates([]);
          }
        }}
      >
        +
      </button>
      {state && state?.countries?.length ? (
        <section className="travel-list-section">
          {state.countries.map((item, index) => (
            <div key={index} className="travel-country-item">
              <img
                alt={item.name}
                src={countryCodeMapper.getCountryFlag(item.code)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeCounrty(index));
                }}
              >
                X
              </button>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
};

export default RecordInputBoard;
