import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import useLoading from '../../Context/LoadingContext'
import CategoriasTable from '../Tables/CategoriasTable'

const arrayTab = [
	{
		id: 0,
		title: "Categoria",
		componente: <CategoriasTable />,
	},
	{
		id: 1,
		title: 'Sub-Cateogria',
		componente: null,
	},
	{
		id: 2,
		title: 'Modelos',
		componente: null,
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		borderBottomLeftRadius: "10%",
		borderBottomRightRadius: "10%",
	},
	headTab: {
		borderTopLeftRadius: "10%",
		borderTopRightRadius: "10%",
		boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
  },
  '.Mui-selected': {
    color: 'white',
    background: '#3f51b5',
  }
}));

export default function () {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);
  const { setLoading } = useLoading();

  React.useEffect(() => {
    setLoading(false)
  },[])

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
		<div className={classes.root}>
			<AppBar position="static" color="default" className={classes.headTab}>
        <Tabs handleChange={handleChange} currentTab={currentTab} arrayTab={arrayTab}  />
      </AppBar>
      
      {arrayTab.map((tab) => {
        return (
					<TabPanel value={currentTab} index={tab.id} key={tab.id}>
						<div>
						{tab.componente ? tab.componente : tab.title}
						</div>
					</TabPanel>
				);
      })}

		</div>
	);
}
