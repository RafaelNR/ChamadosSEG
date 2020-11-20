import React, { memo } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip, makeStyles } from "@material-ui/core";
import {
	AddBox,
	EditSharp,
	VisibilityOffSharp,
	VisibilitySharp,
	DeleteForeverSharp,
} from "@material-ui/icons";
import useDialog from "../../Context/DialogContext";

const useStyles = makeStyles((theme) => ({
	add: {
		fontSize: "25px",
		color: "#3f51b5",
	},
	edit: {
		fontSize: "18px",
		color: "green",
	},
	delete: {
		fontSize: "18px",
		color: "red",
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

const AddIconButton = memo(() => {
	const classes = useStyles();
	const { openDialog } = useDialog();
	return (
		<IconButton onClick={() => openDialog("insert")}>
			<Tooltip title="Add">
				<AddBox className={classes.add} />
			</Tooltip>
		</IconButton>
	);
});

const EditIconButton = memo(({ id, getID }) => {
	const classes = useStyles();
	const { openDialog } = useDialog();
	return (
		<IconButton
			onClick={() => {
				getID(id);
				openDialog("update");
			}}
		>
			<Tooltip title="Editar">
				<EditSharp className={classes.edit} />
			</Tooltip>
		</IconButton>
	);
});

EditIconButton.propTypes = {
	id: PropTypes.number.isRequired,
	getID: PropTypes.func.isRequired,
};

const DeleteIconButton = memo(({ id, getID }) => {
	const classes = useStyles();
	const { openDialog } = useDialog();
	return (
		<IconButton
			onClick={() => {
				getID(id);
				openDialog("delete");
			}}
		>
			<Tooltip title="Deletar">
				<DeleteForeverSharp className={classes.delete} />
			</Tooltip>
		</IconButton>
	);
});

DeleteIconButton.propTypes = {
	id: PropTypes.number.isRequired,
	getID: PropTypes.func.isRequired,
};

const DisabledIconButton = memo(({ id, getID }) => {
	const classes = useStyles();
	const { openDialog } = useDialog();
	return (
		<IconButton
			onClick={() => {
				getID(id);
				openDialog("disabled");
			}}
		>
			<Tooltip title="Desabilitar">
				<VisibilityOffSharp className={classes.disabled} />
			</Tooltip>
		</IconButton>
	);
});

DisabledIconButton.propTypes = {
	id: PropTypes.number.isRequired,
	getID: PropTypes.func.isRequired,
};

const ActivedIconButton = memo(({ id, getID }) => {
	const classes = useStyles();
	const { openDialog } = useDialog();
	return (
		<IconButton
			onClick={() => {
				getID(id);
				openDialog("actived");
			}}
		>
			<Tooltip title="Habilitar">
				<VisibilitySharp className={classes.actived} />
			</Tooltip>
		</IconButton>
	);
});

ActivedIconButton.propTypes = {
	id: PropTypes.number.isRequired,
	getID: PropTypes.func.isRequired,
};

export {
	AddIconButton,
	EditIconButton,
	DeleteIconButton,
	DisabledIconButton,
	ActivedIconButton,
};
