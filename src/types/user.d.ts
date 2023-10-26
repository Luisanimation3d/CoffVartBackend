export type UserWithoutId = Omit<UserInterface, 'id'>;

interface UserInterface {
	id: number;
	name: string;
	lastname: string;
	state: boolean;
	address: string;
	phone: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}


type UserModelType = Model<UserInterface, UserWithoutId>;
