import React, { useState } from "react";
// import imgur from "imgur";
import { ImgurClient } from "imgur";

// import imgur from "imgur";

// const ImgurClient = imgur.ImgurClient;

// const { ImgurClient } = require("imgur");

// const CLIENT_ID = "0ffbf2acef40fde";

const ImgurUploader = () => {
	// const [image, setImage] = useState(null);
	// const [url, setUrl] = useState("");

	// const handleFileChange = (event) => {
	// 	const file = event.target.files[0];
	// 	if (file) {
	// 		setImage(file);
	// 	}
	// };

	// const uploadToImgur = async () => {
	// 	if (!image) return alert("Vælg en fil først!");
	// 	try {
	// 		imgur.setClientId("CLIENT_ID"); // Erstat med din egen Client ID
	// 		const response = await imgur.uploadFile(image);
	// 		setUrl(response.link);
	// 		alert("Billede uploadet!");
	// 	} catch (error) {
	// 		console.error("Upload fejlede:", error);
	// 		alert("Upload mislykkedes!");
	// 	}
	// };

	return (
		<div>
			{/* <input type='file' onChange={handleFileChange} />
			<button onClick={uploadToImgur}>Upload til Imgur</button>
			{url && (
				<div>
					<p>Uploaded billede:</p>
					<img src={url} alt='Uploaded' style={{ width: "200px" }} />
				</div>
			)} */}
		</div>
	);
};

export default ImgurUploader;
