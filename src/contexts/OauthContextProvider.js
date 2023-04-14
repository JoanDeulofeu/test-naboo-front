"use client";

import PropTypes from "prop-types";
import * as React from "react";

import { useApi } from "./ApiContextProvider";

const OauthContext = React.createContext();

/**
 * This context provider allows to manage Oauth & connection state
 */
const OauthContextProvider = ({ children }) => {
	const { api } = useApi();

	const [isConnected, setIsConnected] = React.useState(false);
	const [accessToken, setAccessToken] = React.useState();
	const [refreshToken, setRefreshToken] = React.useState();

	// Create a user account on firebase and on database
	// Return true if it is well done
	const createAccount = React.useCallback(
		async (credentials) => {
			try {
				const accountData = await api(`/oauth`, "post", credentials);
				setAccessToken(accountData.accessToken);
				localStorage.setItem("accessToken", accountData.accessToken);
				setRefreshToken(accountData.refreshToken);
				setIsConnected(true);
				return true;
			} catch (e) {
				return false;
			}
		},
		[api]
	);

	// TODO Replace accessToken by refreshToken in LocalStorage
	// & implement au useEffect to refresh the token when they are outdated
	React.useEffect(() => {
		const localAccessToken = localStorage.getItem("accessToken");
		if (localAccessToken) {
			setAccessToken(localAccessToken);
			setIsConnected(true);
		}
	}, []);

	const value = { isConnected, createAccount };

	return (
		<OauthContext.Provider value={value}>{children}</OauthContext.Provider>
	);
};

OauthContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export const useOauth = () => React.useContext(OauthContext);

export default OauthContextProvider;
