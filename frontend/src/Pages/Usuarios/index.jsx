import React from "react";

//* COMPONENTES
import Paper from "../../Components/Paper/Paper";
import UsuariosTable from "./Usuarios.Table";
import UsuariosDialog from "./Usuarios.Dialog";

//* CONTEXT
import { UsuariosProvider } from "../../Context/UsuariosContext";
import { LoadingProvider } from "../../Context/LoadingContext";

export default () => {
  return (
    <LoadingProvider>
      <UsuariosProvider>
        <Paper Render={UsuariosTable} RenderDialog={UsuariosDialog} />
      </UsuariosProvider>
    </LoadingProvider>
  );
};
