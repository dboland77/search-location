import React, { useState, useEffect } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function App() {
  const baseURL = "https://code-challenge-backend.herokuapp.com/locations";
  const history = useHistory();

  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationid, setLocationid] = useState(0);
  const [URL, setURL] = useState(baseURL);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // load all locations
  useEffect(() => {
    const loadLocations = async () => {
      const response = await axios.get(URL);
      setLocations(response.data);
    };
    setIsLoading(true);
    loadLocations();
    setIsLoading(false);
  }, [URL]);

  //Filter locations and set URL to load
  useEffect(() => {
    let matches = [];
    if (name.length > 0) {
      matches = locations.filter((location) => {
        const regex = new RegExp(`^${name}`, "gi");
        return location.name.match(regex);
      });
    }
    setSuggestions(matches);
  }, [locations, name]);

  // Set the location to load and send the axios request
  useEffect(() => {
    if (locationid !== 0) {
      const loadLocation = async () => {
        const response = await axios.get(`${baseURL}/${locationid}`);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
      };
      setIsLoading(true);
      loadLocation();
      setIsLoading(false);
    }
  }, [isNameSelected, locationid]);

  //Route to the map
  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      history.push("/map", { lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, history]);

  const handleInputChange = (e) => {
    let text = e.target.value;
    setURL(`${baseURL}?q=${text}`);
    setName(text);
  };

  const onNameSelected = (selectedName) => {
    setName(selectedName);
    const thisLocation = locations.filter((a) => a.name === selectedName);
    setLocationid(thisLocation[0].id);
    setIsNameSelected(true);
    setSuggestions([]);
  };

  return (
    <div className="Home">
      <Form.Group className="typeahead-form-group">
        <Form.Control
          type="text"
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
        />
        <div> {name}</div>
        <ListGroup className="typeahead-list-group">
          {!isNameSelected &&
            suggestions.length > 0 &&
            suggestions.map((result) => (
              <ListGroup.Item
                key={result.id}
                className="typeahead-list-group-item"
                onClick={() => onNameSelected(result.name)}
              >
                {result.name}
              </ListGroup.Item>
            ))}
          {!suggestions.length && isLoading && (
            <div className="typeahead-spinner-container">
              <Spinner animation="border" />
            </div>
          )}
        </ListGroup>
      </Form.Group>
    </div>
  );
}
