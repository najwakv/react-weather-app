import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, gioApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`,
      gioApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
