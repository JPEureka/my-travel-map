import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import RecordInputBoard from "../RecordInputBoard";
jest.unmock("react-redux");

jest.mock("../../consts", () => ({
  getCountryNameList: [
    "japan",
    "new zealand",
    "New Caledonia",
    "Papua New Guinea",
  ],
  countryCodeMapper: {
    getCountryName: () => "Japan",
    getCountryFlag: jest.fn(),
    getCountryCode: () => "ja",
  },
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("RecordInputBoard", () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should render", () => {
    const { queryByText, queryByTestId } = render(<RecordInputBoard />);
    expect(queryByText("Input Your Travel Record")).toBeTruthy();
    expect(queryByTestId("travelLogsSection")).toBeTruthy();
    expect(queryByTestId("countryInputSection")).toBeTruthy();
    expect(queryByTestId("travelListSection")).toBeTruthy();
  });

  it("should add record when click on add record button and has country input", () => {
    const { queryByTestId } = render(<RecordInputBoard />);
    const countryInput = queryByTestId("countryNameInput");
    const addRecordBtn = queryByTestId("addRecordBtn");
    if (addRecordBtn) {
      fireEvent.click(addRecordBtn);
    }
    expect(mockDispatch).not.toHaveBeenCalled();

    if (countryInput) {
      fireEvent.change(countryInput, { target: { value: "Japan" } });
    }
    if (addRecordBtn) {
      fireEvent.click(addRecordBtn);
    }
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {
        code: "ja",
        logs: [],
        name: "Japan",
      },
      type: "ADD_COUNTRY",
    });
  });

  it("should add travel detail input when click on add log + button", () => {
    const { container, queryByTestId } = render(<RecordInputBoard />);
    const addTravelLogBtn = queryByTestId("addTravelLogBtn");
    expect(container.querySelectorAll(".travel-detail-input").length).toBe(0);
    if (addTravelLogBtn) {
      fireEvent.click(addTravelLogBtn);
      expect(container.querySelectorAll(".travel-detail-input").length).toBe(1);

      fireEvent.click(addTravelLogBtn);
      expect(container.querySelectorAll(".travel-detail-input").length).toBe(2);
    }
  });

  it("should remove travel detail input when click on remove - button", () => {
    const { container, queryByTestId } = render(<RecordInputBoard />);
    const addTravelLogBtn = queryByTestId("addTravelLogBtn");
    expect(container.querySelectorAll(".travel-detail-input").length).toBe(0);
    if (addTravelLogBtn) {
      fireEvent.click(addTravelLogBtn);
      expect(container.querySelectorAll(".travel-detail-input").length).toBe(1);
    }

    const removeLog0Btn = container.querySelectorAll(".remove-log-btn")[0];
    if (removeLog0Btn) {
      fireEvent.click(removeLog0Btn);
      expect(container.querySelectorAll(".travel-detail-input").length).toBe(0);
    }
  });

  it("should show possiblie country name list when enter country name keyword", async () => {
    jest.useFakeTimers();
    const { container, queryByTestId } = render(<RecordInputBoard />);
    const countryInput = queryByTestId("countryNameInput");
    act(() => {
      if (countryInput) {
        fireEvent.click(countryInput);
      }
    });
    expect(container.querySelectorAll(".auto-complete-list span").length).toBe(
      4
    );

    act(() => {
      if (countryInput) {
        fireEvent.change(countryInput, { target: { value: "new" } });
      }
      jest.runAllTimers();
    });
    expect(container.querySelectorAll(".auto-complete-list span").length).toBe(
      3
    );
  });

  it("should show no record in travel record list when there's no travel record", () => {
    const { queryByText } = render(<RecordInputBoard />);
    expect(queryByText("No Record")).toBeTruthy();
  });

  it("should show possiblie country name list when enter country name keyword", async () => {
    jest.mock("react-redux", () => ({
      useSelector: () => ({
        countries: [
          {
            name: "Japan",
            code: "ja",
            logs: [
              { st: "04-06-2010", et: "08-08-2010", notes: "hello Japan" },
            ],
          },
        ],
      }),
      useDispatch: () => mockDispatch,
    }));
    act(() => {
      render(<RecordInputBoard />);
    });

    expect(screen.queryAllByAltText("Japan")).toBeTruthy();
  });

  it("should remove travel record when click remove record btn x in travel record list", async () => {
    jest.mock("react-redux", () => ({
      useSelector: () => ({
        countries: [
          {
            name: "Japan",
            code: "ja",
            logs: [
              { st: "04-06-2010", et: "08-08-2010", notes: "hello Japan" },
            ],
          },
        ],
      }),
      useDispatch: () => mockDispatch,
    }));
    act(() => {
      render(<RecordInputBoard />);
    });

    expect(screen.queryAllByAltText("Japan")).toBeTruthy();

    const removeBtn = screen.queryByLabelText("Remove");
    if (removeBtn) {
      fireEvent.click(removeBtn);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "REMOVE_COUNTRY",
        key: 0,
      });
    }
  });
});
