import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import DashBoard from './components/Dashboard/Dashboard';
import NotebookBar from './components/NotebookBar/NotebookBar';
import RichText from './components/RichText';
import Nav2 from './components/nav2';
import Draw from './components/Draw';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();



  useEffect(() => {
    (async () => {
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
        <Route path='/login' exact={true}>
          <Nav2 />
          <div className='form-container'>
            <div className='something'>
              <LoginForm />
              <Link to="/sign-up" className="signup" style={{ display: 'block', marginTop: '80px' }}><p>Or Sign Up</p></Link>
            </div>
          </div>
        </Route>
        <Route path='/sign-up' exact={true}>
          <Nav2 />
          <div className='form-container'>
            <div className='something'>
              <SignUpForm />
            </div>
          </div>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <NavBar />
          <SplashPage />
        </Route>
        <ProtectedRoute path='/notebooks/:notebook_id(\d{0,4})' exact={true}>
          <div className='main'>
            <NavBar />
            <div className='notebook-notes-container'>
              <NotebookBar />
              <DashBoard />
            </div>
          </div>
        </ProtectedRoute>
        <ProtectedRoute path='/notes/:id(\d{0,4})' exact={true}>
          <div className='main'>
            <NavBar />
            <RichText />
          </div>
        </ProtectedRoute>
        <Route >
          <p>404 not found</p>
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
