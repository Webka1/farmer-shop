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
    const error = ref('')
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
            if(response.error) {
                error.value = response.reason
            } else {
                sessions.value = response.sessions
                is_loading.value = false
            }
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
<template>
    <div>
        <UIPageTitle icon="🔐">Сессии</UIPageTitle>
        <div v-if="!is_loading && error">
            <UIAlert type="error">
                {{ error }}
            </UIAlert>
            <div class="mt-4 w-2/6">
                <UIButton button_type="success" @click_fn="fetch_sessions(sessions_count)">Попробовать еще раз</UIButton>
            </div>
        </div>
        <div v-else-if="!is_loading && !error">
            <div class="p-4 rounded-3xl border-2 mt-6 border-slate-200 grid grid-cols-6 justify-center gap-8 items-center" v-for="session in sessions">
                <div class="col-span-3">
                    <h2 class="font-bold text-xl text-gray-600">{{ session.user_agent }}</h2>
                    <p class="mt-2 text-md font-semibold text-gray-400">IP: {{ session.ip }}</p>
                </div>
                <div>
                    <p class="text-sm text-slate-400">
                        Дата авторизации
                    </p>
                    <p class="text-gray-600">
                        {{ new Date(session.created_at).toLocaleString() }}
                    </p>
                </div>
                <div v-if="!session.is_active">
                    <p class="text-sm text-slate-400">
                        Дата завершения сессии
                    </p>
                    <p class="text-gray-600">
                        {{ new Date(session.finished_at).toLocaleString() }}
                    </p>
                </div>
                <div v-else>
                    <span v-if="session.is_active" class="p-1 bg-green-100 text-green-500 pl-2 pr-2 rounded-full">
                        Активная
                    </span>
                </div>
                <div>
                    <UIButton @click_fn="finishSession(session.jwt)" :button_type="btn_is_loading ? 'loading': 'error'" v-if="session.is_active">Завершить</UIButton>
                </div>
            </div>
        </div>
        <Loading v-else/>
    </div>
</template>
<style scoped>
    .sessions_list {
        border: 1px solid #e4e4e4;
    }
</style>