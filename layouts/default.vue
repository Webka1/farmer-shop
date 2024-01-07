<script setup>
   import { storeToRefs } from 'pinia'
   import { useAuthStore } from '@/store/auth.store'

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
    <CartDrawer v-if="isOpenedCart"/>
    <div class="main-content p-20 bg-[#f7fde8]">
        <Header @toggleCart="toggleCart" :isLoggedIn="authenticated"/>
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