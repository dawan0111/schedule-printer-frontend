import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';
import { UIContextProvider } from './contexts/UIContext';
import ReactGA from 'react-ga';

ReactGA.initialize('G-EH6FY8SHN5', { debug: true });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UIContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

