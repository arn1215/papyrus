import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import CreateNoteForm from './components/CreateNoteForm/CreateNoteForm';
import DashBoard from './components/Dashboard/Dashboard';
import NotebookBar from './components/NotebookBar/NotebookBar';

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
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <SplashPage />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <div className='notebook-notes-container'>
            <NotebookBar  />
            <DashBoard />
          </div>
        </ProtectedRoute>
        <Route path='/notebooks/:notebook_id(\d{0,4})' exact={true}>
          <div className='notebook-notes-container'>
            <NotebookBar  />
            <DashBoard />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
