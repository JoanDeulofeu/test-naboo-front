// Get string & return the same string with the first letter capitalize
// Example: "this is a test" → "This is a test"
const capitalize = (string: string | undefined | null): string => {
	if (!string) return "";
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export default capitalize;
