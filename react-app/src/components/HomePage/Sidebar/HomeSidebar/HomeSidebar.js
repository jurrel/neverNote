import { NavLink } from 'react-router-dom';
import './homesidebar.css'
function HomeSidebar() {

    return(
        <>
          <NavLink to="/">
            <h1> 
              <i className="fa fa-home"/> Home
            </h1>
          </NavLink>
        </>
    )
}

export default HomeSidebar;
