"use client";

import PropTypes from "prop-types";
import * as React from "react";

import { useApi } from "./ApiContextProvider";
import { useOauth } from "./OauthContextProvider";

const UserContext = React.createContext();

/**
 * This context provider allows to manage Oauth & connection state
 */
const UserContextProvider = ({ children }) => {
	const { api } = useApi();
	const { isConnected, userId } = useOauth();

	const [user, setUser] = React.useState();

	// Create a user account on firebase and on database
	// Return true if it is well done
	const getUser = React.useCallback(async () => {
		try {
			const userData = await api(`/users?id=${userId}`, "get");
			if (!userData) return false;

			setUser(userData.data);

			return true;
		} catch (e) {
			return false;
		}
	}, [api, userId]);

	React.useEffect(() => {
		if (isConnected && userId) getUser();
		else setUser(undefined);
	}, [isConnected, userId, getUser]);

	const value = { user };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export const useUser = () => React.useContext(UserContext);

export default UserContextProvider;
