import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext({});

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        success,
        setLoading,
        setSuccess
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function useLoading() {
  return useContext(LoadingContext);
}

export { LoadingContext, LoadingProvider };
