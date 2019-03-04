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
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import UserImage from '../company/UserImage';
import IconButton from '@material-ui/core/IconButton';
import AddRepForm from './AddRepForm';
import './AdminPanel.css';
import RepRecord from "./RepRecord";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
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
      is_admin: false,
      companyName: '',
      name: '',
      motto: '',
      image_id: '',
      url: '',
      company_id: '',		
      rep_id: props.history.location.state.rep_id,		
      error: null,
      deleted: false,		
      logged: false,		
      codeSnippet: '',
      allreps:[ ],		  
      team: {
        name: '',
        email: '',
        admin: false,
        remove: false
      },
      open: false,
    }
  };
  // All reps in a company

  
  componentDidMount() {
	  //using rep_id to get representative details to display on Admin panel  
  	const id = this.props.history.location.state.rep_id; 
 
	  this.props.firebase.auth.currentUser.getIdToken()
      .then(idToken => {
        console.log("idToken after in Admin panel: ", idToken);
        axios.defaults.headers.common['Authorization'] = idToken;

	      //get  details like componay name, motto, image url	  
	      const request = axios.get(`/api/reps/adminpanel/${id}`);  
        request
          .then(response => {
            // console.log('respnse.data is:', response.data);
            // console.log('companyname is: ', response.data.name);
            // console.log('on client side image_id is:', response.data.image_id);

            //get all the team members that belong to the same comapny as the admin
            const app_req = axios.get(`/api/reps/allreps/${id}`);
            app_req
              .then(reps => {
                // console.log('all reps are on client side are: ', reps.data);
                // console.log('compnay_id is', response.data.company_id);	
                this.setState({
                  image_id: response.data.image_id, 
                  company_id: response.data.company_id, 
                  companyName: response.data.company_name, 
                  name: response.data.name,
                  motto: response.data.motto, 
                  url: response.data.url, 
                  logged: true, 
                  allreps: reps.data
                });  	
              })
              .catch(error => {     // if get(`/api/reps/allreps/${id}`) throws error
                console.log(error.message);
                this.setState({error:error});
              });
          })
          .catch(error => {        // get(`/api/reps/adminpanel/${id}`) throws error
            console.log(error.message);
            this.setState({error:error});
          })
	    })		  
      .catch(error => {            // if Firebase getIdToken throws an error
        console.log(error.message);
	      this.setState({ error:error });
      })		  
  }
  
  handleClick = () => {
    // console.log(id);
    const id = this.state.rep_id;
    const request = axios.delete(`/api/reps/${id}`);
    request
      .then(response => {
        // console.log('delete response', response.data);

        // get all reps that belong to the same company as admin:
        const comp_id = this.state.company_id;
        // console.log('comp_id', comp_id);
        const app_req = axios.get(`/api/reps/company/${comp_id}`);
        app_req
          .then(r => {
            // console.log('all reps are:', r.data);
            this.setState({allreps: r.data});
          })
          .catch(error => {
            console.log(error.message);
            this.setState({error:error});
          });

        })
        .catch(error => {
          console.log(error.message);
        })
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  
  // **** TESTING ****
  changeAdminStatus = () => {
    // Changing admin status in state, before grabbing admin status then sending request to change in database
    // this.setState({ admin: !admin });
    // Axios call to change admin status in database
    const rep_id = this.state.rep_id;
    const is_admin = this.state.is_admin;
    // const data = {
    //   is_admin: !this.state.allreps[0].is_admin
    // };
    const updatedRep = this.state.allreps[0]
    updatedRep.is_admin = !this.state.allreps[0].is_admin;
    // this.setState({
    //   allreps: updatedRep
    // });
    console.log(this.state.allreps[0].is_admin);
    // const request = axios.put(`/api/reps/adminstatus/${rep_id}`, data);

    // request
    //  .then(response => {
    //   console.log("Before Put Request", this.state.is_admin);
    //   this.setState({ is_admin: response.data})
    //   console.log("After Put Request:", this.state.is_admin);
    // })
    // .catch(error => {
    //  console.log(error.message);
    //  this.setState({ error: error });
    // });

  }
  
  render() {
    const { classes } = this.props;
      
    return (
      <div className='admin-panel'>
        <Typography variant='display1' align='center' gutterBottom>
          Admin Panel
        </Typography>

		    {this.state.logged ? (<UserImage url={this.state.url} />):(<p>Image</p>)}

        <form className={classes.container} noValidate autoComplete='off'>
          <div className='left'>
	
            <p>Company Name</p>
            <TextField
              id='outlined-codeSnippet'
              margin='normal'
              rowsMax={Infinity}
              fullWidth
              className={classes.TextField}
              value={this.state.companyName}
            />
        
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
              {this.state.allreps.map(reps => {
                return (
                  <RepRecord />
                );
              })}
            </TableBody>

          </Table>
        </Paper>
        <br/>
        <AddRepForm company_id={this.state.company_id}/>

            {/* <Button
              variant="outlined"
              color="primary"
              className="add-button"
              onClick={this.handleOpen}
            >
              Add Team Member
            </Button> */}

            {/* <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <Typography variant="h6" id="modal-title">
                  Add Team Member
                </Typography>
                
                <form onSubmit={this.onSubmit}>  
                  <TextField
                    hintText="Enter your Name"
                    floatingLabelText="Name"
                    required={true}
                    name="name"			
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  <br/>
                  <TextField
                    hintText="Enter your Email"
                    floatingLabelText="Email"
                    required={true}
                    name="email"		
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <br/>
          
                  <Button
                    variant='outlined'
                    className={classes.button}
                  >
                    Add Team Member
                  </Button>
                </form>
              </div>
            </Modal> */}
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
