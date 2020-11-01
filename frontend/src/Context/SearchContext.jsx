import React, { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext({});

const SearchProvider = ({ children }) => {
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	/**
	 * Manipula o search da pesquisa, ativando o useEffect
	 */
	const handleChangeSearch = useCallback((event) => {
		if (event.target.value.length >= 3) setSearch(event.target.value);
	},[]);

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
				handleChangeSearch,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

SearchProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default function useSearch() {
	return useContext(SearchContext);
}

export { SearchContext, SearchProvider };
