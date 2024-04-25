import prisma from '@/utils/prisma'

export default defineEventHandler( async (event) => {
    if(event.context.is_protected && event.context.is_logged_in) {
        const body = await readBody(event)
        // create bookmark and if already exists - delete it
        if (body.action == 'add') {
            
            const addItem = await prisma.users.update({
                where: {
                    id: event.context.user_id
                },
                data: {
                    Cart: {
                        connect: {
                            id: body.id
                        }
                    }
                }
            })

            if(!addItem) {
                return {
                    error: true,
                    reason: 'Не удалось добавить в корзину',
                    context: event.context
                }
            }

            return {
                error: false,
                reason: 'Успешно добавлено в корзину',
                item: addItem
            }

            // const bookmark = await prisma.items.update({
            //     where: {
            //         id: body.id
            //     },
            //     data: {
            //         favorited_by: {
            //             connect: {
            //                 id: event.context.user_id
            //             }
            //         }
            //     }
            // })

            // if(!bookmark) {
            //     return {
            //         error: true,
            //         reason: 'Не удалось добавить в закладки',
            //         context: event.context
            //     }
            // } 

            // return {
            //     error: false,
            //     reason: 'Успешно добавлено в закладки',
            //     item: bookmark
            // }
        } else if(body.action == 'remove') {
            // const bookmark = await prisma.items.update({
            //     where: {
            //         id: body.id
            //     },
            //     data: {
            //         favorited_by: {
            //             disconnect: {
            //                 id: event.context.user_id
            //             }
            //         }
            //     }
            // })

            // if(!bookmark) {
            //     return {
            //         error: true,
            //         reason: 'Не удалось удалить из закладок',
            //         context: event.context
            //     }
            // } 

            // return {
            //     error: false,
            //     reason: 'Успешно удалено из закладок',
            //     item: bookmark
            // }
        } else {
            return {
                error: true,
                reason: 'Неизвестное действие',
            }
        }
    } else {
        return {
            error: true,
            reason: 'Неавторизован',
            context: event.context
        }
    }
})