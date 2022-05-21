
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
      {user && notebookLocation &&
        <nav>
          <div className='nav-links' style={{ width: '70%' }}>
            <img style={{ width: '130px' }} className="animation" src={image}></img>
            {/* <NavLink to='/' exact={true} activeClassName='active'>
              splash
            </NavLink> */}
            <a className='' href="https://github.com/arn1215">Github</a>
            <a href="https://www.linkedin.com/in/ali-naqvi-251910226/">LinkedIn</a>
            <LogoutButton />
          </div>
        </nav>
      }
      {user && !notebookLocation &&
        <nav>
          <div className='nav-links'>
            <img style={{ width: '130px' }} className="animation" src={image}></img>
            <div className='links'>
              <NavLink to='/notebooks/' exact={true} activeClassName='active'>
                Home
              </NavLink>
              <a className='' href="https://github.com/arn1215">Github</a>
              <a href="https://www.linkedin.com/in/ali-naqvi-251910226/">LinkedIn</a>
              <LogoutButton />
            </div>
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
