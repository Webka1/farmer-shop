import prisma from '@/utils/prisma'
export default defineEventHandler(async (event) => {
    try {
        const items = await prisma.items.findMany({
            where: {
                is_deleted: false
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