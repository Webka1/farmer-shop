// import { PrismaClient } from "@prisma/client"
import prisma from '@/utils/prisma'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "~/app.constants"
import bcrypt from 'bcryptjs'

// TODO: НЕ ЗАКРЫВАТЬ ВСЕ СЕССИИ (ПОЖАЛУЙСТА)
// TODO СДЕЛАТЬ ВМЕСТО АЙПИ ЮЗЕР АГЕНТА
// TODO: ПЖ ЗАВЕРЕШННЫЕ СЕССИ ИЗМЕНИТЬ ПОН (ДОБАВИТЬ ЕЩЕ ОДНУ КОЛОНКУ В БД)

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
        const user_agent = event.headers.get('user-agent')

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

            const checkPassword = bcrypt.compareSync(body.password, user.password)

            if (!checkPassword) {
                return {
                    error: true,
                    reason: 'Неверный логин или пароль'
                }
            }

            const token = generateToken(user.id, user.email)

            try {
                const new_session = await prisma.sessions.create({
                    data: {
                        is_active: true,
                        ip: ip,
                        user_agent: user_agent,
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
                    user: user.id,
                    session_id: new_session.id
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
            error: true,
            reason: 'Maybe'
        }
    }
})