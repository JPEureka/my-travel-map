import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.unmock("react-redux");

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("Karen's Travel Map");
  expect(linkElement).toBeInTheDocument();
});
