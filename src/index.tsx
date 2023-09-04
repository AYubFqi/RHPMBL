import React  from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./css/index.scss";
import { BrowserRouter } from "react-router-dom";
import { defineCustomElements } from '@ionic/pwa-elements/loader';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
defineCustomElements(window);
