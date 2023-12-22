import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {

  if(event.context.is_protected && event.context.is_logged_in) {
    const body = await readBody(event)
    // return {
    //   error: false,
    //   message: 'Hello user, this route protected',
    //   your_user_id: event.context.user_id,
    //   is_you_logged_in: event.context.is_logged_in,
    //   count_of_sessions: body.count
    // }
    if(event.context.user_id) {
      try {
        const sessions = await prisma.sessions.findMany({
          take: 7,
          where: {
            user_id: event.context.user_id
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