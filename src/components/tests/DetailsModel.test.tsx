import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DetailsModel from "../DetailsModal";

jest.mock("../../consts", () => ({
  countryCodeMapper: {
    getCountryName: () => "Japan",
    getCountryFlag: jest.fn(),
  },
}));
let closeModalSpy = jest.fn();

const mockProps = {
  countryCode: "ja",
  onModalClose: closeModalSpy,
};

describe("DetailsModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  it("should render", () => {
    const { queryByText } = render(<DetailsModel {...mockProps} />);

    expect(queryByText("DETAILS")).toBeTruthy();
    expect(queryByText("Travel Notes")).toBeTruthy();
  });

  it("should trigger close modal funciton when click on close modal button", () => {
    const { container } = render(<DetailsModel {...mockProps} />);
    const xBtn = container.querySelector(".card-header button.close-modal");
    const closeBtn = container.querySelector(".card-footer button.close-modal");

    if (xBtn) {
      fireEvent.click(xBtn);
      expect(closeModalSpy).toHaveBeenCalledTimes(1);
    }

    if (closeBtn) {
      fireEvent.click(closeBtn);
      expect(closeModalSpy).toHaveBeenCalledTimes(2);
    }
  });
});
