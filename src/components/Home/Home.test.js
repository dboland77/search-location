import Home from "./Home";
import { render, screen } from "@testing-library/react";

describe("Home Component", () => {
  test('shows a h1 tag with the word "Locations"', () => {
    render(<Home />);
    const check = screen.getByText(/locations/gi);
    expect(check).toBeInTheDocument();
  });

});
