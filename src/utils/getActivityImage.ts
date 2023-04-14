import activitySquare from "../../public/activities/activity-square.png";
import activityImage from "../../public/activities/activity.png";
import bike from "../../public/activities/bike.png";
import climbing from "../../public/activities/climbing.png";
import hiking from "../../public/activities/hiking.png";
import noActivity from "../../public/activities/noActivity.png";
import surf from "../../public/activities/surf.png";
import trail from "../../public/activities/trail.png";
import yoga from "../../public/activities/yoga.png";

// Return an image based on the activity entered
// By default, return Yoga image
const getActivityImage = (activity: string) => {
	if (activity === "activity") return activityImage;
	else if (activity === "activity-square") return activitySquare;
	else if (activity === "bike") return bike;
	else if (activity === "climbing") return climbing;
	else if (activity === "hiking") return hiking;
	else if (activity === "surf") return surf;
	else if (activity === "trail") return trail;
	else if (activity === "yoga") return yoga;
	else if (activity === "noActivity") return noActivity;
	else return activitySquare;
};

export default getActivityImage;
