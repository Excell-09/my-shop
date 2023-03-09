export interface IUserInput {
  name?: string;
  email: string;
  password: string;
}
export interface IUser extends IUserInput {
  historyProduct: IProduct[];
  wishlistProduct: IProduct[];
}

export interface IProduct {
  title: string;
  image?: string;
  price: number;
}
