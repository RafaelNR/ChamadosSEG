import React from "react";

//* COMPONENTES
import Paper from "../../Components/Paper/PaperNoDialog";
import TableLog from './Log.Table';

//* PROVIDER
import { LogProvider } from "../../Context/Log.Context";
import { LoadingProvider } from "../../Context/LoadingContext";

export default () => {
  return (
    <LoadingProvider>
      <LogProvider>
        <Paper Render={TableLog} />
      </LogProvider>
    </LoadingProvider>
  );
}


