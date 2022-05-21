import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import {image1} from './image1.jpg'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, password, repeatPassword));
    if (data) {
      setErrors(data)

    }

  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
    if (errors) {
      setErrors([])
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    if (errors) {
      setErrors([])
    }
  };

  const updatePassword = (e) => {
    setPassword(e.target.value)
    if (errors) {
      setErrors([])
    }
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
    if (errors) {
      setErrors([])
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}

        ></input>
      </div>
      <button className='form-button' type='submit'>Sign Up</button>
      <Link style={{display: 'block'}}  to='/login' type='submit'>Log In</Link>
    </form>
  );
};

export default SignUpForm;
