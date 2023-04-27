export interface User {
  _id: string;
  name: string;
  email: string;
  historyProduct: string[];
  wishlistProduct: string[];
}
export interface AuthUser {
  user: User;
  token: string;
}
