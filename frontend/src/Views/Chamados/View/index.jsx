import React from 'react';

//** COMPONENTS
import Chamado from './ChamadoView';
import Acompanhamentos from '../Acompanhamentos';

//* PROVIDER
import { ChamadosProvider } from '../../../Context/ChamadosContext';
import { AcompanhamentosChamadoProvider } from '../../../Context/AcmChamadoContext';
import { LoadingProvider } from '../../../Context/LoadingContext';

export default () => {
  return (
    <LoadingProvider>
      <ChamadosProvider>
        <Chamado />
        <AcompanhamentosChamadoProvider>
          <Acompanhamentos />
        </AcompanhamentosChamadoProvider>
      </ChamadosProvider>
    </LoadingProvider>
  );
};
