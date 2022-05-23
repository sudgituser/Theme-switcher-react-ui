import "./styles.css";
import React, { useState } from "react";
import authReducer from "./redux/reducer/loginreducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Onboard from "./onboard/Onboard";

export default function App() {
  const store = createStore(authReducer);

  return (
    <div className="App">
      <Provider store={store}>
        <Onboard />
      </Provider>
    </div>
  );
}
