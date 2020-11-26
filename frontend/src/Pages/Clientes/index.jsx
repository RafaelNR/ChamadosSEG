import React from "react";

//* COMPONENTES
import Paper from "../../Components/Paper/Paper";
import ClientesDialog from "./Clientes.Dialog";
import ClientesTable from "./Clientes.Table";

//* PROVIDER
import { ClientesProvider } from "../../Context/ClientesContext";
import { LoadingProvider } from "../../Context/LoadingContext";

export default () => {
  return (
    <LoadingProvider>
      <ClientesProvider>
        <Paper Render={ClientesTable} RenderDialog={ClientesDialog} />
      </ClientesProvider>
    </LoadingProvider>
  );
};
