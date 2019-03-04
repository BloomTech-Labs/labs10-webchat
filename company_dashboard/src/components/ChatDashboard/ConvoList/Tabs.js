import React from 'react';
import Tab from './Tab';
import './ConvoList.css';
import PropTypes from 'prop-types';

const Tabs = props => {
  return (
    <div className="tabs">
        <Tab 
          tabName="queue"
          selectTabHandler={props.changeSelectedTab} 
          selectedTab={props.selectedTab}
        /> 

        <Tab 
          tabName="active"
          selectTabHandler={props.changeSelectedTab} 
          selectedTab={props.selectedTab}
        />     
      
    </div>
  );
};

// // Make sure to use PropTypes to validate your types!
// Tabs.propTypes = {
//   selectedTab: PropTypes.string,
//   changeSelectedTab: PropTypes.func,
// }

export default Tabs;