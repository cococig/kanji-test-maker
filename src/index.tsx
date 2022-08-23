import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import theme from "./theme";
import App from "./App";
//import Fonts from './Fonts';

const container = document.getElementById("root");
const root = createRoot(container!);
// React.StrictModeを適用するとモーダルが動かなかった。
root.render(
  <>
    <ChakraProvider theme={theme}>
      {/*<Fonts />*/}
      <App />
    </ChakraProvider>
  </>,
);
