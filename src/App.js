
import Map from "./components/Map/Map";
import Home from "./components/Home"
import { Route } from "react-router-dom";

export default function App() {
  

  return (
    <div className="App">
      <Route exact path="/" component={Home}/>
      <Route exact path="/map" component={Map}/>
    </div>
  );
}
