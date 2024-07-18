import { CartItem, Tables } from '@/src/types'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { randomUUID } from 'expo-crypto'
import { useInsertOrder } from '../api/orders'
import { Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useInsertOrderItems } from '../api/order-items'

type CartType = {
    items: CartItem[]
    addItem: (product: Tables<'products'>, size: CartItem['size']) => void
    updateQty: (itemId: string, amount: -1 | 1) => void
    total: number
    checkout: () => void
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => {},
    updateQty: () => {},
    total: 0,
    checkout: () => {},
})

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([])

    const { mutate: insertOrder } = useInsertOrder()
    const { mutate: insertOrderItems } = useInsertOrderItems()
    const router = useRouter()

    const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
        const existingItem = items.find(
            (item) => item.product_id === product.id && item.size === size,
        )
        if (existingItem) {
            updateQty(existingItem.id, 1)
            return
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        }

        setItems([newCartItem, ...items])
    }

    const updateQty = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items
            .map((item) => {
                return item.id !== itemId
                    ? item
                    : { ...item, quantity: item.quantity + amount }
            })
            .filter((item) => item.quantity > 0)
        setItems(updatedItems)
    }

    const total: number = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
    )

    const emptyCart = () => {
        setItems([])
    }

    const checkout = () => {
        insertOrder(
            {
                total,
            },
            {
                onSuccess: saveOrderItems,
                onError: () => {},
            },
        )
    }

    const saveOrderItems = (order: Tables<'orders'>) => {
        const orderItems = items.map((item) => ({
            order_id: order.id,
            product_id: item.product_id,
            qty: item.quantity,
            size: item.size,
        }))

        insertOrderItems(orderItems, {
            onSuccess: () => {
                emptyCart()
                router.push(`(user)/orders/${order?.id}`)
            },
        })
    }

    return (
        <CartContext.Provider value={{ items, addItem, updateQty, total, checkout }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
export const useCart = () => useContext(CartContext)
