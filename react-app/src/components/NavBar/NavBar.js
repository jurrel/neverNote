import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import NotebooksSidebar from '../HomePage/Sidebar/NotebooksSidebar/NotebooksSidebar'
import NoteSidebar from '../HomePage/Sidebar/NoteSidebar/NoteSidebar'
// import CreateNewNote from '../../NoteCRUD/CreateNewNote'
// import NewNoteButton from './NewNoteButton/NewNoteButton';
// import HomeSidebar from './HomeSidebar/HomeSidebar';
// import LogoutButton from '../../auth/LogoutButton'; /*Remove later, just here for convienence*/
// import NewNotebook from '../../NotebookCRUD/NewNotebook'

const NavBar = ({auth, user}) => {
  const dispatch = useDispatch();

  const email = 'demo@aa.io';
  const password = 'password';

  const demoUser = async(e) => {
    e.preventDefault();
    dispatch(login(email,password))
  }

  return (
    <>
      {!auth ?
      <nav>
          <button onClick={demoUser} type='button'>Demo</button>
          <NavLink to ='/login' exact = {true}>
            Login
          </NavLink>
          <NavLink to ='/signUp' exact = {true}>
            Sign up for Free
          </NavLink>
      </nav>:
      <div className="nav-bar-container">
        <nav>
            {/* <NotebooksSidebar /> */}
            {/* <NoteSidebar/> */}
            <LogoutButton />
        </nav>
      </div>
      }
    </>
  );
}

export default NavBar;
