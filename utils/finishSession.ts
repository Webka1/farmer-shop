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
            message: 'Finished session id: ' + current_session?.id
        }
    } else {
        return {
            error: true,
            reason: `Cant't finish session :(`
        }
    }
}