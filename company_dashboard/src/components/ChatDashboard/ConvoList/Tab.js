import React from 'react';
import PropTypes from 'prop-types';
import './ConvoList.css';

const Tab = props => {
  /* Using your props, determine if the `tab` prop matches the `selectedTab` prop, 
      if they match, the className should be: 'tab active-tab', 
      if it is not it should just be 'tab'*/
      
  const isActive = props.tabName === props.selectedTab;
  return (
    <div
      className={`tab ${isActive ? 'active-tab' : ''}`}
      onClick={() => props.selectTabHandler(props.tabName)}
    >
      {props.tabName.toUpperCase()}
    </div>
  );
};

// // Make sure you include PropTypes on your props.
// Tab.propTypes = {
//   tab: PropTypes.string,
//   selectedTab: PropTypes.string,
// };

export default Tab;
