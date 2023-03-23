import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  ListGroup,
  Dropdown,
  DropdownButton,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllSportsAsync, selectSports } from "../reducers/sportsSlice";

/* this component will render a search bar that will let
a user search for sports. */

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const dbSports = useSelector(selectSports);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllSportsAsync());
  }, [dispatch]);
  let sports = [];
  let results = [];
  for (const element of dbSports) {
    sports.push(element.name.toLowerCase());
  }

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  if (query.length > 0) {
    results = sports.filter((sport) => sport.includes(query.toLowerCase()));
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
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    setQuery("")
                    navigate(`/search/${sport}`)}
                  }
                >
                  {sport}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        )}
      </Form>
    </Card>
  );
};

export default SearchBar;
