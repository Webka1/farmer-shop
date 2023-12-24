import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// TODO: ENCRYPT PASSWORD FOR KAIFFF
// TODO: FIELDS VALIDATE (SS)

export default defineEventHandler(async (event) => {
  if(event.context.is_protected) {
    return {
        error: true,
        reason: 'Неавторизован'
    }
  } else {

    const body = await readBody(event)

    const existingUser = await prisma.users.findUnique({
      where: {
        email: body.formData.email
      }
    })

    if(existingUser) {
      return {
        error: true, 
        reason: 'Такой пользователь уже существует'
      }
    }

    const newUser = await prisma.users.create({
      data: {
        email: body.formData.email,
        password: body.formData.password,
        first_name: body.formData.first_name,
        last_name: body.formData.last_name,
        phone_number: body.formData.phone_number
      }
    })

    if(newUser) {
      console.log(newUser)

      return {
        error: false,
        message: 'Успешная регистрация'
      }
    }
  }
})