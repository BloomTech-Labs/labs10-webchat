import React from "react";
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";

import ActiveConvos from './ActiveConvos';
import Queue from './Queue';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

const styles = {
    root: {
      flexGrow: 1
    }
};

class ConvoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }
    
  
    handleTabChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (
        <NoSsr>
            <Paper className={classes.root}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    {/* <Tab label="Active" /> */}
                    <Tab label="Queue" />
                </Tabs>
            </Paper>

            {/* {value === 0 && <TabContainer><ActiveConvos /></TabContainer>} */}
            {this.state.value === 0 && <TabContainer><Queue handleQueueConvoSelect={this.props.handleQueueConvoSelect} /></TabContainer>}
        </NoSsr>
      );
    }
}
  
ConvoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ConvoList));





// class ConvoList extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             selectedTab: "queue"
//         }
//     }
    

//     changeSelectedTab = tabName => {
//         // this function should take in the tab and update the state with the new tab.
//         this.setState({ selectedTab: tabName });
//     };

//     render() {
        

//         return (
//             <div className="convolist-container">
//                 <div className="tabs-container">
//                     <Tabs 
//                         selectedTab={this.state.selectedTab} 
//                         changeSelectedTab={this.changeSelectedTab}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }


// export default ConvoList;