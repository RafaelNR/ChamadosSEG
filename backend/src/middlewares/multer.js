const multer = require('multer');
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const caminho = "public/uploads/images/";
		fs.mkdirSync(caminho, { recursive: true });
		cb(null, caminho);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const name = path.basename(file.originalname, ext);
		cb(null, Date.now() +'_'+name+ext);
	},
});

const fileFilter = (req, file, cb) => {
	console.log(file)
	const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find(
		(formatoAceito) => formatoAceito == file.mimetype
	);

	if (isAccepted) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });

module.exports = upload