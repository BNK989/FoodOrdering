import {CartItem, Product} from '@/src/types'
import { createContext, PropsWithChildren, useContext, useState } from "react"

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (product: Product, size: CartItem['size']) => {
        // TODO: IF IN CART, INCREASE QUANTITY
       const newCartItem: CartItem = {
            id: '1', // TODO: generate unique id
           product,
           product_id: product.id,
           size,
           quantity: 1
       }

       setItems([newCartItem, ...items])
    }
    //TODO update qty & remove
    
    console.log('total:', items.length)
    return (
        <CartContext.Provider 
            value={{ items, addItem }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
export const useCart = () => useContext(CartContext)