import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, gioApiOptions, WEATHER_API_URL, WEATHER_API_KEY } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

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
  
  const fetchWeatherData = (cityCoordinates) => {
    return fetch(
      `${WEATHER_API_URL}/weather?lat=${cityCoordinates.latitude}&lon=${cityCoordinates.longitude}&appid=${WEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Process weather data and return it
        return data;
      })
      .catch((err) => console.log(err));
  };
  
  const handleOnChange = async (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    
    // Fetch weather data for the selected city
    const weatherData = await fetchWeatherData(searchData);
    console.log(weatherData); // Display weather data in console or update state with weatherData
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
