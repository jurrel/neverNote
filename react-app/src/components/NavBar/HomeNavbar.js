import { NavLink } from 'react-router-dom';
import './NavBar.css'

function HomeNavbar() {

    return(
        <>
          <NavLink to="/home">
            <h1 className="nav-bar-component"> 
              <i className="fa fa-home"/> Home
            </h1>
          </NavLink>
        </>
    )
}

export default HomeNavbar;
