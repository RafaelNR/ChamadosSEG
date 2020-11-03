import React from "react";
import { LoadingProvider } from "../../Context/LoadingContext";
import { AtividadesProvider } from "../../Context/AtividadesContext";
import Paper from "../../Components/Paper/PaperNoDialog";
import Table from '../../Components/Tables/Atividades'

export default () => {
	return (
		<LoadingProvider>
			<AtividadesProvider>
				<Paper Render={Table}/>
			</AtividadesProvider>
		</LoadingProvider>
	);
};

