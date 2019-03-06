import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as ROUTES from '../constants/routes';


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
);

export default Navigation;