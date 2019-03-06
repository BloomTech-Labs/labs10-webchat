import React from 'react';

import { withFirebase } from './Firebase';
import { Divider } from '@material-ui/core';

const SignOutButton = ({ firebase }) => (
  <div type="button" onClick={firebase.doSignOut}>
    Sign Out
  </div>
);

export default withFirebase(SignOutButton);
