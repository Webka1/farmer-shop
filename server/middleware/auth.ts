import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "~/app.constants"
import { server_protected_routes } from "@/utils/protected_routes"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // const test = await prisma.users.findMany()
    const path = event.path

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
                event.context.user_id = session?.user_id
            } else {
                event.context.user_id = 'User expired'
            }
        } catch (error) {
            event.context.user_id = 'Filed to verify jwt'
        }
    } else {
        event.context.is_protected = false
    }
})