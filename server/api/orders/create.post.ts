import prisma from '@/utils/prisma'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (event.context.is_protected && event.context.is_logged_in) {
        
        const user = body.user
        const delivery = body.delivery
        const items = body.items
        const totalSum = body.totalSum

        return {
            error: false,
            user,
            delivery,
            items
        }

        
    } else {
      return {
            error: true,
            reason: 'Неавторизован'
        }
    }
})