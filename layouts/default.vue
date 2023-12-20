<script setup lang="ts">
    import { account } from '@/utils/appwrite';
    import { useAuthStore, useIsLoadingStore } from '#imports';

    const isLoadingStore  = useIsLoadingStore()
    const store = useAuthStore()
    const router = useRouter()

    onMounted(async () => {
        try {
            const user = await account.get()
            if(user) store.set(user)
        } catch (error) {
            console.log(error)
        } finally {
            isLoadingStore.set(false)
        }
    })
</script>

<template>
    <div v-if="isLoadingStore.isLoading">
        <!-- TODO: 'Нормальный лоадер' -->
        <Loader/>
    </div>
    <div v-else class="main-content p-20 bg-blue-100">
        <Header :isLoggedIn="store.isAuth"/>
        <div class="bg-white p-10 rounded-b-3xl">
            <slot/>
        </div>
    </div>
</template>

<style scoped>
    .main-content {
        min-height: 100vh;
    }
</style>