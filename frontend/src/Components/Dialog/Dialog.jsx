import React, { useContext, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogActions,
	Grid,
	TextField,
	Select,
	MenuItem,
	CircularProgress,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { SaveButton } from "../Buttons/Index";
import DialogTitle from "./headDialog";
import { UsuariosContext } from "../../Context/UsuariosContext";
import { DialogContext } from "../../Context/DialogContext";

const fieldsInsert = [
	{
		id: "nome",
		label: "Nome Completo",
		required: true,
		autofocus: true,
		margin: "normal",
		type: "text",
		option: "input",
		value: "",
	},
	{
		id: "passwd",
		label: "Senha",
		required: true,
		margin: "normal",
		type: "password",
		option: "input",
		value: "",
	},
	{
		id: "email",
		label: "Email",
		required: true,
		margin: "normal",
		type: "email",
		option: "input",
		value: "",
	},
	{
		id: "user",
		label: "Username",
		required: true,
		margin: "normal",
		type: "email",
		option: "input",
		value: "",
	},
	{
		id: "telefone",
		label: "Telefone",
		required: true,
		margin: "normal",
		type: "email",
		option: "input",
		value: "",
	},
];

const useStyles = makeStyles(() => ({
	dialogloader: {
		width: "800px",
		height: "320px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const OpenDialogType = () => {
	const classes = useStyles();
	const { dialogType } = React.useContext(DialogContext);
	const { registerUsuario } = useContext(UsuariosContext);

	const SwitchDialog = () => {
		switch (dialogType) {
			case "insert":
				return <InsertUserDialog className={classes.dialogLoading} />;
			case "update":
				return <UpdateUserDialog className={classes.dialogLoading} />;
			case "disabled":
				return <UpdateUserDialog className={classes.dialogLoading} />;
		}
	};

	return <React.Fragment>{SwitchDialog()}</React.Fragment>;
};

/**
 * Cria os elementos de Dialog para insert do usuário;
 * @param {objeto} className
 */
const InsertUserDialog = ({ className }) => {
	const { usuario, setUsuario, errors, handleInsertSubmit } = useContext(
		UsuariosContext
	);
	const { openDialog, ToggleDialogClick, dialogLoading } = useContext(
		DialogContext
	);

	/**
	 * Cria o objeto para novo usuário
	 */
	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setUsuario({
			...usuario,
			[key]: value,
		});
	};

	return (
		<Dialog
			onClose={ToggleDialogClick}
			open={openDialog}
			maxWidth="md"
			scroll="body"
		>
			<DialogTitle onClose={ToggleDialogClick}>
				Cadastro de Usuários
			</DialogTitle>
			<DialogContent dividers className={dialogLoading ? className : null}>
				{dialogLoading ? (
					<CircularProgress />
				) : (
					<form noValidate>
						<Grid container spacing={2}>
							{fieldsInsert.map((field) => {
								return (
									<Grid item xs={6} md={6} sm={6} lg={6} key={field.id}>
										<TextField
											variant="filled"
											margin="normal"
											value={usuario[[field.id]] ? usuario[[field.id]] : ""}
											id={field.id}
											label={field.label}
											name={field.id}
											type={field.type}
											fullWidth
											required={field.required ? true : false}
											autoFocus={field.autofocus ? true : false}
											onChange={handleChange}
											error={errors[field.id] ? true : false}
											helperText={errors[field.id]}
										/>
									</Grid>
								);
							})}
							{/** Seleciona o role_ID */}
							<Grid item xs={6} md={6} sm={6} lg={6}>
								<Select
									onChange={handleChange}
									id="role_id"
									name="role_id"
									fullWidth
									className="MuiFilledInput-input"
									value={usuario.role_id ? usuario.role_id : ""}
								>
									<MenuItem value="" selected>
										<em>Selecione um Perfil</em>
									</MenuItem>
									<MenuItem value={1}>Administrador</MenuItem>
									<MenuItem value={2}>Analista</MenuItem>
									<MenuItem value={3}>Técnico</MenuItem>
								</Select>
							</Grid>
						</Grid>
					</form>
				)}
			</DialogContent>
			<DialogActions>
				<SaveButton handleSubmit={handleInsertSubmit} />
			</DialogActions>
		</Dialog>
	);
};

export default OpenDialogType;
