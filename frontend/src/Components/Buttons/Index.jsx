import React from "react";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom'
import { makeStyles, Button, DialogActions } from "@material-ui/core/";
import { Edit, Save, Close, NavigateNextSharp, NavigateBeforeSharp } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
	cancel: {
		backgroundColor: "white",
		color: "#b71c1c",
		padding: "8px 15px",
		border: "1px solid #b71c1c",
		fontWeight: 'bold',
		"&:hover": {
			transition: "",
			color: "white",
			backgroundColor: "#b71c1c",
		},
	},
	save: {
		backgroundColor: "#1b5e20",
		color: "white",
		padding: "8px 15px",
		marginRight: "8px",
		"&:hover": {
			transition: "",
			backgroundColor: "#124116",
		},
	},
	next: {
		backgroundColor: "blue",
		color: "white",
		padding: "8px 15px",
		marginRight: "8px",
		fontWeight: 'bold',
		"&:hover": {
			transition: "",
			backgroundColor: "blue",
		},
	},
	icon: {
		fontSize: "20px",
	},
}));

const SaveButton = React.memo(({disabled}) => {
	const classes = useStyles();
	return (
			<Button type="submit" className={classes.save} disabled={disabled} startIcon={<Save className={classes.icon}/>}>
				SALVAR
			</Button>
	);
});

const NavigatorButton = React.memo(({ clickAction, name, icon }) => {
	const classes = useStyles();
	return (
		<Button onClick={() => clickAction()} className={classes.next}>
			{icon === 'next'
				? <NavigateNextSharp className={classes.icon} />
				: <NavigateBeforeSharp className={classes.icon} />
			}
			{ name ? name : ''}
		</Button>
	);
});

const CancelButton = React.memo(({ clickClose }) => {
	const classes = useStyles();
	return (
		<DialogActions>
			<Button className={classes.cancel} onClick={clickClose} startIcon={<Close className={classes.icon} />}>
				CANCELAR
			</Button>
		</DialogActions>
	);
});

const CreatedTicket = React.memo(() => {
	const classes = useStyles();
	return (
		<NavLink to='/atividades/create'>
			<Button color="primary" startIcon={<Save className={classes.icon}/>} />
		</NavLink>
	);
});


const EditInfoAtividade = React.memo(({handleEdit}) => { 
	const classes = useStyles();
	return (
		<Button variant="contained" color="primary" onClick={(event) => handleEdit(event)}>
  		<Edit />
		</Button>
	)
})

export { SaveButton, CancelButton, NavigatorButton, CreatedTicket, EditInfoAtividade };
