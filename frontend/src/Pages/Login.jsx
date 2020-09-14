import React, { useState, useContext } from "react";
// UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
// Context
import { AuthContext } from "../Context/Auth";

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

	// Pega a função logar dentro do Context;
	const { handleLogin } = useContext(AuthContext);

	const [user, setUser] = useState(null);
	const [passwd, setPasswd] = useState(null);

	function handleChange(e) {
		const el = e.target.name;
		if (el === "user") setUser(e.target.value);
		if (el === "passwd") setPasswd(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		handleLogin(user, passwd);
	}

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
