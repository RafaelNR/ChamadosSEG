import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { makeStyles, Container } from "@material-ui/core";
import Main from "../Template/Main";

<<<<<<< HEAD
//Pages
import Home from "../Pages/Home/";
import Atividades from "../Pages/Atividades/";
import AtividadesCreate from "../Pages/Atividades/Create/";
import AtividadesEdit from "../Pages/Atividades/Edit/";
import AtividadesView from "../Pages/Atividades/View/";
import Clientes from "../Pages/Clientes/";
import Categorias from "../Pages/Categorias/";
import Chamados from "../Pages/Chamados/";
import Usuarios from "../Pages/Usuarios/";
import Modelos from "../Pages/Modelos";
import Perfil from "../Pages/Perfil/";
import Logs from "../Pages/Logs/";
import Relatorios from '../Pages/Relatorios/';
import RAtividades from '../Pages/Relatorios/Atividades';
import RMyAtividades from '../Pages/Relatorios/Atividades/my';
=======
//Views
import Home from "../Views/Home/";
import Atividades from "../Views/Atividades/";
import AtividadesCreate from "../Views/Atividades/Create/";
import AtividadesEdit from "../Views/Atividades/Edit/";
import AtividadesView from "../Views/Atividades/View/";
import Clientes from "../Views/Clientes/";
import Categorias from "../Views/Categorias/";
import Usuarios from "../Views/Usuarios";
import Modelos from "../Views/Modelos";
import Perfil from "../Views/Perfil/";
import Logs from "../Views/Logs/";
import Relatorios from '../Views/Relatorios/';
import RAtividades from '../Views/Relatorios/Atividades';
import RMyAtividades from '../Views/Relatorios/Atividades/my';
>>>>>>> be2e80bfa532e0b6c3fc71040b4bada62fdbfb22

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
					<Route path="/" exact component={Home} />
					<Route path="/perfil" exact component={Perfil} />

					<Route path="/relatorios" exact component={Relatorios} />

					<Route path="/atividades" exact component={Atividades} />
					<Route path="/atividades/create" exact component={AtividadesCreate} />
					<Route path="/atividades/edit/:ticket" component={AtividadesEdit} />
					<Route path="/atividades/view/:ticket" component={AtividadesView} />

					<Route path="/chamados" component={Chamados} />

					<TecnicoRoute path="/relatorios/atividades/my" exact component={RMyAtividades} role_id={roleID} redirect="/relatorios/atividades" />

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
      {role_id ? (
        role_id === 3 ? (
          <Route {...props} />
        ) : (
          <Redirect to={props.redirect ? props.redirect : '/'} />
        )
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}


export default React.memo(withRouter(Routes));
