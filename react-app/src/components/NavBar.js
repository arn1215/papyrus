
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {

  const location = window.location.href.includes('notebooks')
  return (

    <>
      {location &&
        <nav>
          <div className='nav-links'>
            <NavLink to='/' exact={true} activeClassName='active'>
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
