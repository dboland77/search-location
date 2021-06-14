import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Need to ensure we place the test app inside the router too ...
const app = (
  <Router>
    <App />
  </Router>
);
describe("App Component", () => {
  test("renders", () => {
    render(app);
  });
});
