import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./view/main"
import Toll from "./view/toll/toll"
import Popout from "./components/popout/popout"
import {BrowserRouter,HashRouter,Route,Switch,Redirect} from "react-router-dom"
const App:React.FC=()=>{
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/main" component={Main}></Route>
        <Route path="/toll" component={Toll}></Route>
        <Route path="/popout" component={Popout}></Route>
        <Redirect from="/" to="/main"></Redirect>
      </Switch>
    
    </BrowserRouter>


  );

}




export default App;
