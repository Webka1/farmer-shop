<script setup>
    import { PrismaClient } from '@prisma/client';
    import { storeToRefs } from 'pinia';

    const { user_id } = storeToRefs(useAuthStore())


    const prisma = new PrismaClient()

    const sessions = ref([])
    const sessions_count = ref(5)
    async function fetch_sessions(sessions_count) {
        // const response = await prisma.sessions.findMany({
        //     where: {
        //         user_id: user_id
        //     }
        // })

        // if(!response) {
        //     alert('no sess')
        // }

        // sessions.value = response

        // const get_sessions = await prisma.sessions.findMany({
        //     take: sessions_count.value,
        //     where: {
        //         user_id: user_id.value
        //     },
        //     orderBy: {
        //         id: 'desc'
        //     }
        // })

        // console.log(get_sessions)
    }

    onMounted(() => {
        fetch_sessions(sessions_count)
    })
</script>
<template>
    <h2 class="font-black text-black text-3xl">Сессии 🔐</h2>
    <div class="sessions_list mt-4 rounded-3xl">
        <div v-for="session in sessions" class="div">
            {{ session.id }}
        </div>
    </div>
</template>
<style scoped>
    .sessions_list {
        border: 1px solid #e4e4e4;
    }
</style>