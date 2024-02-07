export const BASE_URL =
	import.meta.env.VITE_ENV === "production"
		? "https://twitter-api-hj4f.onrender.com"
		: "http://localhost:3500";

export const URL = BASE_URL + "/api/v1";

export const IMAGE_URL = `${URL}/photos` as const;
