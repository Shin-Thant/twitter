export const URL =
	import.meta.env.VITE_ENV === "production"
		? "https://twitter-api-hj4f.onrender.com/api/v1"
		: "http://localhost:3500/api/v1";

export const IMAGE_URL = `${URL}/photos` as const;
