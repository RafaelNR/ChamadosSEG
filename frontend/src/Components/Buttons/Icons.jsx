import React, { useContext, memo } from "react";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import {
	AddBox,
	EditSharp,
	VisibilityOffSharp,
	VisibilitySharp,
} from "@material-ui/icons";
import { DialogContext } from "../../Context/DialogContext";

// Tabela
const useStyles = makeStyles((theme) => ({
	add: {
		fontSize: "25px",
		color: "#3f51b5",
	},
	edit: {
		fontSize: "18px",
		color: "green",
	},
	disabled: {
		fontSize: "18px",
		color: "red",
	},
	actived: {
		fontSize: "18px",
		color: "blue",
	},
}));

function AddIconButton() {
	const classes = useStyles();
	const { ToggleDialogClick } = useContext(DialogContext);
	return (
		<IconButton onClick={() => ToggleDialogClick("insert")}>
			<Tooltip title="Add">
				<AddBox className={classes.add} />
			</Tooltip>
		</IconButton>
	);
}

const EditIconButton = memo(({ id, clickAction }) => {
	const classes = useStyles();
	const { ToggleDialogClick } = useContext(DialogContext);
	return (
		<IconButton
			onClick={() => {
				clickAction(id);
				ToggleDialogClick("update");
			}}
		>
			<Tooltip title="Editar">
				<EditSharp className={classes.edit} />
			</Tooltip>
		</IconButton>
	);
});

const DisabledIconButton = memo(({ id, clickAction }) => {
	const classes = useStyles();
	const { ToggleDialogClick } = useContext(DialogContext);
	return (
		<IconButton
			onClick={() => {
				clickAction(id);
				ToggleDialogClick("disabled");
			}}
		>
			<Tooltip title="Desabilitar">
				<VisibilityOffSharp className={classes.disabled} />
			</Tooltip>
		</IconButton>
	);
});

const ActivedIconButton = memo(({ id, clickAction }) => {
	const classes = useStyles();
	const { ToggleDialogClick } = useContext(DialogContext);
	return (
		<IconButton
			onClick={() => {
				clickAction(id);
				ToggleDialogClick("actived");
			}}
		>
			<Tooltip title="Habilitar">
				<VisibilitySharp className={classes.actived} />
			</Tooltip>
		</IconButton>
	);
});

export { AddIconButton, EditIconButton, DisabledIconButton, ActivedIconButton };
