export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Supplier {
  id: string;
  name: string;
  description?: string;
  isDeleted?: boolean;
}

export interface Product {
  barcode?: string;
  qty: number;
  discount: number;
  id: string | number;
  name: string;
  description?: string;
  category?: string | number;
  expiration?: number | Date;
  supplier?: string | number;
  stock: number;
  price: number;
  status?: boolean;
  createdDate?: number | Date;
  quantity?: number;
}

export interface ProductTransaction extends Product {
  priceNonFormatter: number;
  cash: number;
  total: number;
  discount: number;
  qty: number;
  invoiceNumber: number;
  productId: number;
  totalNonFormatter?: number;
  pricenonFormatter?: number;
}

export interface User {
  isOwner?: boolean;
  id: string | number;
  name: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
  birthday: number;
  username: string;
  type: number;
  uid: string;
  allowLogin: boolean;
  shiftNumber: string;
}

export interface UserCache {
  info: User;
  user: any;
}

export interface SalesToday {
  invoice: string;
  discount: number;
  total: number;
}

export interface AdjustmentStock {
  id: number;
  userId: number;
  productId: number;
  stock: number;
  productName: string;
  user: string;
  createdDate: number | Date;
}

export interface LoginHistory {
  id: number;
  fullName: string;
  createdDate: number | Date;
  action: 'Login' | 'Logout'
}

export interface Sale {
  id: number;
  productId: number;
  userId: number;
  price: number;
  quantity: number;
  invoiceNumber: number;
  discount: number;
  createdDate: number;
  createdBy: number;
}
