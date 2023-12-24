<script setup>
   import { storeToRefs } from 'pinia'
   import { useAuthStore } from '@/store/auth.store'

   const { logUserOut } = useAuthStore()
   const { authenticated  } = storeToRefs(useAuthStore())
</script>

<template>
    <div class="main-content p-20 bg-[#f7fde8]">
        <Header :isLoggedIn="authenticated"/>
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