import { create } from 'zustand';
const initState = {
    user: {
        name: '',
        age: '',
        email: '',
        phoneNumber: '',
        carts: [],
    },
};
const useStoreUser = create((set) => ({
    ...initState,
    addToCart: (cart) => {
        set((state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    carts: [...state.user.carts, cart],
                },
            };
        });
    },
    deleteCart: (productId) => {
        set((state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    carts: [...state.user.carts].filter(
                        (cart) => cart.productId !== productId
                    ),
                },
            };
        });
    },

    decreaseCart: (productId) => {
        set((state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    carts: [...state.user.carts].map((cart) => {
                        if (productId !== cart.productId) return cart;
                        return {
                            ...cart,
                            quantity:
                                cart.quantity === 1
                                    ? cart.quantity
                                    : cart.quantity - 1,
                        };
                    }),
                },
            };
        });
    },
    increaseCart: (productId) => {
        set((state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    carts: [...state.user.carts].map((cart) => {
                        if (productId !== cart.productId) return cart;
                        return {
                            ...cart,
                            quantity: cart.quantity + 1,
                        };
                    }),
                },
            };
        });
    },
}));
export default useStoreUser;
