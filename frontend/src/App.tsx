import { ThemeProvider } from "./context/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Product from "./pages/Product";
import { Toaster } from "./components/ui/toaster";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="product" element={<Product />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
