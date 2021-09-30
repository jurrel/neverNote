import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import HomeNavbar from './HomeNavbar';
// import NoteSidebar from '../HomePage/Sidebar/NoteSidebar/NoteSidebar';
import NotebooksNavbar from './NotebooksNavbar';
// import CreateNewNote from '../../NoteCRUD/CreateNewNote'
// import LogoutButton from '../../auth/LogoutButton'; /*Remove later, just here for convienence*/
// import NewNotebook from '../../NotebookCRUD/NewNotebook'
import NotesNavbar from './NotesNavbar'
import './NavBar.css'
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
            <HomeNavbar/>
            <NotebooksNavbar/>
            <NotesNavbar/>
            <LogoutButton />
        </nav>
      </div>
      }
    </>
  );
}

export default NavBar;
