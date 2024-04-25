import prisma from '@/utils/prisma'

export default defineEventHandler( async (event) => {
    if(event.context.is_protected && event.context.is_logged_in) {
        if (event.context.user_id) {

            const cartItems = await prisma.cart.findMany({
                where: {
                    user_id: event.context.user_id
                },
                include: {
                    cart_items: {
                        where: {
                            is_deleted: false,
                        }
                    }
                }
            })

            if (cartItems.length > 0) {
                const items = cartItems[0].cart_items.map((item) => {
                    if (item.item_stock && item.item_stock <= 1) {
                        return {
                            ...item,
                            in_stock: true
                        }
                    }   
                })

                return {
                    error: false,
                    items
                }
            } else {
                return {
                    error: true,
                    reason: 'Товаров нет в корзине :(',
                    items: []
                }
            }
            
        } else {
            return {
                error: true,
                reason: 'Не хватает user_id :('
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