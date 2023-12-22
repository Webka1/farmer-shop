import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {

  // const get_sessions = await prisma.sessions.findMany({
  //   take: 5,
  //   where: {
  //       user_id: 1
  //   },
  //   orderBy: {
  //       id: 'desc'
  //   }
  // })

  // console.log(get_sessions)

  return {
    message: 'protected route',
    is_protected_route: event.context
  }
})