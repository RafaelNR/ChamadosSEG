const BodyParser = require("body-parser");
const Helmet = require("helmet");
const Cors = require("cors");
const Morgan = require("morgan");

module.exports = (App) => {
	// Helmet
	App.use(Helmet());

	// Cors
	App.use(Cors({ origin: "http://localhost:3000" }));

	// BodyParser
	App.use(BodyParser.urlencoded({ extended: true }));
	App.use(
		BodyParser.json({
			inflate: true,
			limit: "100kb",
			reviver: null,
			strict: true,
			type: "application/json",
			verify: undefined,
		})
	);

	// Morgan
	if (process.env.NODE_ENV != "test") {
		App.use(
			Morgan((tokens, req, res) => {
				return [
					tokens.method(req, res),
					tokens.url(req, res),
					tokens.status(req, res),
					tokens.res(req, res, "content-length"),
					"len -",
					tokens["response-time"](req, res),
					"ms",
				].join(" ");
			})
		);
	}
};
