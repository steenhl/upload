import { useState } from "react";
const pathLocalHost = "http://localhost:5000/upload";

export const ImageUpload = () => {
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
		const formData = new FormData();
		formData.append("file", image);

		try {
			const response = await fetch(pathLocalHost, {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			let dataUrl = data.url;
			let dataUrlArray = dataUrl.split("/");
			let imgName = dataUrlArray.at(-1);
			console.log(imgName);
			console.log("URL:", data.url);
		} catch (error) {
			console.error("Fejl ved upload:", error);
		} finally {
			setUploading(false);
		}
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
