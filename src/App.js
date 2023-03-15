import "./index.css";
import { Authenticate } from "./components/auth";
import { Signup } from "./components/signup";
function App() {
  return (
    <div className="App">
      Hello
      <Authenticate />
      <Signup />
    </div>
  );
}

export default App;
