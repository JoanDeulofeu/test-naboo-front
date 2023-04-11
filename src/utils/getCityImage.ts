import lyon from "../../public/city/lyon.png";
import nabooCity from "../../public/city/naboo-city.png";
import paris from "../../public/city/paris.png";

// Return an image based on the city entered
// By default, return naboo-city image
const getCityImage = (city: string) => {
	if (city === "lyon") return lyon;
	else if (city === "paris") return paris;
	else return nabooCity;
};

export default getCityImage;
