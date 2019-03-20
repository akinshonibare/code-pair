import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from "./App";

const routes = (
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>
);

export default routes;
