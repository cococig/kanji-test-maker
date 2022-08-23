import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#b9c9c9",
        color: "gray.800",
      },
      p: {
        fontSize: { base: "md", md: "lg" },
        lineHeight: "tall",
      },
      h1: {
        fontWeight: "bold",
      },
    },
  },
  colors: {
    sweetSepia: "#b9c9c9",
    shipBlue: "#1a274b",
    belgiumRoof: "#4b6251",
  },
});

export default theme;
