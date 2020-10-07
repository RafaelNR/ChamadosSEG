import React, { useContext } from "react";
import LoginRoute from "./LoginRoute";
import AppRoute from "./AppRoute";
import useAuth from "../Context/AuthContext";

export default function Routes() {
	const { logado } = useAuth();
	return logado ? <AppRoute /> : <LoginRoute />;
}
