export default (rows, order, orderBy, page, rowsPerPage) => {
	if (rows.length > 0) {
		return stableSort(rows, getComparator(order, orderBy)).slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
		);
	}
	return [];
};

/**
 * Compra objetos da tabela pela orderby
 * @param {object} a
 * @param {object} b
 * @param {string} orderBy
 */
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

/**
 *
 * @param {string} order
 * @param {string} orderBy
 */
function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 *
 * @param {array} rows (Array com todas as linhas da tabela)
 * @param {function} comparator (getComparator)
 */
function stableSort(rows, comparator) {
	// cria um array com o objeto da linha e seu index
	const stabilizedThis = rows.map((row, index) => [row, index]);

	// Compara array A com array B, usando função de callback.
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	// Retorna o objeto ordenado
	return stabilizedThis.map((el) => el[0]);
}
