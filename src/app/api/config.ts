const URL =
	import.meta.env.VITE_ENV === "production"
		? "https://twitter-api-hj4f.onrender.com/api/v1"
		: "http://localhost:3500/api/v1";
export default URL;
