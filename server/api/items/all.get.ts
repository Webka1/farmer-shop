import prisma from '@/utils/prisma'
export default defineEventHandler(async (event) => {
    const all_items = await prisma.items.findMany({
        where: {
            is_deleted: false
        },
    })

    if(event.context.is_logged_in === false) {
        return {
            error: false,
            is_logged_in: event.context.is_logged_in,
            user: event.context.user_id,
            items: all_items
        }
    } else {
        const favorited_items = await prisma.users.findMany({
            where: {
                id: event.context.user_id
            },
            select: {
                favorited_items: true
            }
        })

        const items = all_items.map((item) => {
            const isFavorite = favorited_items[0].favorited_items.some((favorited_item) => {
                return favorited_item.id === item.id
            })

            return {
                ...item,
                isFavorite
            }
        })

        return {
            error: false,
            is_logged_in: event.context.is_logged_in,
            user: event.context.user_id,
            items
        }
    }
})