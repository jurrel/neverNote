import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import signUpPage1 from '../../assets/signUpPage1.jpg'
import Icon from '../../assets/Icon.png'
import { useHistory } from 'react-router-dom';



import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const demoEmail = 'demo@aa.io';
  const demoPassword = 'password';

  const demoUser = async(e) => {
    e.preventDefault();
    await dispatch(login(demoEmail,demoPassword))
    history.push('/home')
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push('/home')
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <NavLink to='/home' />;
  }

  return (
    <>
      <div>
        <img className="log-in-page-background" src={signUpPage1} alt=""/>
      </div>
      <div className="log-in-page-form-position">
        <div className="sign-up-border">
          <img className="icon-log-ing-page" src={Icon} alt=""/>
          <h1>Nevernote</h1>
          <h3>Never Forget</h3>
          <button className="demo-sign-in-button" onClick={demoUser} type='button'>Demo</button>
          <p className="or-line">____________or____________</p>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              {/* <label htmlFor='email'>Email</label> */}
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              {/* <label htmlFor='password'>Password</label> */}
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <button className="sign-in-button" type='submit'>Sign In</button>
          </form>
          <p>Don't have an account?</p>
          <NavLink to ='/signUp' exact = {true}>
            Create an acocunt
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
