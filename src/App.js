import "./index.css";
import { Authenticate } from "./components/auth";
import { Signup } from "./components/signup";
import "bootstrap/dist/css/bootstrap.min.css";
import { HomePage } from "./components/homepage/homepage";
import { SearchBar } from "./components/searchBarSports";

function App() {
  return (
    <div className="App">
      Pacman Power!
      <Authenticate />
      <Signup />
      <HomePage />
      <SearchBar />
    </div>
  );
}

export default App;
