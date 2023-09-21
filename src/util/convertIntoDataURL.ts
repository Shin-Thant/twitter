export async function convertIntoDataURL(file: File): Promise<string> {
	const reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onload = () => {
			if (typeof reader.result !== "string") {
				return reject(new Error("err"));
			}
			return resolve(reader.result);
		};
		reader.readAsDataURL(file);
	});
}
