import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {BrowserRouter, Router} from 'react-router-dom';
import 'antd/dist/antd.css';

import { store } from "./redux/configStore";
import { history } from "./util/library/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router history = {history}>
  {/* <BrowserRouter > */}
    <Provider store={store}>
      <App />
    </Provider>
  {/* </BrowserRouter> */}
   </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
