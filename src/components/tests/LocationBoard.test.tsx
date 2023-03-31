import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LocationBoard from "../LocationBoard";
import { availableCountry } from "../../consts";

describe("LocationBoard", () => {
  it("should render", () => {
    const { container } = render(<LocationBoard />);
    const availableCountryCount = availableCountry.length;
    expect(container.querySelectorAll(".country-block").length).toBe(
      availableCountryCount
    );
  });

  it("should show details modal ", async () => {
    const { container, queryByText } = render(<LocationBoard />);
    const countryBlock0 = container.querySelectorAll(".country-block")[0];
    expect(queryByText("DETAILS")).toBeFalsy();
    if (countryBlock0) {
      await fireEvent.click(countryBlock0);
    }

    expect(queryByText("DETAILS")).toBeTruthy();
  });
});
