import prisma from '@/utils/prisma'
import bcrypt from 'bcryptjs'

// TODO: ENCRYPT PASSWORD FOR KAIFFF
// TODO: FIELDS VALIDATE (SS)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if(event.context.is_protected) {
    return {
        error: true,
        reason: 'Неавторизован'
    }
  } else if(!body.formData || 
    !body.formData.email || 
    !body.formData.password || 
    !body.formData.first_name || 
    !body.formData.last_name ||
    !body.formData.last_name ||
    !body.formData.phone_number) {
    return {
      error: true,
      reason: 'Нехватает данных для регистрации'
    }
  } else {

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

    const hashedPassword = bcrypt.hashSync(body.formData.password, 7)
    const newUser = await prisma.users.create({
      data: {
        email: body.formData.email,
        password: hashedPassword,
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