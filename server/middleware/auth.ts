// import { PrismaClient } from "@prisma/client"
import prisma from '@/utils/prisma'

import jwt from "jsonwebtoken"
import { JWT_SECRET } from "~/app.constants"
import { server_protected_routes } from "@/utils/protected_routes"

export default defineEventHandler(async (event) => {
    if(server_protected_routes.includes(event.path)) {
        event.context.is_protected = true

        const cookies = parseCookies(event)
        const token = cookies?.token

        try {
            jwt.verify(token, JWT_SECRET)

            const session = await prisma.sessions.findFirst({
                where: {
                    jwt: token,
                }
            })

            if(session?.is_active) {
                event.context.is_logged_in =  true
                event.context.user_id = session?.user_id
            } else {
                event.context.user_id = 'User expired'
                event.context.is_logged_in =  false
            }
        } catch (error) {
            
            await finishSession(token).then((res: any) => {
                console.log('/server/middleware/auth: ', res)
            })

            event.context.user_id = 'Filed to verify jwt | server mw'
            event.context.is_logged_in =  false
        }
    } else {
        event.context.is_protected = false
    }
})