import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Nav.css';

const Nav = () => {

  const [search, setSearch] = useState(''); 

  return (
    <nav className="Nav">
      <ul>
          <li><Link to="/">Bailando</Link></li>
          <li><div id='search-bar'><FontAwesomeIcon icon={faSearch} /><input value={search} placeholder='Search' onChange={({ target }) => setSearch(target.value)} /></div></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/signup">sign up</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
