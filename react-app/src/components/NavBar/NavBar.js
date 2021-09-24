import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const email = 'demo@aa.io';
  const password = 'password';

  const demoUser = async(e) => {
    e.preventDefault();
    dispatch(login(email,password))
  }

  return (
    <>
    { !user ?
      <nav>
          <button onClick={demoUser} type='button'>Demo</button>
          <NavLink to ='/login' exact = {true}>
            Login
          </NavLink>
          <NavLink to ='/signUp' exact = {true}>
            Sign up for Free
          </NavLink>
      </nav>:
      <nav>
          <LogoutButton />
      </nav>
    }
    </>
  );
}

export default NavBar;
