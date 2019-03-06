import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import { withFirebase } from './Firebase';
import { Divider } from '@material-ui/core';

const SignOutButton = ({ firebase }) => (
  // <Link to={ROUTES.LANDING}>
    <div type="button" onClick={firebase.doSignOut}>
      Sign Out
    </div>

);

export default withFirebase(SignOutButton);
