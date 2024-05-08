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
        <HomeCover/>
        <Categories/>
        <HomeItems class="mt-14" category="all" display_name="Все товары" filter_enabled="true" empty_title="Нет товаров" empty_description="Мы не смогли найти товары"/>
        <HomeItems class="mt-14" category="sale" display_name="Товары со скидкой" filter_enabled="true" empty_title="Нет товаров со скидкой" empty_description="Мы не смогли найти товары со скидкой"/>
    </div>
</template>