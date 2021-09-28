import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import NotebookPage from './components/NotebookPage/NotebookPage';
import { LandingPage } from './components/LandingPage/LandingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* <NavBar/> */}
        <ProtectedRoute exact path="/landing">
            <LandingPage />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage/>
        </ProtectedRoute>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signUp' exact={true}>
          <SignUpForm />
        </Route>
        <Route exact path="/notebooks">
            <NotebookPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
