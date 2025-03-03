import { useState } from "react";
const pathImgur = "https://api.imgur.com/3/image";
const CLIENT_ID = "0ffbf2acef40fde";
const CLIENT_SECRET_ID = "78ba803567ee0130af462d62563e4b928606ee6d";

// POST Add Images to an Album (Un-Authed)
// https://api.imgur.com/3/album/{{albumDeleteHash}}/add
// Berlin walls
// Berlinwalls

export const ImageUploadImgur = () => {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [uploading, setUploading] = useState(false);

	// Håndter billedvalg
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			// Opret en forhåndsvisning af billedet
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result);
			reader.readAsDataURL(file);
		}
	};

	// Upload billedet til serveren
	const handleUpload = async () => {
		if (!image) {
			alert("Vælg et billede først.");
			return;
		}

		setUploading(true);
		//
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onloadend = async () => {
			const base64Image = reader.result.split(",")[1];
			// console.log(reader);
			console.log(base64Image);

			const formData = new FormData();
			formData.append("image", base64Image);

			try {
				const response = await fetch(pathImgur, {
					method: "POST",
					headers: {
						// Authorization: clientId,
						Authorization: `Client-ID ${CLIENT_ID}`,
						Accept: "application/json",
					},
					body: formData,
				});

				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.error("Fejl ved upload:", error);
			} finally {
				setUploading(false);
			}
		};
	};
	return (
		<div className='p-4 border rounded-lg w-96 mx-auto text-center'>
			<input type='file' accept='image/*' onChange={handleImageChange} />
			{preview && <img src={preview} alt='Preview' className='mt-2 w-32 h-32 object-cover mx-auto' />}
			<button
				onClick={handleUpload}
				className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'
				disabled={uploading}
			>
				{uploading ? "Uploader..." : "Upload"}
			</button>
		</div>
	);
};
