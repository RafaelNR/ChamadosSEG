import React from "react";
import LoginRoute from "./LoginRoute";
import AppRoute from "./AppRoute";
import useAuth from "../Context/AuthContext";

//* HOOKS
import useUser from '../Hooks/useUser';

export default function Routes() {
  const { logado } = useAuth();
  const { roleID } = useUser();
  
  return logado ? <AppRoute roleID={roleID} /> : <LoginRoute />;
}
