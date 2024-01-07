import prisma from '@/utils/prisma'
export default defineEventHandler(async (event) => {
    if(event.context.is_protected && event.context.is_logged_in == false) {
        return {
            error: true,
            reason: 'Неавторизован'
        }
    } else {
        
        const orders = await prisma.orders.findMany({
            where: {
                user_id: event.context.user_id,
                is_deleted: false
            }
        })

        if(!orders) {
            return {
                error: true,
                reason: 'Заказы не найдены'
            }
        }

        return {
            error: false,
            orders
        }

    }
})