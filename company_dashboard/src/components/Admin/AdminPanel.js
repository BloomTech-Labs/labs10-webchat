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
import RepRecord from './RepRecord';
import './AdminPanel.css';
import Navigation from "../Navigation";
import '../Navigation.css';
import { Column } from "@livechat/ui-kit";


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
    // overflowX: "auto",
    height: 'auto',
  },
  table: {
    // height: 500
  },
  tableHead: {
    // height: 200,
  },
  tableBody: {
    // height: 200,
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  adminContainer: {
    display: 'flex',
    flexDirection: 'Column',
  },
  adminPanel: {
    [theme.breakpoints.down('sm')]: {
      padding: 60,
      flexDirection: 'column',
    },
    [theme.breakpoints.down('md')]: {
      padding: 60,
      flexDirection: 'column',
    },
  },
  rightContainer: {
    // display: 'flex',

    [theme.breakpoints.down('sm')]: {
      // width: '100%',
    },
    [theme.breakpoints.down('md')]: {
      // width: '100%',
    },
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
      companyName: '',
      name: '',
      motto: '',
      url: '',
      company_id: '',
      rep_id: null,
      error: null,
      deleted: false,
      logged: false,
      codeSnippet: '',
      allreps:[ ],
      teamSize: null,
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

    //const id = this.state.rep_id;

  //onAuthStateChanged required before getIdToken() to ensure that the Auth object isn't in an intermediate state—such as initialization—when you get the current user.	Without onAuthStateChanged on refreshing currentUser.getIdToken() was null since it's async

   this.props.firebase.auth.onAuthStateChanged(user => {
  	if (user) {

	this.props.firebase.auth.currentUser.getIdToken()
      	.then(idToken => {

	console.log("idToken after in Admin panel: ", idToken);
        axios.defaults.headers.common['Authorization'] = idToken;

	      //get  details like componay name, motto, image url
	      //const request = axios.get(`/api/reps/adminpanel/${id}`);
	      const request = axios.get("/api/reps/alldetails");
        request
          .then(response => {
            // console.log('respnse.data is:', response.data);
            // console.log('companyname is: ', response.data.name);
            // console.log('on client side image_id is:', response.data.image_id);

            //get all the team members that belong to the same comapny as the admin
	    //const app_req = axios.get(`/api/reps/allreps/${id}`);

            const app_req = axios.get("/api/reps/allreps");
            app_req
              .then(reps => {
                // console.log('all reps are on client side are: ', reps.data);
                // console.log('compnay_id is', response.data.company_id);
                this.setState({
                  company_id: response.data.company_id,
                  companyName: response.data.company_name,
                  name: response.data.name,
                  motto: response.data.motto,
                  url: response.data.url,
                  logged: true,
                  allreps: reps.data,
                  teamSize: reps.data.length
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
	else {
		 this.props.history.push('/repslogin');
	}
   });
  };

  handleClick = () => {
    /*const id = this.state.rep_id;
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
        })*/
  };

  reloadRecords = () => {
    const comp_id = this.state.company_id;
    console.log("reloadRecords");
    const app_req = axios.get(`/api/reps/company/${comp_id}`);
    app_req
      .then(r => {
        console.log('all reps are:', r.data);
        this.setState({allreps: r.data});
      })
      .catch(error => {
        console.log(error.message);
        this.setState({error:error});
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={[classes.adminContainer, 'admin-panel-container'].join(' ')}>
        <Navigation />
        <div className={[classes.adminPanel, "admin-panel"].join(' ')}>
          <div className='left-container'>
              <h2>Company Representative</h2>
            <Paper className={[classes.root, "admin-table"].join(' ')}>
              <div style={{ overflow: "auto" }}>
                <Table className={classes.table} >
                  <TableHead className={classes.tableHead}>
                    <TableRow style={{
                      backgroundColor: "#f5f5f5",
                      height: "35px" }}>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>Remove</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </div>
                <div style={{ overflow: 'auto', height: '310px' }}>
                  <Table>
                    <TableBody className={classes.tableBody}>
                      {this.state.allreps.map((rep, index) => {
                        return (
                          <RepRecord
                          key={index}
                          rep={rep}
                          reloadRecords={this.reloadRecords}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
            </Paper>
            <br/>
            <AddRepForm company_id={this.state.company_id} teamSize={this.state.teamSize}/>

          </div>
          <div className={[classes.rightContainer, "right-container"].join(' ')}>
            <form noValidate autoComplete='off'>
              <h3>Company Name</h3>
              <TextField
                id='outlined-codeSnippet'
                margin='normal'
                variant="outlined"
                rowsMax={Infinity}
                fullWidth
                className={[classes.TextField, "company-name"].join(' ')}
                value={this.state.companyName}
              />
              <h3>Code Snippet</h3>
              <p className="code-snippet-info">Add the Code Snippet to the html for any page that you want to have the Customer Service widget on</p>
              <TextField
                id='outlined-codeSnippet'
                multiline={true}
                rows={8}
                rowsMax={Infinity}
                fullWidth
                className={[classes.TextField, "code-snippet"].join(' ')}
                value={"<button class='webChatAppBtn'>Chat!</button><iframe class='wcaIFRAME'></iframe><script src='https://labs10-webchat.netlify.com/snippet.js?company_id="+this.state.company_id+"'></script>"}
                margin='normal'
                variant='outlined'
              />
            </form>
          </div>
        </div>


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
