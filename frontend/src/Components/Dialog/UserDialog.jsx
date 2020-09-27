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
	Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { SaveButton, CancelButton } from "../Buttons/Index";
import DialogTitle from "./headDialog";
import { UsuariosContext } from "../../Context/UsuariosContext";
import { DialogContext } from "../../Context/DialogContext";
import { fieldsInsert, fieldsUpdate } from "../../Store/UserFields";

const useStyles = makeStyles(() => ({
	dialogLoader: {
		width: "800px",
		height: "320px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const DialogType = () => {
	const { openDialog, ToggleDialogClick } = useContext(DialogContext);
	return (
		<Dialog
			onClose={ToggleDialogClick}
			open={openDialog}
			maxWidth="md"
			scroll="body"
		>
			<SwitchDialog />
		</Dialog>
	);
};

const SwitchDialog = () => {
	const classes = useStyles();
	const { usuario, setUsuario, setErrors, handleSubmit } = useContext(
		UsuariosContext
	);
	const {
		dialogType,
		ToggleDialogClick,
		setOpenDialog,
		setDialogLoading,
	} = useContext(DialogContext);

	/**
	 * Limpa os dados do usuário se mudar de dialog.
	 */
	useEffect(() => {
		setUsuario({});
		setErrors({});
	}, [dialogType, setErrors, setUsuario]);

	/**
	 * Quando envia o form.
	 */
	const clickSubmit = () => {
		handleSubmit(setOpenDialog, setDialogLoading, dialogType);
	};

	const handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;
		setUsuario({
			...usuario,
			[key]: value,
		});
	};

	const switchDialog = () => {
		switch (dialogType) {
			case "insert":
				return (
					<React.Fragment>
						<DialogTitle onClose={ToggleDialogClick}>
							Cadastro de Usuários
						</DialogTitle>
						<InsertUserDialog
							className={classes.dialogLoader}
							handleChange={handleChange}
						/>
						<DialogActions>
							<SaveButton clickSubmit={clickSubmit} />
						</DialogActions>
					</React.Fragment>
				);
			case "update":
				return (
					<React.Fragment>
						<DialogTitle onClose={ToggleDialogClick}>
							Editar de Usuários
						</DialogTitle>
						<UpdateUserDialog
							className={classes.dialogLoader}
							handleChange={handleChange}
						/>
						<DialogActions>
							<SaveButton clickSubmit={clickSubmit} />
						</DialogActions>
					</React.Fragment>
				);
			case "disabled":
				return (
					<React.Fragment>
						<DisabledUserDialog className={classes.dialogLoader} />
						<DialogActions>
							<SaveButton clickSubmit={clickSubmit} />
							<CancelButton clickClose={ToggleDialogClick} />
						</DialogActions>
					</React.Fragment>
				);
			case "actived":
				return (
					<React.Fragment>
						<ActivedUserDialog className={classes.dialogLoader} />
						<DialogActions>
							<SaveButton clickSubmit={clickSubmit} />
							<CancelButton clickClose={ToggleDialogClick} />
						</DialogActions>
					</React.Fragment>
				);
		}
	};

	return <React.Fragment>{switchDialog()}</React.Fragment>;
};

/**
 * Cria os elementos de Dialog para insert do usuário;
 * @param {objeto} className
 */
const InsertUserDialog = ({ className, handleChange }) => {
	const { usuario, errors } = useContext(UsuariosContext);
	const { dialogLoading } = useContext(DialogContext);

	return (
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
	);
};

const UpdateUserDialog = ({ className, handleChange }) => {
	const { usuario, errors } = useContext(UsuariosContext);
	const { dialogLoading, setDialogLoading } = useContext(DialogContext);

	useEffect(() => {
		if (usuario && usuario.id) {
			setDialogLoading(false);
		}
	}, [usuario.id, setDialogLoading]); // 	react-hooks/exhaustive-deps

	useEffect(() => {
		setDialogLoading(true);
	}, [setDialogLoading]);

	return (
		<DialogContent dividers className={dialogLoading ? className : null}>
			{dialogLoading ? (
				<CircularProgress />
			) : (
				<form noValidate>
					<TextField
						name="id"
						id="id"
						value={usuario.id}
						required
						disabled
						style={{ display: "none" }}
						onChange={handleChange}
					/>
					<Grid container spacing={2}>
						{fieldsUpdate.map((field) => {
							return (
								<Grid item xs={6} md={6} sm={6} lg={6} key={field.id}>
									<TextField
										variant="filled"
										margin="normal"
										value={
											usuario[[field.id]] ? usuario[[field.id]] : field.value
										}
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
										disabled={field.disabled ? true : false}
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
	);
};

const DisabledUserDialog = () => {
	const { usuario } = useContext(UsuariosContext);
	return (
		<DialogContent dividers>
			<Typography>
				Quer realmente desabilitar o usuário, {usuario.nome} ?
			</Typography>
		</DialogContent>
	);
};

const ActivedUserDialog = () => {
	const { usuario } = useContext(UsuariosContext);
	return (
		<DialogContent dividers>
			<Typography>
				Quer ativar o usuário, {usuario.nome}, novamente ?
			</Typography>
		</DialogContent>
	);
};

export default DialogType;
