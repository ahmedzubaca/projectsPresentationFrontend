import React from 'react';
import Nav from '../nav/Nav';
import Homepage from '../homepage/Homepage';
import About from "../About/About";
import Contact from '../Contact/Contact';
import AllProjects from "../Projects/Projects";
import ProjectContent from '../Projects/ProjectContent';
import SinglePhoto from '../Projects/SinglePhoto';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";



function App() {
  return ( 
      <Router>
          <div>
            <Nav/> 
            <Switch>                            
              <Route exact path = "/"><Homepage/></Route>
              <Route exact path = "/projects/:category"><AllProjects/> </Route>
              <Route exact path = "/projects/:category/:content"><ProjectContent/></Route> 
              <Route path = "/projects/:category/:content/:imgTitle"><SinglePhoto/></Route>                                 
              <Route exact path = "/about"><About/></Route>
              <Route exact path = "/contact"><Contact/></Route>
            </Switch>             
          </div>
      </Router>            
  );  
}
export default App;
