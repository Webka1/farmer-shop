<script setup>
    const { toggleCart, isOpenedCart } = inject('toggleCart')
</script>
<template>
    <div>
        <div @click="toggleCart" class="fixed  cursor-pointer top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
        <div class="bg-white w-[400px] h-full fixed right-0 top-0 z-20 p-8" v-auto-animate>
            <h2>Корзина</h2>
        </div>
    </div>
</template>