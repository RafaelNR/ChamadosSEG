const path = require("path");

const pahtImages = path.join(__dirname, "..", "..", "public", "uploads", "images");
const pathChamados = path.join(__dirname, "..", "..", "public", "uploads", "chamados");
// const pathFiles = path.join(__dirname, "..", "..", "public", "uploads", "files");


module.exports = (App, Express) => {
	App.use(
		"/images/users",
		Express.static(
			pahtImages,
			{
				extensions: ["png", "jpg", "webp", "jpeg"],
			}
		)
	);
	App.use(
		"/files/chamados",
		Express.static(pathChamados, {
			extensions: ["png", "jpg", "webp", "jpeg", "pdf"],
		})
	);
};
