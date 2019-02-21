import React from "react";
import PropTypes from "prop-types";
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
import axios from 'axios';
import './AdminPanel.css';



const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(name, email) {
  id += 1;
  return { id, name, email };
}

const rows = [
  createData('Joe Smith', 'joe@joe.com'),
  createData('Joe Smith', 'joe@joe.com'),
  createData('Joe Smith', 'joe@joe.com'),
  createData('Joe Smith', 'joe@joe.com'),
  createData('Joe Smith', 'joe@joe.com')
];

class AdminPanel extends React.Component {
  state = {
    name: '',
    motto: '',
    error:null,	  
    codeSnippet: '',
    team: {
      name: '',
      email: '',
      admin: false,
      remove: false
    }
  };

  
  componentDidMount() {
  const id = this.props.history.location.state.rep_id; 
 
	const request = axios.get('/api/reps/${id}');

        request.then(response => {
		 console.log(response);
                console.log(response.data);
		console.log(response.data.name);
                this.setState({name: response.data.name, motto: response.data.motto});

               //this.props.history.push({
               // pathname: '/adminpanel',
               // state: { rep_id: response.data }
               // });

        })
        .catch(err => {
                console.log(err.message);
                this.setState({error:err});
        })

}

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    const handleClick = name => {
      console.log(name);
    };
    
    return (
      <div className='admin-panel'>
	 <Typography variant='display1' align='center' gutterBottom>
          Admin Panel
        </Typography>   
         <form className={classes.container} noValidate autoComplete='off'>
          <div className='left'>
	
	    <p>Name</p>
	   <TextField
	    id='outlined-codeSnippet'
	    margin='normal'
	    rowsMax={Infinity}
            fullWidth
            className={classes.TextField}
	    value={this.state.name}
	    />
		
	    <p>Motto</p>
	    <TextField
            id='outlined-codeSnippet'
            margin='normal'
            value={this.state.motto}
            />



            <p>Code Snippet</p>
            <TextField
              id='outlined-codeSnippet'
              multiline={true}
              rows={8}
              rowsMax={Infinity}
              fullWidth
              className={classes.TextField}
              value={this.state.email}
              margin='normal'
              variant='outlined'
            />
          </div>
        </form>

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={this.state.admin}
                        onChange={this.handleChange}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon 
                        className={classes.icon} 
                        click={() => handleClick(row.name)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <Button
          variant="outlined"
          color="primary"
          className="add-button"
        >
          Add Team Member
        </Button>
      </div>
    );
  }
}

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPanel);
