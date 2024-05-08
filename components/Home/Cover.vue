<script setup>
    import { BRAND_NAME } from '~/app.constants';
</script>
<template>
    <div>
        <div class="bg-slate-300 rounded-3xl h-80 w-full p-10 cover-img text-center flex justify-center items-center">
            <div>
                <p class="text-white text-3xl font-black">{{ BRAND_NAME }}</p>
                <p class="text-gray-100 text-xl font-semibold mt-2">Интернет магазин для фермерских продуктов из дома онлайн!</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cover-img {
    background: url('/img/12427344_4960099.jpg') center center no-repeat;
    background-size: cover;
}
</style>