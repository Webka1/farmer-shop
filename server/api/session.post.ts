import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // if(session) {
    //     return {
    //         error: false,
    //         is_active: session.is_active,
    //         user_id: session.user_id,
    //         token: session.jwt
    //     }
    // }

    if(!body.token) {
        return {
            error: true,
            reason: 'Нет токена',
            body
        }
    }

    const session = await prisma.sessions.findFirst({
        where: {
            jwt: body.token
        }
    })

    return {
        session
    }
})