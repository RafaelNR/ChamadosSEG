import React from "react";
import {
	DialogContent,
	Grid,
	TextField,
	CircularProgress,
	Select,
	MenuItem,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Fields from "../../Store/UsuariosFields";
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

const FormInsert = () => {
	const { setLoading } = useDialog();
  const { usuario, errors, handleChange, clearUsuario } = useUsuarios();
  
  React.useEffect(() => {
    clearUsuario();
    setLoading(false);
  }, []);
  
  return (
		<form noValidate>
      <Grid container spacing={2}>     
				{Fields.Insert.map((field) => {
					return (
						<Grid
							item
							xs={field.media && field.media.xs ? field.media.xs : 6}
							lg={field.media && field.media.lg ? field.media.lg : 6}
							md={field.media && field.media.md ? field.media.md : 12}
							sm={field.media && field.media.sm ? field.media.sm : 12}
							key={field.id}
						>
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
	); 
};

/**
 * Dialog para fazer update do usuário
 */
const FormUpdate = () => {
	const classes = useStyles();
	const Dialog = useDialog();
	const { usuario, errors, handleChange, apiLoading } = useUsuarios();
  
	React.useEffect(() => {
		if (usuario && usuario.id && !apiLoading) {
			Dialog.setLoading(false);
		}
		// eslint-disable-next-line
  }, [apiLoading, usuario]);
  
  return (
		<DialogContent
			dividers
			className={Dialog.loading ? classes.dialogLoader : null}
		>
			{Dialog.loading ? (
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
						{Fields.Update.map((field) => {
							return (
								<Grid
									item
									xs={field.media && field.media.xs ? field.media.xs : 6}
									lg={field.media && field.media.lg ? field.media.lg : 6}
									md={field.media && field.media.md ? field.media.md : 12}
									sm={field.media && field.media.sm ? field.media.sm : 12}
									key={field.id}
								>
									<TextField
										variant="filled"
										margin="normal"
										value={
											usuario[[field.id]]
												? usuario[[field.id]]
												: field.value
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

export { FormInsert, FormUpdate };
