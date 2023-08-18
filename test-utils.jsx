import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import store from './src/app/store';
import AppThemeProvider from './src/themes/AppThemeProvider';
import { BrowserRouter } from "react-router-dom";

const customRender = (ui, options = {}) => ({
  store,
  ...render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <BrowserRouter>
          <AppThemeProvider>
            <CssBaseline />
            {children}
          </AppThemeProvider>
        </BrowserRouter>
      </Provider>
    ),
    ...options,
  }),
});

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

// override render export
export { customRender as render };
