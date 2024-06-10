<script setup>
    import { BRAND_NAME } from '@/app.constants'
    import NavLink from './UI/NavLink.vue';

    const props = defineProps({
        isLoggedIn: {
            type: Boolean,
            default: false
        }
    })

    import { useAuthStore } from '@/store/auth.store'
    import { useCartStore } from '~/store/cart.store';
    const cartStore = useCartStore()

    const userIsLoggedIn = ref(props.isLoggedIn)

    watchEffect(async () => {
        userIsLoggedIn.value = props.isLoggedIn

        if (userIsLoggedIn) {
            // await cartStore.getCartItems
            console.log('Logged in')

            cartStore.getCartItems
        }
    })


    const { logUserOut } = useAuthStore()
    const router = useRouter()
    async function logout() {
        logUserOut()

        router.push('/login')
    }

    const emit = defineEmits([
        'toggleCart'
    ])

    const { totalSum } = storeToRefs(cartStore)
    

</script>

<template>
    <header
        class="flex-wrap justify-center p-10 2xl:p-10 xl:p-10 lg:p-10 md:p-10 sm:p-10 md:flex-wrap sm:flex-wrap bg-white rounded-t-3xl header flex items-center 2xl:justify-between xl:justify-between lg:justify-between md:justify-center">
        <NuxtLink class="flex items-center justify-normal gap-2 group" to="/">
            <div>
                <NuxtImg class="custom-class-image" src="/img/logo.png" width="56" height="56" />
            </div>
            <div>
                <h2 class="group-hover:text-black font-bold text-gray-700 text-xl transition">{{ BRAND_NAME }}</h2>
                <p class="text-slate-400 group-hover:text-green-500 transition">Заказ фермерских продуктов</p>
            </div>
        </NuxtLink>
        <div
            class="header_links flex items-center md:justify-center lg:justify-between justify-center sm:justify-center md:mt-4 sm:mt-4 mt-4 gap-8 flex-wrap">
            <UINavLink link="/" icon="solar:home-2-outline" text="Главная" />
            <UINavLink @click="emit('toggleCart')" link="" icon="solar:cart-large-2-linear" :text="userIsLoggedIn ? totalSum.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB'
                }) : '0 руб.'" />

            <UINavLink v-if="userIsLoggedIn" link="/profile/orders" icon="solar:checklist-minimalistic-linear"
                text="Заказы" />
            <UINavLink v-if="userIsLoggedIn" link="/profile/bookmarks" icon="solar:bookmark-linear" text="Избранное" />
            <UINavLink v-if="userIsLoggedIn" link="/profile/" icon="solar:user-circle-linear" text="Профиль" />
            <UINavLink v-if="userIsLoggedIn" :onClick="logout" link="#" icon="solar:logout-3-linear" text="Выйти"
                color="text-red-500" hover="text-red-400" />

            <UINavLink v-if="!userIsLoggedIn" link="/login" icon="solar:login-3-outline" text="Войти" />
        </div>
    </header>
</template>

<style scoped>
.header {
    border-bottom: 1px solid #e4e4e4;
}
.custom-class-image {
    width: 56px;
    /* устанавливаем ширину */
    height: 56px;
    /* устанавливаем высоту */
    object-fit: cover;
    /* сохраняем пропорции изображения */
}
</style>