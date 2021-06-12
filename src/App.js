import React, { useState } from "react";
import { Form, ListGroup, Spinner } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useFetch from './useFetch'

export function Component() {
  const url = `http://jsonplaceholder.typicode.com/posts`
  const { status, data, error } = useFetch(url)
  console.log({ status, data, error })

  // your component JSX
  return <div>{status}</div>
}

const data = [
  { id: 1, name: "devrecipes.net" },
  { id: 2, name: "devrecipes" },
  { id: 3, name: "devrecipe" },
  { id: 4, name: "dev recipes" },
  { id: 5, name: "development" }
];

const mockResults = (keyword) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const searchResults = data.filter((item) => item.name.includes(keyword));
      res(searchResults);
    }, 500);
  });
};


export default function App () {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);

  const handleInputChange = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    // even if we've selected already an item from the list, we should reset it since it's been changed
    setIsNameSelected(false);
    // clean previous results, as would be the case if we get the results from a server
    setResults([]);
    if (nameValue.length > 1) {
      setIsLoading(true);
      mockResults(nameValue)
        .then((res) => {
          setResults(res);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  const onNameSelected = (selectedName) => {
    setName(selectedName);
    setIsNameSelected(true);
    setResults([]);
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
        <ListGroup className="typeahead-list-group">
          {!isNameSelected &&
            results.length > 0 &&
            results.map((result) => (
              <ListGroup.Item
                key={result.id}
                className="typeahead-list-group-item"
                onClick={() => onNameSelected(result.name)}
              >
                {result.name}
              </ListGroup.Item>
            ))}
          {!results.length && isLoading && (
            <div className="typeahead-spinner-container">
              <Spinner animation="border" />
            </div>
          )}
        </ListGroup>
      </Form.Group>
      <Component/>
    </div>

  );
}

