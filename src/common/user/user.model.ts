
export class User {
	id: Number;
	username: String;
	email: String;
	firstName: String;
	lastName: String;
	isActive: Boolean;
	facebookId?: String;
	twitterId?: String;
	googleId?: String;
	role: { id: number, level: number, name: string };
	stations: any[];
};
