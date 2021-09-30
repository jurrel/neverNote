import { NavLink } from 'react-router-dom';
function HomeNavbar() {

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

export default HomeNavbar;
