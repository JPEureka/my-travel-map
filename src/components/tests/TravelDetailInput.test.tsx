import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TravelDetailInput from "../TravelDetailInput";

const onChangeMock = jest.fn();
const onDeleteMock = jest.fn();
const mockProps = {
  index: 0,
  onChange: onChangeMock,
  onDelete: onDeleteMock,
};

describe("TravelDetailInput", () => {
  it("should render", () => {
    const { queryByText } = render(<TravelDetailInput {...mockProps} />);

    expect(queryByText("Start Date:")).toBeTruthy();
    expect(queryByText("End Date:")).toBeTruthy();
    expect(queryByText("Trip Note")).toBeTruthy();
  });

  it("should trigger onChange when data is updated", () => {
    const { queryByTestId } = render(<TravelDetailInput {...mockProps} />);

    const stInput = queryByTestId("st-input-0");
    const etInput = queryByTestId("et-input-0");

    if (stInput) {
      fireEvent.change(stInput, { target: { value: "2020-05-12" } });
    }
    expect(onChangeMock).toHaveBeenCalledWith({
      key: 0,
      val: "2020-05-12",
      dateType: "st",
    });

    if (etInput) {
      fireEvent.change(etInput, { target: { value: "2020-03-12" } });
    }
    expect(onChangeMock).toHaveBeenCalledWith({
      key: 0,
      val: "2020-03-12",
      dateType: "et",
    });
  });

  it("should trigger onDelete when click on delete button", () => {
    const { queryByTestId } = render(<TravelDetailInput {...mockProps} />);

    const removeBtn = queryByTestId("removeLogBtn");

    if (removeBtn) {
      fireEvent.click(removeBtn);
    }
    expect(onDeleteMock).toHaveBeenCalledWith(0);
  });
});
