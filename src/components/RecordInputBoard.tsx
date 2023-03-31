import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCountry, removeCounrty } from "../actions/countryListAction";
import { countryInfo } from "../types";
import { getCountryNameList, countryCodeMapper } from "../consts";
import "./RecordInputBoard.scss";
import TravelDetailInput from "./TravelDetailInput";
const RecordInputBoard = () => {
  const state = useSelector((state: { countries: countryInfo[] }) => state);
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showAutoComplete, setShowAutoComplete] = React.useState(false);
  const [travelDetails, setTravelDates] = React.useState<
    Array<{ st: string; et: string; notes: string }>
  >([]);
  const [autoCompleteList, setAutoCompleteList] =
    React.useState(getCountryNameList);

  let debunceTimeout: any;
  const debunceFilter = (val: any) => {
    clearTimeout(debunceTimeout);
    debunceTimeout = setTimeout(() => {
      if (val) {
        setAutoCompleteList(
          getCountryNameList.filter(item =>
            item.toLowerCase().includes(val.toLowerCase())
          )
        );
      }
    }, 200);
  };

  const addDateEntry = React.useCallback(() => {
    setTravelDates([...travelDetails, { st: "", et: "", notes: "" }]);
  }, [travelDetails]);
  const onDateEntryUpdate = React.useCallback(
    ({
      key,
      val,
      dateType,
    }: {
      key: number;
      val: string;
      dateType: string;
    }) => {
      let nv: Array<{ st: string; et: string; notes: string }> =
        travelDetails.slice();
      if (!nv[key]) {
        nv[key] = { st: "", et: "", notes: "" };
      }
      if (dateType === "st") nv[key].st = val;
      else nv[key].et = val;

      setTravelDates(nv);
    },
    [travelDetails]
  );
  const onDateEntryDelete = React.useCallback(
    (key: number) => {
      let nv = travelDetails.slice();
      nv.splice(key, 1);
      setTravelDates(nv);
    },
    [travelDetails]
  );

  const setNotes = () => {
    let nv = travelDetails.slice();
    document.querySelectorAll(".travel-note-textarea").forEach((el, i) => {
      nv[i].notes = (el as HTMLInputElement).value;
    });
  };

  return (
    <div className="record-input-board" data-testid="recordInputBoard">
      <h4 className="record-title">Input Your Travel Record</h4>
      <section
        data-testid="countryInputSection"
        className="country-input-section"
      >
        <label htmlFor="countryNameInput">Travel Country</label>
        <input
          data-testid="countryNameInput"
          type="text"
          ref={inputRef}
          placeholder="Enter country name"
          className="country-name-input"
          id="countryNameInput"
          aria-label="Enter country name"
          onClick={() => setShowAutoComplete(!showAutoComplete)}
          onChange={evt =>
            debunceFilter((evt.target as HTMLInputElement).value)
          }
        />
        {showAutoComplete && autoCompleteList.length ? (
          <div className="auto-complete-list" data-testid="autoCompleteList">
            {autoCompleteList.map((item, i) => (
              <span
                key={i}
                onClick={event => {
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
      <section className="travel-logs" data-testid="travelLogsSection">
        <div className="add-log">
          <label htmlFor="addTravelLogBtn"> Add travel log</label>
          <button
            id="addTravelLogBtn"
            data-testid="addTravelLogBtn"
            className="add-travel-log-btn"
            onClick={addDateEntry}
          >
            +
          </button>
        </div>

        <div className="travel-logs">
          {travelDetails.map((entry, i) => (
            <TravelDetailInput
              key={i}
              index={i}
              onChange={onDateEntryUpdate}
              onDelete={onDateEntryDelete}
            />
          ))}
        </div>
      </section>
      <button
        data-testid="addRecordBtn"
        className="add-record-btn"
        aria-label="add record"
        onClick={() => {
          const input = document.querySelector(
            "#countryNameInput"
          ) as HTMLInputElement;
          if (input.value) {
            const code = countryCodeMapper.getCountryCode(input.value);
            setNotes();
            dispatch(
              addCountry({
                name: input.value,
                code,
                logs: travelDetails.sort(
                  (a, b) => new Date(a.st).getTime() - new Date(b.st).getTime()
                ),
              })
            );
            input.value = "";
            setTravelDates([]);
          }
        }}
      >
        ADD RECORD
      </button>
      <section className="travel-list-section" data-testid="travelListSection">
        {state && state?.countries?.length
          ? state.countries.map((item, index) => (
              <div
                key={index}
                className="travel-country-item"
                data-testid={`${item.name}-record`}
              >
                <img
                  alt={item.name}
                  src={countryCodeMapper.getCountryFlag(item.code)}
                />
                <button
                  aria-label="Remove"
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(removeCounrty(index));
                  }}
                >
                  X
                </button>
              </div>
            ))
          : "No Record"}
      </section>
    </div>
  );
};

export default RecordInputBoard;
