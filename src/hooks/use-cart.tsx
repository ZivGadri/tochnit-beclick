"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
  customOptions?: Record<string, unknown>;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.service.id === action.payload.service.id
      );
      
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.service.id === action.payload.service.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.service.price * item.quantity, 0),
        };
      }
      
      const newItems = [...state.items, action.payload];
      return {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.service.price * item.quantity, 0),
      };
    }
    
    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter((item) => item.service.id !== action.payload);
      return {
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + item.service.price * item.quantity, 0),
      };
    }
    
    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id });
      }
      
      const updatedItems = state.items.map((item) =>
        item.service.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.service.price * item.quantity, 0),
      };
    }
    
    case "CLEAR_CART":
      return { items: [], total: 0 };
    
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  const { state, dispatch } = context;
  
  const addItem = (service: Service, quantity: number = 1, customOptions?: Record<string, unknown>) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { service, quantity, customOptions },
    });
  };
  
  const removeItem = (serviceId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: serviceId });
  };
  
  const updateQuantity = (serviceId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: serviceId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  return {
    items: state.items,
    total: state.total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount: state.items.reduce((count, item) => count + item.quantity, 0),
  };
}
