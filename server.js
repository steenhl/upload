const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 5000;
const localHostUpload = `http://localhost:${PORT}/src/img/upload`;

const app = express();
app.use(cors());

// Opret mappen hvis den ikke findes
const uploadPath = "./src/img/upload";
if (!fs.existsSync(uploadPath)) {
	fs.mkdirSync(uploadPath, { recursive: true });
}

// Konfigurer Multer til at gemme filer i den nye upload-mappe
const storage = multer.diskStorage({
	destination: uploadPath,
	filename: (req, file, cb) => {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "Ingen fil modtaget" });
	}
	res.json({ url: `${localHostUpload}/${req.file.filename}` });
});

// Gør de uploadede filer tilgængelige via URL
app.use("/src/img/upload", express.static(uploadPath));

app.listen(PORT, () => console.log(`✅ Server kører på http://localhost:${PORT}`));
