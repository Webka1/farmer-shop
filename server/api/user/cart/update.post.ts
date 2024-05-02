import prisma from '@/utils/prisma'
import { getCartItems } from '@/utils/queries'

export default defineEventHandler( async (event) => {
    if(event.context.is_protected && event.context.is_logged_in) {
        const body = await readBody(event)

        const item_id = body.id

        // create bookmark and if already exists - delete it
        if (body.action == 'add') {

            const getCartItem = await prisma.cart.findMany({
                where: {
                    AND: [
                        { user_id: event.context.user_id },
                        { item_id: item_id }
                    ]
                },
                select: {
                    quantity: true
                }
            })

            if (getCartItem.length < 1) {
                
                const createCartItem = await prisma.cart.create({
                    data: {
                        quantity: 1,
                        created_at: new Date(),
                        user_id: event.context.user_id,
                        item_id: item_id
                    }
                })

                const cart = await getCartItems(event.context.user_id)

                return {
                    error: false,
                    cart_items: cart.items,
                    totalSum: cart.totalSum
                }

            } else {
                const addCartItem = await prisma.cart.updateMany({
                    where: {
                        AND: [
                            { user_id: event.context.user_id },
                            { item_id: item_id }
                        ]
                    },
                    data: {
                        quantity: {
                            increment: 1
                        }
                    }
                })

                if (addCartItem) {

                    const cart = await getCartItems(event.context.user_id)

                    return {
                        error: false,
                        cart_items: cart.items,
                        totalSum: cart.totalSum
                    }
                } else {
                    return {
                        error: true,
                        reason: addCartItem
                    }
                }
            }
        } else if (body.action == 'remove') {

            const getCartItem = await prisma.cart.findMany({
                where: {
                    AND: [
                        { user_id: event.context.user_id },
                        { item_id: item_id }
                    ]
                },
                select: {
                    quantity: true
                }
            })

            console.log('Quantity: ', getCartItem[0].quantity)

            if (getCartItem[0].quantity == 1) {
                const deleteFromCart = await prisma.cart.deleteMany({
                    where: {
                        AND: [
                            { user_id: event.context.user_id },
                            { item_id: item_id }
                        ]
                    },
                })

                const cart = await getCartItems(event.context.user_id)

                return {
                    error: false,
                    cart_items: cart.items,
                    totalSum: cart.totalSum
                }
            } else {
                const removeCartItem = await prisma.cart.updateMany({
                    where: {
                        AND: [
                            { user_id: event.context.user_id },
                            { item_id: item_id }
                        ]
                    },
                    data: {
                        quantity: {
                            decrement: 1
                        }
                    }
                })

                if (removeCartItem) {

                    const cart = await getCartItems(event.context.user_id)

                    return {
                        error: false,
                        cart_items: cart.items,
                        totalSum: cart.totalSum
                    }
                } else {
                    return {
                        error: true,
                        reason: removeCartItem
                    }
                }
            }
        } else {
            return {
                error: true,
                reason: 'Неизвестное действие',
            }
        }
    } else {
        return {
            error: true,
            reason: 'Неавторизован',
            context: event.context
        }
    }
})