import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { DataProvider } from "./GlobalState";

ReactDOM.render(
    <DataProvider>
      <Router>
          <App />
      </Router>
    </DataProvider>, 
  document.getElementById('root')
);
