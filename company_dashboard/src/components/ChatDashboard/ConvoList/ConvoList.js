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
      <Typography component="div" style={{ padding: 8 * 2 }}>
        {props.children}
      </Typography>
    );
}
  
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

function LinkTab(props) {
    return (
        <Tab component="a" onClick={event => event.preventDefault()} {...props} />
    );
}

const styles = {
    root: {
        flexGrow: 1
    }
};

class ConvoList extends React.Component {
    state = {
        value: 1  // tab 1 selected
    };

    handleChange = (event, value) => {
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
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <LinkTab label="ActiveConvos" />
                <LinkTab label="Queue" />
            </Tabs>
            </Paper>
            {value === 0 && <TabContainer><ActiveConvos /></TabContainer>}
            {value === 1 && <TabContainer><Queue /></TabContainer>}
        </NoSsr>
        );
    }
}

ConvoList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(ConvoList));