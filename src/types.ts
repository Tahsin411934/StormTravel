// src/types.ts
export interface CartItem {
    _id: string;
    productName: string;
    imgUrl: string;
    price: number;
    discount: number;
    quantity: number;
  }
  
  export interface CartState {
    cart: CartItem[];
  }