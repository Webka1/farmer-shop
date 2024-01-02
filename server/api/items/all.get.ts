import prisma from '@/utils/prisma'
export default defineEventHandler(async (event) => {
    try {
        const all_items = await prisma.items.findMany({
            where: {
                is_deleted: false
            },
        })

        const favorited_items = await prisma.users.findMany({
            where: {
                is_deleted: false,
                favorited_items: {
                    some: {
                        is_deleted: false
                    }
                }
            },
        })

        const items = all_items.map((item) => {
            const isFavorited = favorited_items.some((favorited_item) => {
                return favorited_item.id === item.id
            })

            return {
                ...item,
                isFavorite: isFavorited
            }
        })


        return {
            error: false, 
            items
        }
    } catch (error: any) {
        return {
            error: true,
            reason: error.message
        }
    }
})