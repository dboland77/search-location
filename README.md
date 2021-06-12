This is a frontend only app  and is written with:
1. axios for data fetching
1. React functional with Hooks
1. react-bootstrap

# Description
The user can type into the search box and as they type in a location they want to look up. As the user types the application will display a dropdown with options matching the sequence of letters typed so far. 

For example A will show all locations beginning with "A" and "Fr" all those beginning with "fr" and the search is also case insensitive. 

Five results at a time are displayed in the dropdown and when a result is selected and clicked the app routes to /map and a new component is shown with the selected location on a Google map. 

# Deployment
The app is available to view and use here:

https://react-location-search.herokuapp.com

# Installing.

1. clone the repo
1. cd to the repo folder
1. npm install
1. touch .env.local
1. echo "REACT_APP_GOOGLE_MAPS_API_KEY=YOUR API KEY HERE" replacing YOUR_API_KEY_HERE with your google maps API key
1. npm start
