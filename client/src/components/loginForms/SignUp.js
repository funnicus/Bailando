import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { CREATE_USER } from '../../queries'

import './loginForms.css';

const SignUp = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');

  return (
    <form className="LoginForms" onSubmit={handleSubmit}>
          <div className='input-field'>
            <input 
            type='text'
            id='email'
            value={email}
            name='Email'
            placeholder='EMAIL'
            onChange={({ target }) => setEmail(target.value)}
            />
            <input 
            type='text'
            id='username'
            value={username}
            name='Username'
            placeholder='USERNAME'
            onChange={({ target }) => setUsername(target.value)}
            />
            <input 
             type='password'
             id='password'
             value={password}
             name='Password'
             placeholder='PASSWORD'
             onChange={({ target }) => setPassword(target.value)}
            />
            <input 
             type='password2'
             id='password2'
             value={password2}
             name='Password2'
             placeholder='PASSWORD AGAIN'
             onChange={({ target }) => setPassword2(target.value)}
            />
            <button id='submit-button' type="submit">SIGN UP</button>
            <p>Already a user? <Link to="/login" >Log in!</Link></p>
          </div>
    </form>
  );
}

export default SignUp;