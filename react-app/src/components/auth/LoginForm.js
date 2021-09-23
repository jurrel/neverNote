import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import signUpPage from '../../assets/signUpPage.jpg'
import signUpPage1 from '../../assets/1.jpg'
import signUpPage2 from '../../assets/2.jpg'
import signUpPage3 from '../../assets/3.jpg'

import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div>
        {/* <img className="landing-img" src={signUpPage} alt=""/> */}
        <img className="log-in-page-background" src={signUpPage1} alt=""/>
        {/* <img className="landing-img" src={signUpPage2} alt=""/> */}
        {/* <img className="landing-img" src={signUpPage3} alt=""/> */}

      </div>
      <div className="log-in-page-form-position">
        <form onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
