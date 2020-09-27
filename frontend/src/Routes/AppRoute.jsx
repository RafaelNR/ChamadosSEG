import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Main from "../Template/Main";
//Pages
import Home from "../Pages/Home";
import Atividades from "../Pages/Atividades";
import Clientes from "../Pages/Clientes";
import Categorias from "../Pages/Categorias";
import Tarefas from "../Pages/Tarefas";
import Usuarios from "../Pages/Usuarios";

const useStyles = makeStyles(() => ({
	container: {
		backgroundColor: "#f0f0f0f0",
		paddingTop: "30px",
		paddingBottom: "1px",
	},
}));

function Routes() {
	const classes = useStyles();
	return (
		<Main>
			<Container maxWidth={false} className={classes.container}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/atividades" component={Atividades} />
					<Route exact path="/clientes" component={Clientes} />
					<Route exact path="/categorias" component={Categorias} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/tarefas" component={Tarefas} />
					<Route exact path="/usuarios" component={Usuarios} />
					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</Container>
		</Main>
	);
}

export default withRouter(Routes);
