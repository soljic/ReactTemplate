import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import {format} from 'date-fns';
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";

type CartItem = {
    id: number;
    quantity: number;
    price: number;
  };
  
  type ShoppingCart = {
    cartItems: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    totalPrice: number;
  };
  
  export default class ShoppingCartStore {
    cartItems: CartItem[] = [];
    isOpen = false;
    totalPrice = 0;
  
    constructor() {
      makeAutoObservable(this);
  
      reaction(
        () => this.isOpen,
        (isOpen) => {
          if (isOpen) {
            console.log("Shopping cart opened");
          } else {
            console.log("Shopping cart closed");
          }
        }
      );
    }
  
    openCart = () => {
      this.isOpen = true;
    };
  
    closeCart = () => {
      this.isOpen = false;
    };

    getTotalPrice = () => {
      return this.totalPrice;
    };

    setTotalPrice = (price:number) => {
       this.totalPrice = price;
    };
  
    getItemQuantity = (id: number) => {
      const item = this.cartItems.find((item) => item.id === id);
      return item ? item.quantity : 0;
    };
  
    increaseCartQuantity = (id: number) => {
      const item = this.cartItems.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
      } else {
        this.cartItems.push({ id, quantity: 1 , price: 0 });
      }
    };
  
    decreaseCartQuantity = (id: number) => {
      const item = this.cartItems.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.removeFromCart(id);
      }
    };

 
  
    removeFromCart = (id: number) => {
      this.cartItems = this.cartItems.filter((item) => item.id !== id);
    };
  
    get cartQuantity() {
      return this.cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
    }

    clearCart = () => {
      runInAction(() => {
        this.cartItems = [];
      });
    };
 
  
    get shoppingCart(): ShoppingCart {
      return {
        cartItems: this.cartItems,
        isOpen: this.isOpen,
        openCart: this.openCart,
        closeCart: this.closeCart,
        getItemQuantity: this.getItemQuantity,
        increaseCartQuantity: this.increaseCartQuantity,
        decreaseCartQuantity: this.decreaseCartQuantity,
        removeFromCart: this.removeFromCart,
        cartQuantity: this.cartQuantity,
        clearCart: this.clearCart,
        totalPrice: this.getTotalPrice(),
      };
    }
  }
  