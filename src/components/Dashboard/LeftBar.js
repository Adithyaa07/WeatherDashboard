import React from "react";
import Top5CitiesWeather from "./Top5CitiesWeather";
import Button, { WeatherDataLabel } from "../Reusables/Button";
import { convertTemperature } from "../Reusables/Weather";
import { Link } from "react-router-dom";

const LeftBar = (props) => {
  const {
    isDarkMode,
    setIsDarkMode,
    units,
    handleUnitChange,
    isMetricActive,
    cityInputTerm,
    setCityInputTerm,
    randomCity,
    top5CitiesWeather,
    currentTime,
    getWeatherData,
  } = props;

  return (
    <div
      className={`weather_container_left_panel ${
        isDarkMode ? "dark_mode" : "light_mode"
      }`}
    >
      <div className="weather_container_top_section d-block">
        <div className="weather_title_div">
          {/* <h1 style={{ fontWeight: 900, color: isDarkMode ? "#ddd" : "#222" }}>Weather Dashboard</h1> */}

          <Link to="/main/memories">
            <Button
              classNames={`dark_mode_button ${
                isDarkMode ? "light_mode_button" : "dark_mode_button"
              }`}
              onClick={() => setIsDarkMode(!isDarkMode)}
              buttonInnerText="Memories"
              style={{ marginRight: "10px", radius: "20px" }}
            />
          </Link>
          <Button
            classNames={`dark_mode_button ${
              isDarkMode ? "light_mode_button" : "dark_mode_button"
            }`}
            onClick={() => setIsDarkMode(!isDarkMode)}
            buttonInnerText={isDarkMode ? "Light Mode" : "Dark Mode"}
          />
        </div>
        <div className="weather_props_units_button_div">
          <Button
            classNames={`metrics_unit_button ${
              isMetricActive ? "inactive_button" : ""
            }`}
            onClick={() => handleUnitChange("C")}
            buttonInnerText="Metric"
            style={{ marginRight: "10px", radius: "20px" }}
          />
          <Button
            classNames={`imperial_unit_button ${
              isMetricActive ? "" : "inactive_button"
            }`}
            onClick={() => handleUnitChange("F")}
            buttonInnerText="Imperial"
          />
        </div>
      </div>
      <div className="weather_container_time_and_input_div my-2">
        <WeatherDataLabel
          dataTitle="data-time-stamp"
          style={{
            fontWeight: 900,
            display: "block",
            color: isDarkMode ? "#ddd" : "#222",
            fontSize: "2rem",
            fontStyle: "italic",
          }}
          buttonInnerText={currentTime}
        />
        <input
          type="text"
          placeholder="Search for city"
          value={cityInputTerm}
          onChange={(e) => setCityInputTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              getWeatherData(cityInputTerm);
            }
          }}
          style={{
            maxWidth: "100%",
            border: `2px solid ${isDarkMode ? "#84abc1" : "#ccc"}`,
            backgroundColor: isDarkMode ? "#3c3b3f" : "#fff",
            color: isDarkMode ? "#ddd" : "#222",
          }}
        />
      </div>
      <div className="weather_city_and_country_div d-block">
        {randomCity &&
          randomCity.city &&
          randomCity.list &&
          randomCity.list[0] && (
            <>
              <p
                style={{ fontWeight: "bold", fontSize: "2rem", color: "black" }}
              >
                Here is your weather data
              </p>
              <WeatherDataLabel
                dataTitle="data-city"
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 900,
                  color: isDarkMode ? "#ddd" : "#222",
                }}
                buttonInnerText={randomCity.city.name}
              />
              <WeatherDataLabel
                dataTitle="data-country"
                classNames="label"
                style={{ color: isDarkMode ? "#ddd" : "#222" }}
                buttonInnerText={`Country: ${randomCity.city.country}`}
              />
            </>
          )}
      </div>
      <div className="weather_temperature_data_div">
        {randomCity && randomCity.list && randomCity.list[0] && (
          <>
            <WeatherDataLabel
              dataTitle="data-current-temperature"
              classNames="label"
              style={{
                fontSize: "3rem",
                fontWeight: 900,
                color: isDarkMode ? "#ddd" : "#222",
              }}
              buttonInnerText={
                units === "C"
                  ? `${randomCity.list[0].main.temp} °C`
                  : `${
                      convertTemperature(randomCity.list[0].main.temp)
                        .tempInFahrenheit
                    } °F`
              }
            />
            <img
              src={`https://openweathermap.org/img/wn/${randomCity.list[0].weather[0].icon}@2x.png`}
              alt="Weather"
              width="100px"
              height="100px"
              data-image-url
            />
            <WeatherDataLabel
              dataTitle="data-weather-type"
              classNames="label mb-1"
              style={{ fontWeight: 700, color: isDarkMode ? "#ddd" : "#222" }}
              buttonInnerText={`${randomCity.list[0].weather[0].main} - ${randomCity.list[0].weather[0].description}`}
            />
            {/* Rest of the labels with styling */}
          </>
        )}
      </div>

      {/* Top 5 near by cities component */}
      <Top5CitiesWeather top5CitiesWeather={top5CitiesWeather} units={units} />
      {/* END of Top 5 near by cities component */}
    </div>
  );
};

export default LeftBar;
