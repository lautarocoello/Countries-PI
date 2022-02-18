import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import Home from './components/Home/Home'
import ActivityCreate from './components/ActivityCreate/ActivityCreate'
import CountrieDetail from './components/CountrieDetail/CountrieDetail'


function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={LandingPage}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/activities" component={ActivityCreate}/>
          <Route exact path='/home/:id' component={CountrieDetail}/>
        </div>
    </BrowserRouter>
  );
}

export default App;
