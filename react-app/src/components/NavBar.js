
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import image from '../components/Papyrus-logos_transparent.png'
import { useSelector } from 'react-redux';
const NavBar = () => {

  const user = useSelector(state => state.session.user)
  const notebookLocation = window.location.href.includes('notebooks')
  const noteLocation = window.location.href.includes('notes')
  const slashLocation = window.location.href.includes('')
  const loginLocation = window.location.href.includes('login')
  const location = notebookLocation || noteLocation || slashLocation
  return (

    <>
      {user && notebookLocation && loginLocation &&
        <nav>
          <div className='nav-links'>
            <img style={{ width: '130px' }} className="animation" src={image}></img>
            <NavLink to='/' exact={true} activeClassName='active'>
              splash
            </NavLink>
            <LogoutButton />
          </div>
        </nav>
      }
      {user && !notebookLocation &&
        <nav>
          <div className='nav-links'>
            <img style={{ width: '130px' }} className="animation" src={image}></img>
            <NavLink to='/' exact={true} activeClassName='active'>
              splash
            </NavLink>
            <NavLink to='/notebooks/' exact={true} activeClassName='active'>
              Home
            </NavLink>
            <LogoutButton />
          </div>
        </nav>
      }
      {
        !location &&
        <nav>
          <div className='nav-links'>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users {location}
            </NavLink>
            <LogoutButton />
          </div>
        </nav>
      }
    </>
  );
}

export default NavBar;
