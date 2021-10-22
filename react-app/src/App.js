import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import NotebookPage from './components/NotebookPage/NotebookPage';
import NotePage from './components/NotePage/NotePage';
import SplashPage from './components/SplashPage/SplashPage';
import EditNotesPage from './components/EditNotesPage/EditNotesPage';
import { useSelector } from 'react-redux';

import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session?.user)
  const auth = user !== null
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
        <NavBar auth={auth} user={user}/>
        <div>
          <Switch>
            <Route exact={true} path="/">
              <SplashPage/>
            </Route>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/signUp' exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path='/home' exact={true} >
              <HomePage/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/notebooks">
                <NotebookPage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/notes">
                <NotePage />
            </ProtectedRoute>
             <ProtectedRoute exact path="/notes/:id">
                <EditNotesPage />
            </ProtectedRoute>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
