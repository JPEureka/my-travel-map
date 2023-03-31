import React from "react";
import { render } from "@testing-library/react";
import Main from "../Main";

jest.mock("../../consts", () => ({
  availableCountry: ["ja"],
  countryCodeMapper: {
    getCountryName: () => "Japan",
    getCountryFlag: jest.fn(),
  },
}));

describe("Main page", () => {
  it("should render", () => {
    const { queryByText, queryByTestId } = render(<Main />);
    expect(queryByText("Karen's Travel Map")).toBeTruthy();
    expect(queryByTestId("recordInputBoard")).toBeTruthy();
    expect(queryByTestId("locationBoard")).toBeTruthy();
  });
});
