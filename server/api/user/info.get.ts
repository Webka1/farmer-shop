import prisma from '@/utils/prisma'

export default defineEventHandler( async (event) => {
    if(event.context.is_protected && event.context.is_logged_in) {
        // const body = await readBody(event)
        if(event.context.user_id) {
            const user = await prisma.users.findFirst({
                where: {
                    id: event.context.user_id
                },
                select: {
                    first_name: true,
                    last_name: true,
                    phone_number: true,
                    personal_discound: true,
                    email: true,
                    created_at: true
                }
            })

            if (!user) {
                return {
                    error: true,
                    reason: 'Серверная ошибка | /api/user/info [GET]'
                }
            } else {
                return {
                    error: false,
                    message: 'Ok',
                    user
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