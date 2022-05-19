import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clear_notes } from '../../store/note';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clear_notes())
    history.push('/login')
  };

  return <button className='logout' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
