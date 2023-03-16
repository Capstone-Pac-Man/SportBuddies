import React, { useState } from "react";

/* this component will render a search bar that will let
a user search for sports. */

export const SearchBar = () => {
  const [query, setQuery] = useState("");

  /* we will need to grab our ACTUAL SPORTS from our database.
  (via a hook?) But for now, here's an array: */
  const sports = ["Soccer", "Basketball", "Baseball", "Football"];

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  if (query.length > 0) {
    sports.filter((sport) => {
      return sport.name.match(query);
    });
  }

  return (
    <>
      <input
        type="search"
        placeholder="Find a sport here"
        onChange={handleChange}
        value={query}
      />
      <table>
        <tr>
          <th>SPORT</th>
        </tr>

        {sports.map((sport) => {
          return (
            <div>
              <tr>
                <td>{sport.name}</td>
              </tr>
            </div>
          );
        })}
      </table>
    </>
  );
};

export default SearchBar;
