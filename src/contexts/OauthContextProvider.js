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
	const [userId, setUserId] = React.useState();
	const [accessToken, setAccessToken] = React.useState();
	const [refreshToken, setRefreshToken] = React.useState();

	// Create a user account on firebase and on database
	// Return true if it is well done
	const createAccount = React.useCallback(
		async (credentials) => {
			try {
				const accountData = await api(`/oauth`, "post", credentials);
				if (!accountData) return false;

				localStorage.setItem("accessToken", accountData.data.accessToken);
				localStorage.setItem("userId", accountData.data.userId);

				setUserId(accountData.data.userId);
				setAccessToken(accountData.data.accessToken);
				setRefreshToken(accountData.data.refreshToken);
				setIsConnected(true);

				return true;
			} catch (e) {
				return false;
			}
		},
		[api]
	);

	// Sign in with credentials
	// Return true if it is well done
	const signIn = React.useCallback(
		async (credentials) => {
			try {
				const accountData = await api(
					`/oauth?email=${credentials.email}&password=${credentials.password}`,
					"get",
					credentials
				);
				if (!accountData) return false;

				localStorage.setItem("accessToken", accountData.data.accessToken);
				localStorage.setItem("userId", accountData.data.userId);

				setUserId(accountData.data.userId);
				setAccessToken(accountData.data.accessToken);
				setRefreshToken(accountData.data.refreshToken);
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
		const localUserId = localStorage.getItem("userId");

		if (localAccessToken) {
			setAccessToken(localAccessToken);
			if (!userId) setUserId(localUserId);
			setIsConnected(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const value = { isConnected, userId, createAccount, signIn };

	return (
		<OauthContext.Provider value={value}>{children}</OauthContext.Provider>
	);
};

OauthContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export const useOauth = () => React.useContext(OauthContext);

export default OauthContextProvider;
