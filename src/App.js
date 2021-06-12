import React, { useState, useEffect } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
      console.log(response.data)
    };
    setIsLoading(true)
    loadLocations();
    setIsLoading(false)
    
  }, [URL]);

  const handleInputChange = (e) => {
    let text = e.target.value
    setURL(()=> `${baseURL}?q=${text}`)
    console.log(URL)
    let matches = [];
    if (text.length > 0) {
     // console.log("hello",name,locations, text)
      matches = locations.filter((location) => {
        const regex = new RegExp(`^${text}`, "gi");
        return location.name.match(regex);
      });
    }
    //console.log('matches', matches)
    setName(text);
    setSuggestions(matches);
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
    </div>
  );
}
