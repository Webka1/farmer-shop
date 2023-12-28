import prisma from '@/utils/prisma'

export async function finishSession(token: string) {
    const current_session = await prisma.sessions.findFirst({
        where: {
            jwt: token
        },
        select: {
            id: true
        }
    })


    const finish_session = await prisma.sessions.update({
        data: {
            is_active: false,
            finished_at: new Date()
        },
        where: {
            id: current_session?.id
        }
    })

    if(finish_session) {
        return {
            error: false,
            message: 'Завершили сессию с id: ' + current_session?.id,
            finished_at: finish_session.finished_at
        }
    } else {
        return {
            error: true,
            reason: `Не могу завешить ссессию :(`
        }
    }
}