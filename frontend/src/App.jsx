import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { PapersProvider } from "./context/PapersContext";

function App() {
  return (
    <BrowserRouter>
      <PapersProvider>
        <AppRoutes />
      </PapersProvider>
    </BrowserRouter>
  );
}

export default App;
