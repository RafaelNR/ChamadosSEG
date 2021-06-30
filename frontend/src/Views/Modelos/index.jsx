import React from 'react';

//* COMPONENTES
import Paper from '../../Components/Paper/Paper';
import Table from './Modelos.Table';
import Dialog from './Modelos.Dialog';

//* CONTEXT
import { ModelosChamadoProvider } from '../../Context/ModelosChamadoContext';
import { LoadingProvider } from '../../Context/LoadingContext';

export default () => {
  return (
    <LoadingProvider>
      <ModelosChamadoProvider>
        <Paper Render={Table} RenderDialog={Dialog} />
      </ModelosChamadoProvider>
    </LoadingProvider>
  );
};
