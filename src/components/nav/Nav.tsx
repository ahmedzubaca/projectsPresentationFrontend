import React, {useState} from "react";
import "./Nav.css";
import DrpdownMenue from "./DropdownMenue";
import { Link } from 'react-router-dom';

const Nav = () => {

  const [drop, setDrop] = useState(false);

  const droppingMenue = () => {
    setDrop(true)
  }

  const closingMenue = () => {
    setDrop(false)
  }    

  return(
    <>
      <div className= "nav-container">
        <div className="logo-container"> Logo </div>
        <div>
          <div className="media-icons-container">
            <img alt="fb" src="../icons/facebook.jpg" />
            <img alt="in" src="../icons/instagram.jpg" />
            <img alt="tw" src="../icons/twitter.jpg" />
          </div>          
          <ul className="nav-buttons-container">
            <li>
              <Link className="nav-buttons-label" to='/'>Home</Link>                                            
            </li>
            <li onMouseEnter ={droppingMenue}
                onMouseLeave={closingMenue}
            >
              <span className="nav-buttons-label">Projects</span>
              {drop && <DrpdownMenue/>}
            </li>            
            <li>
              <Link className="nav-buttons-label" to="/about">About</Link>
            </li>
            <li>
              <Link className="nav-buttons-label" to="/contact">Contact</Link>
            </li>
          </ul>          
        </div>        
      </div>      
    </>
  )
}
export default Nav;