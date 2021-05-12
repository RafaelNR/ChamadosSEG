import React, { createContext, useState, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { uniquesObjects } from '../Utils/functions'

const SearchContext = createContext({});

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  /**
   * Manipula o search da pesquisa, ativando o useEffect
   */
  const handleChangeSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  const handleSearch = useCallback(
    (keys, Dados) => {
      if (search) {
        let results = [];
        const s = search.toLowerCase();
          keys.forEach((key) => {
            const result = Dados.filter((Dado) => {
              if (Dado[key]) {
                return Dado[key].toLowerCase().includes(s) && Dado;
              }
            });
            results = [...results, ...result];
          });
        return setSearchResults(uniquesObjects(results));
      }
    },
    [search]
  );

  /**
   * Provider
   */
  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        setSearchResults,
        handleSearch,
        handleChangeSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default function useSearch() {
  return useContext(SearchContext);
}

export { SearchContext, SearchProvider };
