<script setup>

    import { BRAND_NAME } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Главная страница`,
        ogTitle: `${BRAND_NAME} - Главная страница`,
        description: `Заказать фермерские продукты быстро и без сложных действий`,
        ogDescription: `Заказать фермерские продукты быстро и без сложных действий`
    })

</script>
<template>
    <div class="bg-slate-300 rounded-3xl h-80 w-full p-10">
        тут картинку топовую
    </div>
    <div class="mt-5">
        <h2 class="font-black text-black text-3xl">Все товары</h2>
    </div>
</template>