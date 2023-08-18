import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import { CssBaseline } from '@mui/material';
import Routing from './routes/Routing';
import store from './app/store';
import AppThemeProvider from './themes/AppThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        <CssBaseline />
        <Routing />
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>,
);
