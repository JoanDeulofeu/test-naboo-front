export default interface Activity {
	id: string;
	userId: string;
	type: string;
	city: string;
	price: number;
	description?: string;
	club?: string;
}
