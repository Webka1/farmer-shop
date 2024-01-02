<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Главная страница`,
        ogTitle: `${BRAND_NAME} - Главная страница`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

</script>
<template>
    <div>
        <div class="bg-slate-300 rounded-3xl h-80 w-full p-10">
            тут картинку топовую
        </div>
        <Categories/>
        <div class="mt-14">
            <div class="flex items-center justify-between">
                <CategoryTitle>Товары со скидкой</CategoryTitle>
                <Filter/>
            </div>
            <ItemsList/>
        </div>
    </div>
</template>