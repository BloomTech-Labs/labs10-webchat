import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';
import './Navigation.css'

<<<<<<< HEAD
const Navigation = () => (
  <div className="navigation">
    <img src="https://i.ibb.co/Mpy1WhB/3029ba78-770c-49a3-aaa6-6a6cfc58b56c.png" alt="logo" />
    <div className="navigation-links">
      <Link to={ROUTES.CHAT_DASHBOARD}>Chat Dashboard</Link>
      <Link to={ROUTES.LANDING}>Log Out</Link>
    </div>
  </div>
=======

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
      <div>
        <Link to={ROUTES.LANDING}>Home</Link>
      	<Link to={ROUTES.REP_REGISTER}>Sign Up</Link>
     </div>		
>>>>>>> 2dd1608431bd8499fe1c8a6d73f12fe46edfb4aa
);

export default Navigation;