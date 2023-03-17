import React, { useState } from "react";
import {Form, Button, ListGroup, Dropdown, DropdownButton, Card } from 'react-bootstrap';

/* this component will render a search bar that will let
a user search for sports. */

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  /* We will need to grab the ACTUAL sports from our database.
  (via... a hook?) But for now, here's an array: */
  const sports = [
    "soccer",
    "basketball",
    "baseball",
    "football",
    "hockey",
    "street hockey",
    "field hockey",
  ];
  let results = [];

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  if (query.length > 0) {
    results = sports.filter((sport) => sport.includes(query.toLowerCase()));
    console.log("On line 20, query =====", query);
    console.log("sports ====", results);
  }

  return (
    <Card>
      <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Enter a sport"
        onChange={handleChange}
        value={query}
      />
      {results.length > 0 && (
      <Dropdown.Menu show>
          {results.map((sport, index) => {
            return <Dropdown.Item key={index}>{sport}</Dropdown.Item>
          })}
        </Dropdown.Menu>
        )}
      </Form>
    </Card>
  );
};

export default SearchBar;
