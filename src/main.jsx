import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Authcontextsprovider from "./context/Authcontexts.jsx";
import FetchNFTsProvider from "./context/FetchNFTs.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authcontextsprovider>
        <FetchNFTsProvider>
          <App />
        </FetchNFTsProvider>
      </Authcontextsprovider>
    </BrowserRouter>
  </React.StrictMode>
);
