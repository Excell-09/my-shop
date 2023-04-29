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

export interface ErrorMessage {
  message: string;
  type?: 'success' | 'error';
}

export interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
}
