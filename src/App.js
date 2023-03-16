import "./index.css";
import { Authenticate } from "./components/auth";
import { Signup } from "./components/signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./components/homepage/homepage";

function App() {
  return (
    <div className="App">
      Pacman Power!
      <Authenticate />
      <Signup />
      <HomePage />
    </div>
  );
}

export default App;
