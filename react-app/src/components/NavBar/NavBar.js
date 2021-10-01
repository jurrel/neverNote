import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import HomeNavbar from './HomeNavbar';
import NotebooksNavbar from './NotebooksNavbar';
import NotesNavbar from './NotesNavbar';
import PersonalLinks from './PersonalLinks';
import Icon from '../../assets/Icon.png'
import NewNotebookModal from '../NotebookCRUD/NewNotebookModal';
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
      <div className="nav-bar-horizontal">
        <nav>
          {/* <div>
            <NavLink to ='/' exact = {true}>
              <img className='icon-log-horizontal-nav' src={Icon} alt=""/>
            </NavLink>
          </div> */}
          <NavLink to ='/login' exact = {true}>
            Login
          </NavLink>
            <NavLink to ='/signUp' exact = {true}>
              Sign up for Free
            </NavLink>
            <button onClick={demoUser} type='button'>Demo</button>
        </nav>
      </div>:
      <div className="nav-bar-container">
        <h1 className="nav-bar-user-email">{user?.users?.email}</h1>
        <nav>
              <NewNotebookModal/>
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
