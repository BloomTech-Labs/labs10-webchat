import React from "react";
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";

import Convos from './Convos';


function TabContainer(props) {
    return (
      <Typography component="div" style={{ margin: 'none' }}>
        {props.children}
      </Typography>
    );
}

function StyledTab(props) {
  return (
    <Typography component="h1" style={{ margin: 'none' }}>
      {props.children}
    </Typography>
  );
}

const styles = {
    root: {
      flexGrow: 1,
      // border: '1px solid blue',
      // Changes from David
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    queueMenu: {
      // height: '100%',
      // border: '1px solid red',
      borderRadius: '0px'
    },
    queueList: {
      // overflyY: 'scroll',
      // height: '100% ',
      // border: '1px solid orange',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
  },
  paper: {
    // height: '100%'
    borderRadius: '0px'
  },
  paper2: {
    // height: '100%',
    borderRadius: '0px'
  },
  tabs1: {
    height: '100%'
  },
  tabLabel: {
    fontSize: 24
  }
};

class ConvoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: 1,
          newConvos: []
        };
    }

    componentDidMount() {
      setInterval(this.getNewConvos, 5000);

    }

    getNewConvos() {
      axios.get(`/api/chat/queue`)
      .then(response => {
        this.setState({
          newConvos: response.data  
        });
      })
      .catch(error => {
        console.log(error.message);
      })
    }

    handleTabSelect= (event, value) => {
      this.setState({ value });
    };

    handleQueueConvoSelect = (convo_id, customer_uid, customer_name, summary) => {
      // Remove convo from the Queue by updating in_q to false in the convo's db entry
      const data = { id: convo_id };
      const deQueueRequest = axios.put('/api/chat/dequeue', data);
      deQueueRequest
          .then(response => {
              console.log("Conversation removed from Queue.");
              this.props.handleQueueConvoSelect(convo_id, customer_uid, customer_name, summary);  // call hander at ChatDashboard to pass current convo info to ChatView
              this.setState({ value: 0 });                                                        // switch selected tab to Open tab
          })
          .catch(error => {
              console.log(error.message);
          })
    }
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (

        <div className={classes.root}>
          <div className={classes.queueMenu}>
            <Paper className={classes.paper}>
              <Tabs
                className={classes.paper2}
                value={this.state.value}
                onChange={this.handleTabSelect}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                  <Tab label={<h1 className={classes.tabLabel}>NEW</h1>}/>
                  <Tab label={<h1 className={classes.tabLabel}>OPEN</h1>} />
                  <Tab label={<h1 className={classes.tabLabel}>Closed</h1>} />
              </Tabs>
            </Paper>
          </div>

          <div className={classes.queueList}>
                {this.state.value === 0 && <Convos  convoStatus={'queue'} currentConvoId={this.props.currentConvoId} handleConvoSelect={this.handleQueueConvoSelect} />}
                {this.state.value === 1 && <Convos  convoStatus={'active'} currentConvoId={this.props.currentConvoId} currentConvoClosed={this.props.currentConvoClosed} handleConvoSelect={this.props.handleActiveConvoSelect}/>}
                {this.state.value === 2 && <Convos  convoStatus={'closed'} currentConvoId={this.props.currentConvoId} handleConvoSelect={this.props.handleClosedConvoSelect}/>}
          </div>
          
        </div>
      );
    }
}
  
ConvoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConvoList);
