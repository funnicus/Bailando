import React, { useState } from "react";
import { Link } from "react-router-dom";

import './loginForms.css';

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form className="LoginForms" onSubmit={handleSubmit}>
          <div className='input-field'>
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
            <button id='submit-button' type="submit">LOG IN</button>
            <p>Forgot <a href="www.wikipedia.fi">username</a> or <a href="www.wikipedia.fi">password?</a></p>
            <p>New here? <Link to="/signup">Sign up!</Link></p>
          </div>
    </form>
  );
}

export default Login;