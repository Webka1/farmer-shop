<script setup>
    import { PrismaClient } from '@prisma/client';
    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    const prisma = new PrismaClient()

    // SEO
    useSeoMeta({
        title: `${BRAND_NAME} - Сессии`,
        ogTitle: `${BRAND_NAME} - Сессии`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })


    const is_loading = ref(false)
    const error = ''
    const sessions = ref([])
    const sessions_count = ref(5)
    async function fetch_sessions(sessions_count) {
        is_loading.value = true
        await $fetch('/api/user/sessions', {
            method: 'POST',
            body: {
                count: sessions_count.value
            }
        }).then((response) => {
            sessions.value = response.sessions
            is_loading.value = false
        }).finally(() => {
            is_loading.value = false
        })
    }

    onMounted(() => {
        fetch_sessions(sessions_count)
    })
</script>
<template>
    <h2 class="font-black text-black text-3xl"><span class="mr-4">🔐</span>Сессии</h2>
    <div class="relative overflow-x-auto rounded-xl mt-4">
        <table class="w-full text-sm text-left rtl:text-right border-b border-l border-r text-white">
            <thead class="text-sm text-white uppercase bg-green-500">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        IP
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Статус
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Дата авторизации
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Дата завершения сессии
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!is_loading" v-for="session in sessions" class="text-slate-500 border-b font-bold">
                    <td class="px-6 py-4">
                        {{ session.ip }}
                    </td>
                    <td class="px-6 py-4">
                        <span v-if="session.is_active" class="p-1 bg-green-100 text-green-500 pl-2 pr-2 rounded-full">
                            Текущая
                        </span>
                        <span v-else class="p-1 bg-red-100 text-red-500 pl-2 pr-2 rounded-full">
                            Завершена
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        {{ new Date(session.created_at).toLocaleDateString() }}&emsp;{{ new Date(session.created_at).toLocaleTimeString() }}
                    </td>
                    <td class="px-6 py-4">
                        {{ new Date(session.updated_at).toLocaleDateString() }}&emsp;{{ new Date(session.updated_at).toLocaleTimeString() }}
                    </td>
                </tr>
                <tr v-else v-for="n in 7" class="animate-pulse">
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 w-1/2"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-5 rounded-full bg-gray-300 w-2/3"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 w-1/2"></div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="h-4 bg-gray-300 w-1/2"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    .sessions_list {
        border: 1px solid #e4e4e4;
    }
</style>