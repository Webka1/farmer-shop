import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// TODO: ENCRYPT PASSWORD FOR KAIFFF

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    return {
        error: true,
        reason: 'Maybe'
    }
})