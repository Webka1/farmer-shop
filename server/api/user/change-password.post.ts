// import { PrismaClient } from "@prisma/client"
import prisma from '@/utils/prisma'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "~/app.constants"
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
    if(event.context.is_protected) {
        // return {
        //     error: true,
        //     reason: 'Неавторизован'
        // }
        const body = await readBody(event)

        if (!event.context.user_id) {
            return {
                error: true,
                reason: 'Неавторизован'
            }
        }

        try {
            const user = await prisma.users.findUnique({
                where: {
                    id: event.context.user_id
                }
            })

            if (!user) {
                return {
                    error: true,
                    reason: 'Пользователь не найден'
                }
            }

            if(user.is_banned) {
                return {
                    error: true,
                    reason: 'Пользователь забанен'
                }
            } 
            
            if (user.is_deleted) {
                return {
                    error: true,
                    reason: 'Пользователь не найден'
                }
            }

            const checkPassword = bcrypt.compareSync(body.old_password, user.password)

            if (!checkPassword) {
                return {
                    error: true,
                    reason: 'Неверный старый пароль'
                }
            }

            const encryptedPassword = bcrypt.hashSync(body.new_password, 7)

            const changePassword = await prisma.users.update({
                where: {
                    id: event.context.user_id
                }, 
                data: {
                    password: encryptedPassword
                }
            })

            if (!changePassword) {
                return {
                    error: true,
                    reason: 'Ошибка при изменении пароля'
                }
            } 

            return {
                error: false,
                message: 'Пароль успешно изменен!'
            }
        

        } catch (error) {
            console.log(error)

            return {
                error: true,
                reason: 'Ошибка при авторизации',
                info: error
            }
        }
    } else {
        return {
            error: true,
            reason: 'Только для авторизированных пользователей'
        }
    }
})