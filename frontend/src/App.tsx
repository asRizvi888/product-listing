import Login from "@/pages/Login";
import { ThemeProvider } from "./components/ThemeProvider";
import Product from "./pages/Product";

function App() {
  return (
    <ThemeProvider>
      <Product />
    </ThemeProvider>
  );
}

export default App;
