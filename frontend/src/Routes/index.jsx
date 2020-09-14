import React, { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import LoginRoute from "./LoginRoute";
import AppRoute from "./AppRoute";

export default function Routes() {
	const { logado } = useContext(AuthContext);
	return logado ? <AppRoute /> : <LoginRoute />;
}
