import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import router from "./Route/routes";
// import Middle from "./components/Dashboard/Middle";

function App() {

  return (
    <ChakraProvider>
      <RouterProvider
        router={router}
        
      ></RouterProvider>
    </ChakraProvider>
  );
}

export default App;
