import { useState } from "react";

const ImgurUpload = () => {
	const [image, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [imageUrl, setImageUrl] = useState(null);
	const [deleteHash, setDeleteHash] = useState(null);

	const CLIENT_ID = "0ffbf2acef40fde";

	const handleFileChange = (event) => {
		setImage(event.target.files[0]); // Gem den valgte fil
	};

	const handleUpload = async () => {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			// Opret en forhåndsvisning af billedet
			const reader = new FileReader();
			reader.onloadend = () => setPreview(reader.result);
			reader.readAsDataURL(file);
		}
		if (!image) {
			alert("Vælg et billede først!");
			return;
		}

		setUploading(true);

		const formData = new FormData();
		formData.append("image", image);
		console.log(formData);

		try {
			const response = await fetch("https://api.imgur.com/3/image", {
				method: "POST",
				headers: {
					Authorization: `Client-ID ${CLIENT_ID}`, // Client-ID bruges til anonym upload
				},
				body: formData,
			});

			const data = await response.json();

			if (data.success) {
				setImageUrl(data.data.link);
				setDeleteHash(data.data.deletehash);
			} else {
				console.error("Upload fejl:", data);
			}
		} catch (error) {
			console.error("Fejl under upload:", error);
		}

		setUploading(false);
	};

	return (
		<div>
			<h2>Upload billede til Imgur online</h2>
			<input type='file' onChange={handleFileChange} />
			<button onClick={handleUpload} disabled={uploading}>
				{uploading ? "Uploader..." : "Upload"}
			</button>

			{imageUrl && (
				<div>
					<p>✅ Billede uploaded:</p>
					<img src={imageUrl} alt='Uploaded' width='200' />
					<p>
						🔗 Link:{" "}
						<a href={imageUrl} target='_blank' rel='noopener noreferrer'>
							{imageUrl}
						</a>
					</p>
					<p>🗑️ DeleteHash: {deleteHash}</p>
				</div>
			)}
		</div>
	);
};

export default ImgurUpload;
