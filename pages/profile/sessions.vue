<script setup>
    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    // SEO
    useSeoMeta({
        title: `${BRAND_NAME} - Сессии`,
        ogTitle: `${BRAND_NAME} - Сессии`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })


    const is_loading = ref(false)
    const btn_is_loading = ref(false)
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

    const finishSession =  async (jwt) => {
        btn_is_loading.value = true
        try {
            await $fetch('/api/user/finish', {
                method: 'POST',
                body: {
                    jwt: jwt
                }
            }).then((response) => {
                console.log(response)
            }).finally(() => {
                sessions.value = sessions.value.map((session) => {
                    if (session.jwt === jwt) {
                        session.is_active = false
                        session.finished_at = new Date()
                    }
                    return session
                })


                btn_is_loading.value = false
            })
        } catch (error) {
            console.log(error)
        }
    }
</script>
<!-- TODO: UPDATE DESIGN SESSION LIST -->
<template>
    <div>
        <UIPageTitle icon="🔐">Сессии</UIPageTitle>
        <div class="relative overflow-x-auto rounded-xl">
            <table class="w-full text-sm text-left rtl:text-right border-b border-l border-r text-white">
                <thead class="text-sm text-white uppercase bg-green-500">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            User Agent
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Дата авторизации
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Дата завершения сессии
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Действия
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!is_loading" v-for="session in sessions" class="text-slate-500 border-b font-bold">
                        <td class="px-6 py-4">
                            {{ session.user_agent }}
                        </td>
                        <td class="px-6 py-4">
                            {{ new Date(session.created_at).toLocaleDateString() }}&emsp;{{ new Date(session.created_at).toLocaleTimeString() }}
                        </td>
                        <td class="px-6 py-4">
                            <span v-if="session.is_active" class="p-1 bg-green-100 text-green-500 pl-2 pr-2 rounded-full">
                                Активная
                            </span>
                            <span v-else>
                                {{ new Date(session.finished_at).toLocaleDateString() }}&emsp;{{ new Date(session.finished_at).toLocaleTimeString() }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <UIButton @click_fn="finishSession(session.jwt)" :button_type="btn_is_loading ? 'loading': 'error'" v-if="session.is_active">Завершить</UIButton>
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
    </div>
</template>
<style scoped>
    .sessions_list {
        border: 1px solid #e4e4e4;
    }
</style>