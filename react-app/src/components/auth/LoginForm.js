import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import image from './image1.jpg'

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

  const onDemo = async (e) => {
    e.preventDefault();
    return await dispatch(login('marnie@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/notebooks/' />;
  }

  return (
    <div classname='login-page forms' >
      <form onSubmit={onLogin}>
        {/* <img src={image} alt="Girl in a jacket" width="500" height="600" /> */}
        <div>
          {errors.map((error, ind) => (
            <div key={ind}></div>
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
          <div className="button-container" style={{display: 'flex'}}>
            <button className='form-button demo' onClick={onDemo}>Demo</button>
            <button className='form-button' type='submit'>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
