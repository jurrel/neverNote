import { NavLink } from 'react-router-dom';
function NotebooksSidebar() {

    return(
        <>
          <NavLink to="/notebooks">
            <h1><i class="fa fa-book"></i> Notebooks</h1>  
          </NavLink>
        </>
    )
}

export default NotebooksSidebar;