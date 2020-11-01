import React, { memo } from "react";
import {
	makeStyles, Typography, CircularProgress, TableRow, TableCell
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
	root: {
    display: "flex",
    justifyContent: 'center',
    height: '200px',
    alignItems: 'center',
		"& > * + *": {
			marginLeft: theme.spacing(2),
		},
  },
  table: {
    display: 'table-row',
    height: '250px',
	},
	table_td:{
		position: 'absolute',
		left: '50%',
		bottom: 'calc(100vh - 70%)',
		borderBottom: '0'
	},
	paperloader: {
		width: "100%",
		height: "500px",
		marginBottom: theme.spacing(2),
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2),
	},
	loading: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
	},
	message: {
		display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10px',
    color: '#3f51b5',
    fontSize: '15px',
    fontWeight: 'bold'
	}
}));


function LoadingTable() {
  const classes = useStyles();
  return (
		<TableRow className={classes.table}>
			<TableCell className={classes.table_td}>
				<CircularProgress />
			</TableCell>
    </TableRow>
	);
}

function LoadingDialog() {
  const classes = useStyles();
  return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}

function LoadingPaper() {
  const classes = useStyles();
  return (
		<div className={classes.loading}>
			<CircularProgress />
		</div>
	);
}

function LoadingTab() {
  const classes = useStyles();
	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
}

function LoadingMessage(props) {
  const classes = useStyles();
	return (
		<div className={classes.root}>
			<CircularProgress />
			<Typography className={classes.message}>{props.message}</Typography>
		</div>
	);
}

//* FACTOR LOADING
function Loading({ type, message }) {
  switch (type) {
		case "Table":
			return <LoadingTable />
		case "Dialog":
			return <LoadingDialog /> 
		case "Paper":
			return <LoadingPaper /> 
		case "Tab":
			return <LoadingTab />
		case "Msg":
			return <LoadingMessage message={message} />

		default:
			break;
	}
}

export default memo(Loading)