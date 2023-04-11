import PropTypes from "prop-types";
import * as React from "react";
import ApiContextProvider from "./ApiContextProvider";

const RootContextProvider = ({ children }) => {
	return <ApiContextProvider>{children}</ApiContextProvider>;
};

RootContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default RootContextProvider;
