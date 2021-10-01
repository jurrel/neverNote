import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';
import NavBar from '../NavBar/NavBar';
import signUpPage1 from '../../assets/signUpPage1.jpg'
import Icon from '../../assets/Icon.png'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoEmail = 'demo@aa.io';
  const demoPassword = 'password';

  const demoUser = async(e) => {
    e.preventDefault();
    dispatch(login(demoEmail,demoPassword))
  }
  
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div>
        <img className="log-in-page-background" src={signUpPage1} alt=""/>
      </div>
      <div className="sign-up-page-form-position">
        <div className='sign-up-border'>
          <img className="icon-log-ing-page" src={Icon} alt=""/>
          <h1>Nevernote</h1>
          <h3>Never Forget</h3>
          <button className="demo-sign-in-button" onClick={demoUser} type='button'>Demo</button>
          <p className="or-line">____________or____________</p>
          <form onSubmit={onSignUp}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='email'
                placeholder='Email address'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              {/* <label>Repeat Password</label> */}
              <input
                type='password'
                name='repeat_password'
                placeholder='Repeat Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button  className="sign-up-button" type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
