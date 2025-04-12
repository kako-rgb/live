import { CART_ITEM, PRODUCT } from "@/utils/types";
import { create } from "zustand";


interface CART_STORE {
    cart: CART_ITEM[],
    updateCart: (product: PRODUCT, method: 'plus' | 'minus' | 'remove') => void;
    resetCart: () => void;
}

const useCartStore = create<CART_STORE>((set) => ({
    cart: [],
    resetCart: () => set({ cart: [] }),
    updateCart: (product, method) => set((state) => {
        const currentCart = state.cart
        const foundProductIndex = currentCart.findIndex(each => each.product._id === product._id);
        if (foundProductIndex !== -1) {
            if (method === 'plus') {
                currentCart[foundProductIndex].quantity += 1
            } else if (method === 'remove') {
                currentCart.splice(foundProductIndex, 1)
            } else {
                if (currentCart[foundProductIndex].quantity === 1) {
                    currentCart.splice(foundProductIndex, 1)
                } else
                currentCart[foundProductIndex].quantity -= 1
            }
            return { cart: [...currentCart] }
        }
        return { cart: [...state.cart, { product, quantity: 1 }] }
    })
}))

export default useCartStore;