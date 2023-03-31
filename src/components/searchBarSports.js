import React, { useEffect, useState } from "react";
import { Form, Dropdown, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllSportsAsync, selectSports } from "../reducers/sportsSlice";

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

  const handleNavigate = async (e, sport) => {
    if (e === "Enter") {
      e.preventDefault();
      navigate(`/search/${sport}`);
    }
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
                    setQuery("");
                    navigate(`/search/${sport}`);
                  }}
                  onKeyDown={(e) => handleNavigate(e, { sport })}>
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
