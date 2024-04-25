import prisma from '@/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const category_id = getQuery(event).category

        if (!category_id || category_id == '') {
            return {
                error: true,
                reason: 'Не задан параметр'
            }
        } else {
            const items_in_category = await prisma.categories.findMany({
                where: {
                    is_deleted: false,
                    // @ts-ignore
                    category_url: category_id,
                },
                select: {
                    items: {
                        where: {
                            is_deleted: false,
                            item_stock: {
                                gt: 0
                            },
                        }
                    },
                    category_name: true
                }
            })

            if (items_in_category.length > 0) {

                if (event.context.is_logged_in === false) {
                    return {
                        error: false,
                        message: 'Ok',
                        items: items_in_category[0].items,
                        category_name: items_in_category[0].category_name
                    }
                } else {
                    const favorited_items = await prisma.users.findMany({
                        where: {
                            id: event.context.user_id
                        },
                        select: {
                            favorited_items: true
                        }
                    })


                    const items = items_in_category[0].items.map((item) => {
                    const isFavorite = favorited_items[0].favorited_items.some((favorited_item) => {
                        return favorited_item.id === item.id
                    })

                        return {
                            ...item,
                            isFavorite
                        }
                    })

                    return {
                        error: false,
                        message: 'Ok',
                        // @ts-ignore
                        items: items,
                        category_name: items_in_category[0].category_name
                    }

                }

            } else {
                return {
                    error: true,
                    reason: 'Неверная категория или товаров нет в наличии',
                    category_name: 'Ошибка'
                }
            }
        }
    } catch (error: any) {
        return {
            error: true,
            reason: error.message
        }
    }
})