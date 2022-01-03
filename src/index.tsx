import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
