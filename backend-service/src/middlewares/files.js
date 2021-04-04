const path = require("path");

const pahtStatic = path.join(__dirname, "..", "..", "static");
const pathUploads = path.join(__dirname, "..", "..", "tmp", "uploads");

module.exports = (App, Express) => {
	App.use(
		"/static",
		Express.static(
			pahtStatic
		)
	);

  App.use(
		"/tmp/uploads",
		Express.static(
			pathUploads,
			{
				extensions: ["pdf"],
			}
		)
	);

};
