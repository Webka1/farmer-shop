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
        return item.quantity * item.item_price
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

// export getCartItems = await prisma.cart.findMany({
//                 where: {
//                     user_id: event.context.user_id
//                 },
//                 select: {
//                     quantity: true,
//                     cart_item: true
//                 },
//             })

//             const items = cartItems.map((item) => {
//                 return {
//                     ...item.cart_item,
//                     quantity: item.quantity
//                 }
//             })

//             return {
//                 error: false,
//                 cart_items: items
//             }