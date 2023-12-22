import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {

  if(event.context.is_protected && event.context.is_logged_in) {
    return {
      error: false,
      message: 'Hello user, this route protected',
      your_user_id: event.context.user_id,
      is_you_logged_in: event.context.is_logged_in
    }
  } else {
    return {
      error: true,
      reason: 'Неавторизован'
    }
  }
})