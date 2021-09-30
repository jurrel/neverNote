import { NavLink,Link } from 'react-router-dom';
function NotebooksNavbar() {

    return(
        <>
          <NavLink to="/notebooks">
            <h1 className="nav-bar-component"><i className="fa fa-book"></i> Notebooks</h1>  
          </NavLink>
        </>
    )
}

export default NotebooksNavbar;
