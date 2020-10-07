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
import Fields from "../../Store/ClientesFields";
import useClientes from "../../Context/ClientesContext";
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
	const { cliente, errors, handleChange, clearCliente } = useClientes();

	React.useEffect(() => {
		clearCliente();
		setLoading(false);
	},[])

	return (
		<DialogContent dividers>
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
									value={cliente[[field.id]] ? cliente[[field.id]] : ""}
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
				</Grid>
			</form>
		</DialogContent>
	);
};

/**
 * Dialog para fazer update do usuário
 */
const FormUpdate = () => {
	const classes = useStyles();
	const Dialog = useDialog();
	const { cliente, errors, handleChange, apiLoading } = useClientes();

	React.useEffect(() => {
		if (cliente && cliente.id && !apiLoading) {
			Dialog.setLoading(false);
		}
		// eslint-disable-next-line
	}, [apiLoading, cliente]);


	return (
		<DialogContent dividers className={Dialog.loading ? classes.dialogLoader : null}>
			{Dialog.loading ? (
				<CircularProgress />
			) : (
				<form noValidate>
					<TextField
						name="id"
						id="id"
						value={cliente.id}
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
											cliente[[field.id]] ? cliente[[field.id]] : field.value
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
					</Grid>
				</form>
			)}
		</DialogContent>
	);
};

export { FormInsert, FormUpdate };
