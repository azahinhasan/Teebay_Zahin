import "./App.css";
import RoutesHandler from "./pages/routes";
import { SnackbarProvider } from "./context/snack-bar.context";

function App() {
  return (
    <div id="root">
      <SnackbarProvider>
        <RoutesHandler />
      </SnackbarProvider>
    </div>
  );
}

export default App;
