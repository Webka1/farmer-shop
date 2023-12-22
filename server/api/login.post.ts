import { PrismaClient } from "@prisma/client"
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "~/app.constants"

const prisma = new PrismaClient()

// TODO: ENCRYPT PASSWORD FOR KAIFFF

const generateToken = (id: number, email: string) => {
    const payload = {
        id, email
    }

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "24h"
    })
}

export default defineEventHandler(async (event) => {
    if(event.context.is_protected) {
        return {
            error: true,
            reason: 'Неавторизован'
        }
    } else {
        const body = await readBody(event)

        const ip = (event.req.headers['x-forwarded-for'] || 
        event.req.connection.remoteAddress || 
        event.req.socket.remoteAddress || 
        // @ts-ignore
        event.req.connection.ocket.remoteAddress).split(",")[0];

        try {
            const user = await prisma.users.findUnique({
                where: {
                    email: body.email
                }
            })

            if (!user) {
                return {
                    error: true,
                    reason: 'Пользователь не найден'
                }
            }

            if (body.password !== user.password) {
                return {
                    error: true,
                    reason: 'Неверный логин или пароль'
                }
            }

            const token = generateToken(user.id, user.email)

            try {
                const current_sessions = await prisma.sessions.updateMany({
                    data: {
                        is_active: false
                    },
                    where: {
                        user: user
                    }
                })

                const new_session = await prisma.sessions.create({
                    data: {
                        is_active: true,
                        ip: ip,
                        user_id: user.id,
                        jwt: token
                    },
                })

                if (!new_session) {
                    return {
                        error: true,
                        reason: 'Ошибка при добавлении сессии'
                    }
                }

                return {
                    error: false,
                    token,
                    user: user.id
                }
            } catch (error) {
                console.log(error)

                return {
                    error: true,
                    reason: "Ошибка при добавлении сессии",
                    info: error
                }
            }
        } catch (error) {
            console.log(error)

            return {
                error: true,
                reason: 'Ошибка при авторизации',
                info: error
            }
        }

        return {
            error: false,
            reason: 'Maybe'
        }
    }
})