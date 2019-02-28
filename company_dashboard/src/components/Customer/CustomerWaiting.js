import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
    marginTop: 40,
  },
  company: {
    display: 'flex',
  },
  avatar: {
    margin: 15,
    width: 100,
    height: 100,
  },
  companyInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 20,
  },
  name: {
    color: 'black',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    margin: 15,
  },
  greeting: {
    display: 'flex',
    textAlign: 'justify',
  },
  waitingLine: {
    display: 'flex',
  },
  questions: {
    display: 'flex',
  },
  summary: {
    display: 'flex',
    textAlign: 'justify',
    fontSize: 13,
  }, 
  button: {
    display: 'flex',
    margin: 15,
  }
};

function typographyV1Theme(theme) {
  return createMuiTheme({
    ...theme,
    typography: {
      useNextVariants: false,
    },
  });
}

class CustomerWaiting extends React.Component {
  state = { 
    image_id: 'https://www.davidmbrian.com/sc_images/products/3145_thumbnail_image.jpg',
    companyName: 'Water Bottle',
    motto: 'Stay Hydrated',
    customerName: 'John',
    number: '2',
    summary: 'Webtwo ipsum orkut reddit meebo skype vimeo jajah spock empressr zimbra, mobly napster hipmunk prezi chartly bitly spock. Loopt twones meebo hipmunk, fleck xobni. Convore bebo rovio vimeo zanga handango blekko koofers, loopt twitter imvu flickr kaboodle chegg. Zillow lala mzinga, sifteo. Voki heekya sococo geni oovoo disqus, empressr doostang lijit.'
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={typographyV1Theme}>
        <div className={classes.root}>
          
          <div className={classes.company}>
            <Avatar alt='Company Image' src={this.state.image_id} className={classes.avatar} />
            <div className={classes.companyInfo}>
              <Typography className={classes.name} component='h3' variant='display2' gutterBottom>
                {this.state.companyName}
              </Typography>
              <Typography className={classes.motto} component='h5' variant='headline' gutterBottom>
                {this.state.motto}
              </Typography>
            </div>
          </div>
          
          <div className={classes.messages}>
            <div className={classes.greeting}>
              <Typography variant='body2' gutterBottom>
                Thanks for reaching out to us, {this.state.customerName}. Your business is valuable to us.
                <br/>
                An agent will speak with you as soon as possible.
              </Typography>
            </div>
            
            <div className={classes.waitingLine}>
              <h2>You are number {this.state.number} in line.</h2>
            </div>
            
            <div className={classes.questions}>
              <h4>What can we help with today?</h4>
            </div>

            <div className={classes.summary}>
              <p>{this.state.summary}</p>
            </div>
          </div>
          
          <Button
            variant='outlined'
            color='secondary'
            className={classes.button}
          >
            Cancel
          </Button>
        
        </div>
      </MuiThemeProvider>
    );
  }
}

CustomerWaiting.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerWaiting);