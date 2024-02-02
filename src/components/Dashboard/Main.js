import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Middle from "./Middle";
import NavBar from "./NavBar";

function Main() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    function darkModeForSmallerDiv(domObject) {
      domObject.forEach((div) => {
        if (isDarkMode === false) {
          div.style.backgroundColor = "#E3E6E6";
          div.style.color = "#222";
        } else {
          div.style.backgroundColor = "#424242";
          div.style.color = "#ddd";
        }
      });
    }

    const weatherPropsColumn = document.querySelectorAll(
      ".weather_props_column"
    );
    const citiesDiv = document.querySelectorAll(".cities_div");
    const weatherUpdateDiv = document.querySelectorAll(".weather_update_div");

    darkModeForSmallerDiv(weatherPropsColumn);
    darkModeForSmallerDiv(citiesDiv);
    darkModeForSmallerDiv(weatherUpdateDiv);
  }, [isDarkMode]);
  return (
    <Box>
      <NavBar />

      <Middle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Middle>
    </Box>
  );
}

export default Main;
