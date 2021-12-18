import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import {Provider} from "react-redux"
import {store} from "./redux/storeRedux"
import {persistor} from "./redux/storeRedux"
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);
