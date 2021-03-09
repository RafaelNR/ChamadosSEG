import React, { createContext, useEffect, useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types';
import * as Crud from '../Api/Crud';

const ChamadosContext = createContext({});

const ChamadosProvider = ({ children }) => {

  return (
    <ChamadosContext.Provider
      value={{}}
    >
      {children}
    </ChamadosContext.Provider>
  );
};

ChamadosProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default function useAuth() {
  return useContext(ChamadosContext);
}

export { ChamadosContext, ChamadosProvider };



