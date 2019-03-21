import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import AccountSettings from '../settings/AccountSettings';
import { get } from 'https';

class AddRepForm extends React.Component {
  state = {
    open: false,
    email: '',
    moreRepsAllowed: false,
    error: null
  };

  handleClickOpen = () => {
    const id = this.props.company_id;
    axios.get(`/api/billing/getSubMax/${id}`)
      .then(response => {
        console.log('response from AddRepForm getSub: ', response);
        if (response.data > this.props.teamSize) {   // if max_reps on subscription is greater than current team size
          this.setState({ 
            moreRepsAllowed: true,
            open: true 
          })
        } else {
          this.setState({ 
            moreRepsAllowed: false,
            open: true 
          });
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
  };

  handleClose = () => {
    this.setState({ email: '', open: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
      const email = this.state.email;
      const company_id = this.props.company_id;
      const rep = { email, company_id };
      axios.post('/api/approvedemails', rep)
        .then(id => {
            this.handleClose();
        })
        .catch(error => {
            this.setState({ error: error.message });
        })
  };

  render() {
    let moreRepsAllowed = this.state.moreRepsAllowed;

    return (
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Add a Team Member
          </Button>
          {/* <div>
            {!moreRepsAllowed ? (
              <p>You've reached the max number of team members for your plan. Upgrade your plan to add more.</p>
            ) : (
              <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Add a Team Member
              </Button>
            )}
          </div> */}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            {!moreRepsAllowed ? (
              <p>You've reached the max number of team members for your plan. Upgrade your plan to add more.</p>
            ) : (
              <div>
                <DialogTitle id="form-dialog-title">Add a Team Member</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the email address of a team member below to invite them to join. They will be sent an email with a link to sign up.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    required={true}
                    value={this.state.email}
                    onChange={this.onChange}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.onSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </div>
            )}
          </Dialog>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
    );
  }
}

export default AddRepForm;