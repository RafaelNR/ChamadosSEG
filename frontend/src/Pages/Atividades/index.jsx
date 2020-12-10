import React from "react";
import Paper from "../../Components/Paper/PaperNoDialog";
import Table from "./Atividades.Table";

import { LoadingProvider } from "../../Context/LoadingContext";
import { AtividadesProvider } from "../../Context/AtividadesContext";

export default () => {
  return (
    <LoadingProvider>
      <AtividadesProvider>
        <Paper Render={Table} />
      </AtividadesProvider>
    </LoadingProvider>
  );
};
