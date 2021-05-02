import React from "react";
import Paper from "../../Components/Paper/PaperNoMargin";
import Table from "./Atividades.Table";
import Filtro from './Filtro';

import { LoadingProvider } from "../../Context/LoadingContext";
import { AtividadesProvider } from "../../Context/AtividadesContext";

export default () => {
  return (
    <LoadingProvider>
      <AtividadesProvider>
        <Filtro />
        <Paper Render={Table} />
      </AtividadesProvider>
    </LoadingProvider>
  );
};
