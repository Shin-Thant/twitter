const regex = /\s/;

export default function checkInputSpaces(input: string) {
	return !regex.test(input);
}
