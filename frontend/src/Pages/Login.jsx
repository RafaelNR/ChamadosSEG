import React, { useState, useCallback } from "react";
//* COMPONENTES
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Paper,
	Grid,
	Typography,
	makeStyles,
} from '@material-ui/core'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
//* CONTEXT
import useAuth from "../Context/AuthContext";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(https://source.unsplash.com/random)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "red",
	},
}));

export default function SignInSide() {
	const classes = useStyles();
	const { handleLogin } = useAuth();

	const [user, setUser] = useState(null);
	const [passwd, setPasswd] = useState(null);

	const handleChange = useCallback((e) => {
		const el = e.target.name;
		if (el === "user") setUser(e.target.value);
		if (el === "passwd") setPasswd(e.target.value);
	}, []);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		handleLogin(user, passwd);
	}, [user,passwd,handleLogin]);

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						SYS Chamados
					</Typography>
					<form
						className={classes.form}
						onSubmit={(e) => handleSubmit(e)}
						noValidate
					>
						<TextField
							variant="outlined"
							margin="normal"
							id="username"
							label="Username"
							name="user"
							autoComplete="user"
							fullWidth
							required
							autoFocus
							onChange={(e) => handleChange(e)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							id="password"
							label="Senha"
							type="password"
							name="passwd"
							autoComplete="current-password"
							fullWidth
							required
							onChange={(e) => handleChange(e)}
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Lembrar-me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Perdeu sua senha?
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
