import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
	EditIconButton,
	DeleteIconButton,
	DisabledIconButton,
	ActivedIconButton,
} from "../Buttons/Icons";

const Actions = (props) => {
	const { buttons } = props;

	const renderButtons = (props) => {
		return buttons.map((button, index) => {
			switch (button) {
				case "edit":
					return (
						<Grid item md={3} key={index}>
							<EditIconButton {...props} />
						</Grid>
					);

				case "delete":
					return (
						<Grid item md={3} key={index}>
							<DeleteIconButton {...props} />
						</Grid>
					);

				case "disable":
					return (
						<Grid item md={3} key={index}>
							{props.disabled === 0 ? (
								<ActivedIconButton {...props} />
							) : (
								<DisabledIconButton {...props} />
							)}
						</Grid>
					);

				default:
					return;
			}
		});
	};

	return (
		<Grid container spacing={0}>
			{renderButtons(props)}
		</Grid>
	);
};

Actions.propTypes = {
	props: PropTypes.object.isRequired,
};

Actions.defaultProps = {
	props: <p>Sem valor, pois carrega o ADD.</p>,
};

export default React.memo(Actions);
