<script setup>
    import { BRAND_NAME } from '@/app.constants'
    import NavLink from './UI/NavLink.vue';

    const props = defineProps({
        isLoggedIn: {
            type: Boolean,
            default: false
        }
    })

    watch(() => props.isLoggedIn, (value) => {
        console.log('Is logged in: ', value)
    })

    import { useAuthStore } from '@/store/auth.store'

    const { logUserOut } = useAuthStore()
    const router = useRouter()
    async function logout() {
        logUserOut()

        router.push('/login')
    }

    const emit = defineEmits([
        'toggleCart'
    ])
</script>

<template>
    <header class="p-10 bg-white rounded-t-3xl header flex items-center justify-between">
        <NuxtLink to="/">
            <h2 class="font-bold text-xl">{{ BRAND_NAME }}</h2>
            <p class="text-slate-400">Заказ фермерских продуктов</p>
        </NuxtLink>
        <div class="header_links flex items-center justify-start gap-8">
            <NavLink link="/" icon="solar:home-2-outline" text="Главная"/>
            <NavLink @click="emit('toggleCart')" link="" icon="solar:cart-large-2-linear" text="0 руб."/>
            
            <NavLink v-if="props.isLoggedIn" link="/profile/orders" icon="solar:checklist-minimalistic-linear" text="Заказы"/>
            <NavLink v-if="props.isLoggedIn" link="/profile/bookmarks" icon="solar:bookmark-linear" text="Избранное"/>
            <NavLink v-if="props.isLoggedIn" link="/profile/" icon="solar:user-circle-linear" text="Профиль"/>
            <NavLink v-if="props.isLoggedIn" :onClick="logout" link="#" icon="solar:logout-3-linear" text="Выйти" color="text-red-500" hover="text-red-400"/>

            <NavLink v-if="!props.isLoggedIn" link="/login" icon="solar:login-3-outline" text="Войти"/>
        </div>
    </header>
</template>

<style scoped>
    .header {
        border-bottom: 1px solid #e4e4e4;
    }
</style>