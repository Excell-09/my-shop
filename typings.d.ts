export interface IUserInput {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}
export interface IUser extends IUserInput {
  historyProduct?: IProduct[];
  wishlistProduct?: IProduct[];
}

export interface IProduct {
  _id: string;
  title: string;
  imageUrl?: string;
  price: number;
}
export interface Register {
  name: string;
  email: string;
  password: string;
}
export interface Login {
  email: string;
  password: string;
}
