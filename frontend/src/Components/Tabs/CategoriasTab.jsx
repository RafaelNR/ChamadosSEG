import React from 'react';

//* COMPONENTS
import { makeStyles, AppBar } from '@material-ui/core';
import Paper from "../Paper/PaperNoMargin";
import TabPanel from './TabPanel';
import Tabs from './Tabs';
import CircularProcess from '../Loading'

//* CONTEXT
import useLoading from '../../Context/LoadingContext';

//& PROVIDER
import { CategoriasProvider } from "../../Context/CategoriasContext";
import { SubCategoriasProvider } from "../../Context/SubCategoriasContext";

import FormCategoria from '../Forms/CategoriasForm';
import FormSubCategoria from '../Forms/SubCategorias.Form';

const CategoriasTable = React.lazy(() => import('../Tables/CategoriasTable'))
const SubCategoriasTable = React.lazy(() => import('../Tables/SubCategoriasTable'))
const Dialog = React.lazy(() => import('../Dialog'))


const tab = [
	{
		id: 0,
		render: CategoriasTable,
		options: {
			title: "Categoria",
			Insert: FormCategoria.FormInsert,
			Update: FormCategoria.FormUpdate,
			Delete: FormCategoria.FormDelete,
		}
	},
	{
		id: 1,
		render: SubCategoriasTable,
		options: {
			title: 'Sub-Cateogria',
			Insert: FormSubCategoria.FormInsert,
			Update: FormSubCategoria.FormUpdate,
			Delete: FormSubCategoria.FormDelete,
		}
	},
	// {
	// 	id: 2,
	// 	title: 'Modelos',
	// 	componente: null,
	// },
];

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
		marginTop: '-6rem',
		backgroundColor: theme.palette.background.paper,
	},
	headTab: {
		boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
  },
  '.Mui-selected': {
    color: 'white',
    background: '#3f51b5',
  }
}));


const ProviderFactor = ({ children }) => {

	return (
		<CategoriasProvider>
			<SubCategoriasProvider>{children}</SubCategoriasProvider>
		</CategoriasProvider>
	)
	
}

export default function () {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);
  const { setLoading } = useLoading();

	const handleChange = React.useCallback((event, newValue) => {
		setCurrentTab(newValue);
		setLoading(true);

		return () => {
			setLoading(false);
			return;
		}
	}, []);

  return (
		<div className={classes.root}>
			<AppBar position="static" color="default" className={classes.headTab}>
        <Tabs handleChange={handleChange} currentTab={currentTab} arrayTab={tab}  />
      </AppBar>
			<React.Suspense fallback={<CircularProcess type="Tab" />}> 
				<TabPanel value={currentTab} index={tab[currentTab].id} key={tab[currentTab].id}>
					<ProviderFactor>
						<Paper Render={tab[currentTab].render} RenderDialog={Dialog} options={tab[currentTab].options} />
					</ProviderFactor>
				</TabPanel>
			</React.Suspense>

		</div>
	);
}
