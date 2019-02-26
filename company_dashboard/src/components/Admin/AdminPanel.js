import React, { Component } from "react";
import PropTypes from "prop-types";
import { withFirebase } from "../Firebase";
import { Link, withRouter, Route} from "react-router-dom"
import { FirebaseContext } from '../Firebase';
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
import UserImage from '../company/UserImage';
import IconButton from '@material-ui/core/IconButton';
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


const AdminPanel = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <AdminPanelComponent firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


class AdminPanelBaseForm extends React.Component {
constructor(props){
    super(props);  
	this.state = {
    companyname: '',
    motto: '',
    image_id: '',
    url:'',
    company_id:'',		
    rep_id:props.history.location.state.rep_id,		
    error:null,
    deleted:false,		
    logged:false,		
    codeSnippet: '',
   allreps:[],		
    team: {
      name: '',
      email: '',
      admin: false,
      remove: false
    }
  }
}	;

  
  componentDidMount() {
	//using rep_id to get representative details to display on Admin panel  
  	const id = this.props.history.location.state.rep_id; 
 
	//created a new endpoint in representatives routes called adminpanel, using inner join in helper functions to get companyname, image url and rep motto form 3 different tables

	this.props.firebase.auth.currentUser.getIdToken()
          .then(idToken => {
            console.log("idToken after in Admin panel: ", idToken);
            axios.defaults.headers.common['Authorization'] = idToken;

	const request = axios.get(`/api/reps/adminpanel/${id}`);  

        request.then(response => {
                console.log('respnse.data is:', response.data);
		console.log('companyname is: ', response.data.name);
		console.log('on client side image_id is:', response.data.image_id);

		const app_req = axios.get(`/api/reps/allreps/${id}`);

		app_req.then(reps =>{
		console.log('all reps are on client side are: ', reps.data);
		
		console.log('compnay_id is', response.data.company_id);	
		this.setState({image_id: response.data.image_id, company_id:response.data.company_id, companyname: response.data.name, motto: response.data.motto, url:response.data.url, logged:true, allreps: reps.data});
        	
		})
		
		.catch(error =>{
			console.log(error.message);
                	this.setState({error:error});
		});

	})
        .catch(err => {
                console.log(err.message);
                this.setState({error:err});
        })
	  })		  
     .catch(error => {                 // if Firebase getIdToken throws an error
             console.log(error.message);
	     this.setState({ error:error });
          })		  
	
}
  




handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
render() {
    const { classes } = this.props;

    
    return (
      <div className='admin-panel'>
	 <Typography variant='display1' align='center' gutterBottom>
          Admin Panel
         </Typography>

		{this.state.logged ?(<UserImage url={this.state.url} />):(<p>Image</p>)}

	  <form className={classes.container} noValidate autoComplete='off'>
          <div className='left'>
	
	   <p>Company Name</p>
	   <TextField
	    id='outlined-codeSnippet'
	    margin='normal'
	    rowsMax={Infinity}
            fullWidth
            className={classes.TextField}
	    value={this.state.companyname}
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
              {this.state.allreps.map(reps => {
                return (
                  <TableRow key={reps.id}>
                    <TableCell component="th" scope="row">
                      {reps.name}
                    </TableCell>
                    <TableCell>{reps.email}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={this.state.admin}
                        onChange={this.handleChange}
                      />
                    </TableCell>
                    <TableCell>

		<IconButton onClick={this.handleClick}>
   			<DeleteIcon/>
		</IconButton>	
			
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

AdminPanelBaseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const AdminPanelComponent = withStyles (styles) (withRouter(withFirebase(AdminPanelBaseForm)));

//export withStyles (styles) (AdminPanelBaseForm);
export default AdminPanel;

export { AdminPanelComponent};

//export default withStyles(styles)(AdminPanel);
