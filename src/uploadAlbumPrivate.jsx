const uploadToPrivateAlbum = async (imageFile, albumId) => {
	const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN"; // Fåes via OAuth

	const formData = new FormData();
	formData.append("image", imageFile);
	formData.append("album", albumId); // Binder billedet til albummet

	try {
		const response = await fetch("https://api.imgur.com/3/image", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${ACCESS_TOKEN}`, // OAuth kræves
			},
			body: formData,
		});

		const data = await response.json();
		console.log("Uploadet til privat album:", data);
	} catch (error) {
		console.error("Fejl ved upload:", error);
	}
};
