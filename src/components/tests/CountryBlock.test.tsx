import React from "react";
import CountryBlock from "../CountryBlock";
import { render, fireEvent } from "@testing-library/react";

jest.mock("../../consts", () => ({
  countryCodeMapper: {
    getCountryName: () => "Japan",
    getCountryFlag: jest.fn(),
  },
}));
let showDetailSpy = jest.fn();

const mockProps = {
  countryCode: "ja",
  onShowDetail: showDetailSpy,
};

describe("CountryBlock", () => {
  it("should render", () => {
    const { queryByLabelText } = render(<CountryBlock {...mockProps} />);

    expect(queryByLabelText("Japan")).toBeTruthy();
  });

  it("should call onShowDetail function when click", () => {
    const { queryByLabelText } = render(<CountryBlock {...mockProps} />);

    const countryBlock = queryByLabelText("Japan");
    if (countryBlock) {
      fireEvent.click(countryBlock);
    }
    expect(showDetailSpy).toHaveBeenCalledWith("ja");
  });
});
