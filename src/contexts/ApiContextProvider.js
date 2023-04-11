"use client";

import PropTypes from "prop-types";
import * as React from "react";
const axios = require("axios");

const ApiContext = React.createContext();

/**
 * This context provider allows to manage api & connection state
 */
const ApiContextProvider = ({ children }) => {
	const api = React.useCallback(
		async (urlPath, method = "get", data, headers = {}) => {
			const url = `${"http://localhost:8080"}${urlPath}`;

			// ----- LOG to test. Remove it ! -----
			console.log("-*- API (args before call)", {
				urlPath,
				url,
				method,
				data,
				env: process.env,
				headers,
			});

			return await axios({
				method,
				url,
				data,
				headers,
			})
				.then((response) => {
					console.log("-*- API (response) ", response);
					return response;
				})
				.catch(function (error) {
					console.log("-*- API (error) ", error);
				});
		},
		[]
	);

	const value = {
		api,
	};

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export const useApi = () => React.useContext(ApiContext);

export default ApiContextProvider;
