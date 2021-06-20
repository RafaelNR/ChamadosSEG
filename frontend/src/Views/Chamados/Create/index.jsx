import React from 'react';

//** COMPONENTS
import Chamado from './ChamadoCreate';

//* PROVIDER
import { ChamadosProvider } from '../../../Context/ChamadosContext';
import { LoadingProvider } from '../../../Context/LoadingContext';

export default () => {
  return (
    <LoadingProvider>
      <ChamadosProvider>
        <Chamado />
      </ChamadosProvider>
    </LoadingProvider>
  );
};
