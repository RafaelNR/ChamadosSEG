import React from "react";
import { Switch, Router, Route, Redirect, withRouter } from "react-router-dom";
import { makeStyles, Container } from "@material-ui/core";
import history from "../Utils/history";
import Main from "../Template/Main";
//Pages
import Home from "../Pages/Home";
import Atividades from "../Pages/Atividades/";
import AtividadesCreate from "../Pages/Atividades/create";
import Clientes from "../Pages/Clientes";
import Categorias from "../Pages/Categorias";
import Tarefas from "../Pages/Tarefas";
import Usuarios from "../Pages/Usuarios";
import Modelos from "../Pages/Modelos";
import Perfil from "../Pages/Perfil";

const useStyles = makeStyles(() => ({
	container: {
		backgroundColor: "#f0f0f0f0",
		paddingTop: "30px",
		paddingBottom: "30px",
	},
}));

function Routes() {
	const classes = useStyles();


	return (
		<Main>
			<Container maxWidth={false} className={classes.container}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/clientes" component={Clientes} />
					<Route path="/categorias" component={Categorias} />
					<Route path="/home" component={Home} />
					<Route path="/usuarios" component={Usuarios} />
					<Route path="/modelos" component={Modelos} />
					<Route path="/perfil" component={Perfil} />

					//&
					<Route path="/atividades" exact component={Atividades} />
					<Route path="/atividades/create" exact component={AtividadesCreate} />

					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</Container>
		</Main>
	);
}

export default React.memo(withRouter(Routes));
