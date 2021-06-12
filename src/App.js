import React, { useState, useEffect } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Map from "./Map"

export default function App() {
  const baseURL = "https://code-challenge-backend.herokuapp.com/locations"
  
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);
  const [locations, setLocations] = useState([]);
  const [URL,setURL] = useState(baseURL)

  // can add either /is or ?q=lon

  useEffect(() => {
    const loadLocations = async () => {     
      const response = await axios.get(URL);
      setLocations(response.data);
    };
    setIsLoading(true)
    loadLocations();
    setIsLoading(false)
    
  }, [URL]);

  useEffect(()=>{
    let matches = [];
    if (name.length > 0) {
      matches = locations.filter((location) => {
        const regex = new RegExp(`^${name}`, "gi");
        return location.name.match(regex);
      });
    }
    setSuggestions(matches);
  },[locations,name])

  const handleInputChange = (e) => {
    let text = e.target.value
    setURL(`${baseURL}?q=${text}`)
    setName(text);
  };

  const onNameSelected = (selectedName) => {
    setName(selectedName);
    setIsNameSelected(true);
    setSuggestions([]);
  };

  return (
    <div className="App">
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
      <Map/>
    </div>
  );
}
