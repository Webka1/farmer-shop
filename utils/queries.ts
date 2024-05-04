import prisma from '@/utils/prisma'

export const getCartItems = async (user_id: number) => {
    const getCart = await prisma.cart.findMany({
        where: {
            user_id: user_id
        },
        select: {
            quantity: true,
            cart_item: true
        }
    })

    const items = getCart.map((item) => {
        return {
            ...item.cart_item,
            quantity: item.quantity
        }
    })

    const totalSum = items.map((item) => {
        // @ts-ignore
        // return item.quantity * item.item_price

        if (item.item_is_sale) {
            // @ts-ignore
            return Math.floor(item.quantity * Math.floor(item.item_price - ((item.item_price * item.item_discount) / 100))) 
        } else {
            // @ts-ignore
            return item.quantity * item.item_price
        }
    }).reduce((totalPrice, singleItemPrice) => totalPrice + singleItemPrice, 0);

    if (!getCart) {
        return {
            error: true,
            reason: 'Ошибка при получении корзины'
        }
    } else {
        return {
            totalSum,
            items
        }
    }
}