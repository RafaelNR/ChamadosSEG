import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function a11yProps(index) {
	return {
		id: `scrollable-auto-tab-${index}`,
		"aria-controls": `scrollable-auto-tabpanel-${index}`,
	};
}

function MyTabs ({ handleChange, currentTab, arrayTab }) {

  return (
      <Tabs
        value={currentTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
    >
      {
        arrayTab.map((tab,index) => {
          return (<Tab key={index} label={tab.options.title} {...a11yProps(tab.id)} />);
        })
      }
    </Tabs>
	);
}

MyTabs.propTypes = {
	handleChange: PropTypes.func.isRequired,
	currentTab: PropTypes.number.isRequired,
  arrayTab: PropTypes.array.isRequired,
};

export default React.memo(MyTabs);

