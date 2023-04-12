// Function to get query params
// Found here: https://stackoverflow.com/a/51359101/6877799

const getQueryParams = (query: any) =>
	query
		? (/^[?#]/.test(query) ? query.slice(1) : query)
				.split("&")
				.reduce((params: any, param: any) => {
					let [key, value] = param.split("=");
					params[key] = value
						? decodeURIComponent(value.replace(/\+/g, " "))
						: "";
					return params;
				}, {})
		: {};

export default getQueryParams;
