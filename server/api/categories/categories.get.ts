import prisma from '@/utils/prisma'
export default defineEventHandler(async (event) => {
    try {
        const categories = await prisma.categories.findMany({
            where:  {
                is_deleted: false
            }
        })

        return {
            error: false, 
            categories
        }
    } catch (error: any) {
        return {
            error: true,
            reason: error.message
        }
    }
})