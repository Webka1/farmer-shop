// import { PrismaClient } from "@prisma/client"
import prisma from '@/utils/prisma'
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "~/app.constants"

export default defineEventHandler(async (event) => {
    if(event.context.is_protected) {
        return {
            error: true,
            reason: 'Неавторизован'
        }
    } else {
        const body = await readBody(event)

        if(!body.token) {
            return {
                error: true,
                reason: 'Нет токена',
                body
            }
        }

        try {
            jwt.verify(body.token, JWT_SECRET)
        
            const session = await prisma.sessions.findFirst({
                where: {
                    jwt: body.token,
                }
            })

            return {
                session
            }
        } catch (error) {
            console.log('Filed to verify jsonwebtoken')

            return {
                error: true,
                reason: 'Filed to verify jwt'
            }
        }
    }
})