import prisma from '@/utils/prisma'
import { finishSession } from '~/utils/finishSession'

// TODO: СДелать завершение конкретной сессии

export default defineEventHandler( async (event) => {

  if(event.context.is_protected && event.context.is_logged_in) {
    const body = await readBody(event)
    if(event.context.user_id) {
        const cookies = parseCookies(event)
        const token = cookies?.token

        const body = await readBody(event)

        if(body.jwt) {
          await finishSession(body.jwt).then((res: any) => {
              console.log('[w/ body jwt] /api/user/finish: ', res)

              return {
                error: false,
                message: 'Завершили сессию с id: ' + res.id,
                finished_at: res.finished_at
              }
          })
        } else {
          await finishSession(token).then((res: any) => {
              console.log('[w/o body jwt] /api/user/finish: ', res)

              return {
                error: false,
                message: 'Завершили сессию с id: ' + res.id,
                finished_at: res.finished_at
              }
          })
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