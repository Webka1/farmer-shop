import prisma from '@/utils/prisma'
import { getCartItems } from '~/utils/queries'

export default defineEventHandler( async (event) => {
    if(event.context.is_protected && event.context.is_logged_in) {
        if (event.context.user_id) {


            const cart = await getCartItems(event.context.user_id) 

            // @ts-ignore
            if (cart.error) {
                return {
                    error: true,
                    // @ts-ignore
                    reason: cart.reason
                }
            } else {
                return {
                    error: false,
                    cart_items: cart.items,
                    totalSum: cart.totalSum
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