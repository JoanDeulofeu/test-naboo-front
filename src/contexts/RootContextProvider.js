import PropTypes from "prop-types";
import ActivitiesContextProvider from "./ActivitiesContextProvider";
import ApiContextProvider from "./ApiContextProvider";
import OauthContextProvider from "./OauthContextProvider";
import UserContextProvider from "./UserContextProvider";

const RootContextProvider = ({ children }) => {
	return (
		<ApiContextProvider>
			<OauthContextProvider>
				<UserContextProvider>
					<ActivitiesContextProvider>{children}</ActivitiesContextProvider>
				</UserContextProvider>
			</OauthContextProvider>
		</ApiContextProvider>
	);
};

RootContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default RootContextProvider;
