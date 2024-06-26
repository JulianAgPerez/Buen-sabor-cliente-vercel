import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/Store";
import "./styles/scrollbar.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { lightTheme } from "./components/Themes/LightTheme";

export const baseUrl = import.meta.env.VITE_API_URL;

export const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <SpeedInsights />
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
};
