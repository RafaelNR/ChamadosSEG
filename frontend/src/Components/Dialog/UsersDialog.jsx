import React from "react";
import {
	Dialog as MyDialog,
	DialogContent,
	DialogActions,
	Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { SaveButton, CancelButton } from "../Buttons/Index";
import DialogTitle from "./HeadDialog";
import { FormInsert, FormUpdate } from "../Forms/Usuarios";

import useUsuarios from "../../Context/UsuariosContext";
import useDialog from "../../Context/DialogContext";

const useStyles = makeStyles(() => ({
	dialogLoader: {
		width: "800px",
		height: "320px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const Dialog = () => {
	const classes = useStyles();
	const { type, open, setOpen, setLoading, closeDialog } = useDialog();
	const { handleActions } = useUsuarios();

	/**
	 * Quando clica na action
	 */
	const clickAction = () => {
		handleActions(setOpen, setLoading, type);
	};

	/**
	 * Renderiza o dialog baseado na action clicada.
	 */
	const dialogFactory = () => {
		switch (type) {
			case "insert":
				return (
					<React.Fragment>
						<DialogTitle title="Inserir Usuário" />
						<FormInsert />
						<DialogActions>
							<SaveButton clickAction={clickAction} />
						</DialogActions>
					</React.Fragment>
				);
			case "update":
				return (
					<React.Fragment>
						<DialogTitle title="Editar Usuario" />
						<FormUpdate />
						<DialogActions>
							<SaveButton clickAction={clickAction} />
						</DialogActions>
					</React.Fragment>
				);
			case "disabled":
				return (
					<React.Fragment>
						<DisabledUserDialog className={classes.dialogLoader} />
						<DialogActions>
							<SaveButton clickAction={clickAction} />
							<CancelButton clickClose={closeDialog} />
						</DialogActions>
					</React.Fragment>
				);
			case "actived":
				return (
					<React.Fragment>
						<ActivedUserDialog className={classes.dialogLoader} />
						<DialogActions>
							<SaveButton clickAction={clickAction} />
							<CancelButton clickClose={closeDialog} />
						</DialogActions>
					</React.Fragment>
				);

			default:
				break;
		}
	};

	
	return open && type ? (
		<MyDialog onClose={closeDialog} open={open} maxWidth="md" scroll="body">
			{dialogFactory()}
		</MyDialog>
	) : null;
};

/**

/**
 * Dialog para desabilitar o usuário
 */
const DisabledUserDialog = () => {
	const { usuario } = useUsuarios();
	return (
		<DialogContent dividers>
			<Typography>
				Quer realmente desabilitar o usuário, {usuario.nome} ?
			</Typography>
		</DialogContent>
	);
};

/**
 * Dialog para habilitar o usuário
 */
const ActivedUserDialog = () => {
	const { usuario } = useUsuarios();
	return (
		<DialogContent dividers>
			<Typography>
				Quer ativar o usuário, {usuario.nome}, novamente ?
			</Typography>
		</DialogContent>
	);
};

export default Dialog;
