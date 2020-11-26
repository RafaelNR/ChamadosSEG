import React from "react";
import CategoriasTab from "./Categorias.Tab";

import { LoadingProvider } from "../../Context/LoadingContext";

export default () => {
  return (
    <LoadingProvider>
      <CategoriasTab />
    </LoadingProvider>
  );
};
