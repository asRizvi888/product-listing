import Login from "@/pages/Login";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
}

export default App;
