import ReactDOM from "react-dom";
import "./main.css";
import App from "./App.jsx";
import React from "react";
import { Provider } from "react-redux";
<<<<<<< HEAD
import store from "./Store.jsx";
=======
import { connect } from "react-redux";
import store from "./store.jsx";
>>>>>>> 4d2a8f7a1a782a2f26643ba5ef2964953641a1fd

import reloadMagic from "./reload-magic-client.js"; // automatic reload
reloadMagic(); // automatic reload

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
