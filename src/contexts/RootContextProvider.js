import PropTypes from "prop-types";
import * as React from "react";
import ApiContextProvider from "./ApiContextProvider";
import OauthContextProvider from "./OauthContextProvider";
import UserContextProvider from "./UserContextProvider";

const RootContextProvider = ({ children }) => {
	return (
		<ApiContextProvider>
			<OauthContextProvider>
				<UserContextProvider>{children}</UserContextProvider>
			</OauthContextProvider>
		</ApiContextProvider>
	);
};

RootContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default RootContextProvider;
