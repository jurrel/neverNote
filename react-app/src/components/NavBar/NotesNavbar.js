
import { NavLink } from 'react-router-dom';
function NotesNavbar() {

    return(
        <>
          <NavLink to="/notes">
            <h1 className='nav-notes-text nav-bar-component'><i className="fa fa-file-text"></i> Notes</h1>  
          </NavLink>
        </>
    )
}

export default NotesNavbar;
