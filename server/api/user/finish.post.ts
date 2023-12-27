import prisma from '@/utils/prisma'
import { finishSession } from '~/utils/finishSession'

// TODO: СДелать завершение конкретной сессии

export default defineEventHandler( async (event) => {

  if(event.context.is_protected && event.context.is_logged_in) {
    const body = await readBody(event)
    if(event.context.user_id) {
        const cookies = parseCookies(event)
        const token = cookies?.token

        await finishSession(token).then((res: any) => {
            console.log('/api/user/finish: ', res)
        })
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