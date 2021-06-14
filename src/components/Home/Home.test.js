import Home from "./Home";
import {render, screen} from '@testing-library/react';

describe ("Home Component", () => {

  test('shows a h1 tag with the word "Locations"', () => {
    render(<Home/>);
    const check = screen.getByText(/locations/gi);
    expect(check).toBeInTheDocument();
  })

   test('shows a search box with placeholder "Please start typing a location"', () => {
     render(<Home/>);
     const check = screen.getByPlaceholderText(/Please start/i);
     expect(check).toBeInTheDocument();
   })
})