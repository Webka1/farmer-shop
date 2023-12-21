import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// TODO: ENCRYPT PASSWORD FOR KAIFFF
// TODO: FIELDS VALIDATE (SS)

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const existingUser = await prisma.users.findUnique({
      where: {
        email: body.email
      }
    })

    if(existingUser) {
      return {
        error: true, 
        reason: 'Пользователь с такой почтой уже существует.'
      }
    }

    const newUser = await prisma.users.create({
      data: {
        email: body.email,
        password: body.password,
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number
      }
    })

    if(newUser) {
      console.log(newUser)
    }
  })