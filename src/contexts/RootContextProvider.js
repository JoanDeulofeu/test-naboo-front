import PropTypes from "prop-types";
import ActivitiesContextProvider from "./ActivitiesContextProvider";
import CitiesContextProvider from "./CitiesContextProvider";
import ApiContextProvider from "./ApiContextProvider";
import OauthContextProvider from "./OauthContextProvider";
import UserContextProvider from "./UserContextProvider";

const RootContextProvider = ({ children }) => {
	return (
		<ApiContextProvider>
			<OauthContextProvider>
				<UserContextProvider>
					<ActivitiesContextProvider>
						<CitiesContextProvider>{children}</CitiesContextProvider>
					</ActivitiesContextProvider>
				</UserContextProvider>
			</OauthContextProvider>
		</ApiContextProvider>
	);
};

RootContextProvider.propTypes = {
	children: PropTypes.object.isRequired,
};

export default RootContextProvider;
