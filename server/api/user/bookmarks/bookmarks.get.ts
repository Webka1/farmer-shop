import prisma from '@/utils/prisma'

export default defineEventHandler( async (event) => {
    if(event.context.is_protected && event.context.is_logged_in) {
        // const body = await readBody(event)
        if(event.context.user_id) {
            const bookmarks = await prisma.users.findMany({
                where: {
                    id: event.context.user_id
                },
                select: {
                    favorited_items: true
                }
            })

            const items = bookmarks[0].favorited_items.map((item) => {
                return {
                    ...item,
                    isFavorite: true
                }
            })

            return {
                error: false,
                items
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