
export class User {
	id: Number;
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	defaultLanguage: string;
	isActive: Boolean;
	facebookId?: string;
	twitterId?: string;
	googleId?: string;
	role: { id: number, level: number, name: string };
	stations: any[];
};
