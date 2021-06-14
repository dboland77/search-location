import Map from "./components/Map/Map";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={Map} />
        </Switch>
    </div>
  );
}
