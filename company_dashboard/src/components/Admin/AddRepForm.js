import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

class AddRepForm extends React.Component {
  state = {
    open: false,
    email: '',
    error: null
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => {
      console.log("Submitting Add a team member");
      const email = this.state.email;
      const company_id = this.props.company_id;
      const rep = { email, company_id };
      axios.post('/api/approvedemails', rep)
        .then(id => {
            console.log(id);
            this.handleClose();
        })
        .catch(error => {
            this.setState({ error: error.message });
        })
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add a Team Member
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
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
        </Dialog>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default AddRepForm;