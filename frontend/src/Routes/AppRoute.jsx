import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { makeStyles, Container } from "@material-ui/core";
import Main from "../Template/Main";

//Pages
import Home from "../Pages/Home";
import Atividades from "../Pages/Atividades/";
import AtividadesCreate from "../Pages/Atividades/Create/";
import AtividadesEdit from "../Pages/Atividades/Edit/";
import AtividadesView from "../Pages/Atividades/View/";
import Clientes from "../Pages/Clientes/";
import Categorias from "../Pages/Categorias/";
import Usuarios from "../Pages/Usuarios/";
import Modelos from "../Pages/Modelos";
import Perfil from "../Pages/Perfil/";
import Logs from "../Pages/Logs/";
import Relatorios from '../Pages/Relatorios/';
import RAtividades from '../Pages/Relatorios/Atividades';
import RMyAtividades from '../Pages/Relatorios/Atividades/my';

import useAuth from '../Context/AuthContext';
import useUser from '../Hooks/useUser';

const useStyles = makeStyles(() => ({
	container: {
		paddingTop: "30px",
		paddingBottom: "30px",
	},
}));

function Routes() {
	const classes = useStyles();
	const { handleAuth } = useAuth();
	const { roleID } = useUser();

	React.useEffect(() => {
		handleAuth();
	})

	return (
		<Main>
			<Container maxWidth={false} className={classes.container}>
				<Switch>
					<Route exact path="/" exact component={Home} />
					<Route path="/perfil" exact component={Perfil} />

					<Route path="/relatorios" exact component={Relatorios} />
					<TecnicoRoute path="/relatorios/atividades/my" exact component={RMyAtividades} redirect="/relatorios/atividades" />

					<Route path="/atividades" exact component={Atividades} />
					<Route path="/atividades/create" exact component={AtividadesCreate} />
					<Route path="/atividades/edit/:ticket" component={AtividadesEdit} />
					<Route path="/atividades/view/:ticket" component={AtividadesView} />

					<AnalistaRoute path="/categorias" exact component={Categorias} role_id={roleID} />
					<AnalistaRoute path="/usuarios" exact component={Usuarios} role_id={roleID} />
					<AnalistaRoute path="/logs" exact component={Logs} role_id={roleID} />
					<AnalistaRoute path="/relatorios/atividades" exact component={RAtividades} role_id={roleID} />

					<AdminRoute path="/clientes" exact component={Clientes} role_id={roleID} />
					<AdminRoute path="/modelos" exact component={Modelos} role_id={roleID} />

					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</Container>
		</Main>
	);
}


const AdminRoute = (props) => {
	const { role_id } = props;
	return (
		<>
		{
			role_id === 1 ? <Route {...props} /> : <Redirect to='/' />
		}
		</>
	)

}

const AnalistaRoute = (props) => {
	const { role_id } = props;
	return (
		<>
		{
			role_id <= 2 ? <Route {...props} /> : <Redirect to='/' />
		}
		</>
	)
}


const TecnicoRoute = (props) => {
	const { role_id } = props;
	return (
		<>
			{
				role_id === 3 ? <Route {...props} /> : <Redirect to={props.redirect ? props.redirect : '/'} />
			}
		</>
	)
}


export default React.memo(withRouter(Routes));
