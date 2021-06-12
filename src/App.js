
import Map from "./Map";
import Home from "./Home"
import { Route } from "react-router-dom";

export default function App() {
  

  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/map" component={Map}/>
    </div>
  );
}
