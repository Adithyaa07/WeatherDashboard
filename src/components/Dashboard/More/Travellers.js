import React from "react";
import { useState, useEffect } from "react";
import { WeatherDataLabel } from "../../Reusables/Button";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
const Travellers = () => {
  const [randomCity, setRandomCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [top5CitiesWeather, setTop5CitiesWeather] = useState(null);
  const [cityInputTerm, setCityInputTerm] = useState("");

  let apiUrl = "";

  async function getWeatherData() {
    // Getting initial random city
    const randomCitiesListResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/find?lat=32.7&lon=-96.8&cnt=10&appid=238a95bf4e0b770d9c0efcbc26a7c178`
    );
    const randomCities = await randomCitiesListResponse.json();
    const randomCity =
      randomCities.list[Math.floor(Math.random() * randomCities.list.length)];
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${randomCity.id}&appid=238a95bf4e0b770d9c0efcbc26a7c178&units=metric`;

    try {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();
      if (data.cod === "404") {
        alert("Sorry, the city you entered could not be found :(");
        return;
      }
      setIsLoading(false);
      setRandomCity(data);

      // Fetching 5 nearby cities around the city searched by the user
      async function getNearByCities() {
        const lat = data.city.coord.lat;
        const lon = data.city.coord.lon;
        try {
          const nearbyCitiesApiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&appid=238a95bf4e0b770d9c0efcbc26a7c178&units=metric`;
          const response = await fetch(nearbyCitiesApiUrl);
          const dataToGetCities = await response.json();
          const nearbyCities = dataToGetCities.list;
          setTop5CitiesWeather(nearbyCities);
        } catch (error) {
          console.log("Error", error);
        }
      }

      getNearByCities();
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getWeatherData(cityInputTerm);

    /* eslint-disable */
  }, []);
  return (
    <Box>
      <Box className="weather_city_and_country_div d-block">
        {randomCity &&
          randomCity.city &&
          randomCity.list &&
          randomCity.list[0] && (
            <>
              <Text
                style={{ fontWeight: "bold", fontSize: "2rem", color: "black" }}
              >
                Here is your weather data
              </Text>
              <WeatherDataLabel
                dataTitle="data-city"
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  // color: isDarkMode ? "#ddd" : "#222",
                }}
                buttonInnerText={randomCity.city.name}
              />
              <WeatherDataLabel
                dataTitle="data-country"
                classNames="label"
                // style={{ color: isDarkMode ? "#ddd" : "#222" }}
                buttonInnerText={`Country: ${randomCity.city.country}`}
              />
            </>
          )}
      </Box>
      <Box>
        {top5CitiesWeather &&
          top5CitiesWeather.map((city, i) => {
            return (
              <Box className="cities_div dark_mode_smaller_div" key={i}>
                <WeatherDataLabel
                  dataTitle="data-nearest-city"
                  classNames="label mb-0"
                  buttonInnerText={city.name}
                />
                <WeatherDataLabel
                  buttonInnerText={`Country: ${city.sys.country}`}
                />
                <WeatherDataLabel
                  dataTitle="data-nearest-city-current-temperature"
                  classNames="label mb-0"
                  style={{ fontSize: "12px" }}
                />
                <Image
                  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                  alt="Nearest City"
                  width="40px"
                  height="40px"
                  data-nearest-city-image-url
                />
                <WeatherDataLabel
                  dataTitle="data-nearest-city-weather-type"
                  classNames="label mb-0"
                  style={{ fontSize: "12px" }}
                  buttonInnerText={`${city.weather[0].main} - ${city.weather[0].description}`}
                />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default Travellers;
