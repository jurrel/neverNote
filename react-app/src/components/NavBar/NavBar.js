import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import HomeNavbar from './HomeNavbar';
import NotebooksNavbar from './NotebooksNavbar';
import NotesNavbar from './NotesNavbar';
import PersonalLinks from './PersonalLinks';
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
        <h1 className="nav-bar-user-email">{user?.users?.email}</h1>
        <nav>
              <HomeNavbar/>
              <NotebooksNavbar/>
              <NotesNavbar/>
              <div>
                <PersonalLinks/>
              </div>
              <div>
                <LogoutButton />
              </div>
        </nav>
      </div>
      }
    </>
  );
}

export default NavBar;
