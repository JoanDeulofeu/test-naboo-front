import PropTypes from "prop-types";
import * as React from "react";
import ApiContextProvider from "./ApiContextProvider";
import OauthContextProvider from "./OauthContextProvider";

const RootContextProvider = ({ children }) => {
	return (
		<ApiContextProvider>
			<OauthContextProvider>{children}</OauthContextProvider>
		</ApiContextProvider>
	);
};

RootContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default RootContextProvider;
