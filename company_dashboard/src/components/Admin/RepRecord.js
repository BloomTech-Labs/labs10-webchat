import React from 'react';
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';

class RepRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_admin: this.props.rep.is_admin,
    }
  }

  changeAdminStatus = () => {
    /*
    [x] Change state is_admin
    [x] Put request to change is_admin in database
    [x] Reload records in Admin Panel from where this was initialized
    [] Async await for clean render transitioning
    */

    this.setState({
      is_admin: !this.state.is_admin
    }, () => {
      const data = {
        is_admin: this.state.is_admin
      }
      const rep_id = this.props.rep.id
      console.log("Put request data", data);
      const request = axios.put(`/api/reps/adminstatus/${rep_id}`, data);
      request
        .then(response => {
          console.log("Admin status updated", response);
          this.props.reloadRecords();
        })
        .catch(error => {
          console.log(error.message);
        });
  
      // Dynamic reloader hold off for now
    });
  }

  render() {
    return (
      <TableRow>
        
        <TableCell component="th" scope="row">
          {this.props.rep.name}
        </TableCell>

        <TableCell>
          {this.props.rep.email}
        </TableCell>

        <TableCell>
          <Checkbox
          checked={this.state.is_admin}
          onChange={this.handleChange}
          onClick={this.changeAdminStatus}
          />
        </TableCell>

        <TableCell>
          <IconButton onClick={() => this.props.removeRep(this.props.id)}>
            <DeleteIcon/>
          </IconButton>	
        </TableCell>

      </TableRow>
    )
  }
}

export default RepRecord;