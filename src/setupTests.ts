// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useSelector: () => ({
    countries: [
      {
        name: "Japan",
        code: "ja",
        logs: [{ st: "04-06-2010", et: "08-08-2010", notes: "hello Japan" }],
      },
    ],
  }),
  useDispatch: jest.fn(),
}));
