<script setup>
   import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth.store'
   import { SpeedInsights } from "@vercel/speed-insights/nuxt"

    const authStore = useAuthStore()
    const { authenticated } = storeToRefs(authStore)

    watch(() => {
         console.log('Auth in layout: ', authenticated.value)
    })

   const isOpenedCart = ref(false)

    const toggleCart = () => {
        isOpenedCart.value = !isOpenedCart.value
    }

    provide('toggleCart', {
        toggleCart,
        isOpenedCart
    })
</script>

<template>
    <CartDrawer :isLoggedIn="authenticated" v-if="isOpenedCart" />
    <div class="main-content xl:p-20 2xl:p-20 lg:p-20 md:p-10 sm:p-5 p-5 bg-[#f7fde8]">
        <Header @toggleCart="toggleCart" :isLoggedIn="authenticated" />
        <div class="bg-white p-5 rounded-b-3xl md:p-5 lg:p-10">
            <slot />
        </div>
    </div>
</template>

<style scoped>
    .main-content {
        min-height: 100vh;
    }
</style>