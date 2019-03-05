import React from 'react';
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
      test: ''
    }
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
          // checked={this.state.admin}
          onChange={this.handleChange}
          onClick={this.props.changeAdminStatus}
          />
        </TableCell>

        <TableCell>
          <IconButton onClick={this.handleClick}>
            <DeleteIcon/>
          </IconButton>	
        </TableCell>

      </TableRow>
    )
  }
}

export default RepRecord;