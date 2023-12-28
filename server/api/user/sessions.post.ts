// import { PrismaClient } from "@prisma/client"
import prisma from '@/utils/prisma'
// TODO: СДелать завершение конкретной сессии
export default defineEventHandler( async (event) => {

  if(event.context.is_protected && event.context.is_logged_in) {
    const body = await readBody(event)
    if(event.context.user_id) {
      try {
        const sessions = await prisma.sessions.findMany({
          take: 7,
          where: {
            user_id: event.context.user_id
          },
          select: {
            created_at: true,
            finished_at: true,
            id: true,
            user_agent: true,
            is_active: true,
            jwt: true
          },
          orderBy: {
            id: 'desc'
          }
        })

        return {
          error: false,
          sessions
        }
      } catch (error) {
        return {
          error: true,
          reason: 'Ошибка при получении сессий',
          info: error
        }
      }
    } else {
      return {
        error: true,
        reason: 'Не хватает user_id :('
      }
    }
  } else {
    return {
      error: true,
      reason: 'Неавторизован'
    }
  }
})