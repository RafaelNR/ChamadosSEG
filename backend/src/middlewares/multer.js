const multer = require('multer');
const path = require("path");
const fs = require("fs");

const storageImage = multer.diskStorage({
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

const storageChamado = multer.diskStorage({
	destination: (req, file, cb) => {
		const caminho = "public/uploads/chamados/";
		fs.mkdirSync(caminho, { recursive: true });
		cb(null, caminho);
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const name = path.basename(file.originalname, ext);
		cb(null, name + ext);
	},
});

const fileFilterImage = (req, file, cb) => {
	const isAccepted = ["image/png", "image/jpg", "image/jpeg", ''].find(
		(formatoAceito) => formatoAceito == file.mimetype
	);

	if (isAccepted) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const fileFilterChamado = (req, file, cb) => {
	const isAccepted = ["image/png", "image/jpg", "image/jpeg", "image/webq",'application/pdf'].find(
		(formatoAceito) => formatoAceito == file.mimetype
	);

	if (isAccepted) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const uploadImage = multer({
	storage: storageImage,
	fileFilter: fileFilterImage,
	limits: { fileSize: "30000000" },
});

const uploadChamado = multer({
	storage: storageChamado,
	fileFilter: fileFilterChamado,
	limits: { fileSize: "10000000" },
});

module.exports = {
	uploadImage,
	uploadChamado
};