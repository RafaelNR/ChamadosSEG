import React from "react";

//* COMPONENTES
import LogsTab from './Logs.Tab';

//* PROVIDER
import { LogProvider } from "../../Context/Log.Context";
import { LoadingProvider } from "../../Context/LoadingContext";

export default () => {
  return (
    <LoadingProvider>
      <LogProvider>
        <LogsTab />
      </LogProvider>
    </LoadingProvider>
  );
}


