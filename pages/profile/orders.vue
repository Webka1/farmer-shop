<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Мои заказы`,
        ogTitle: `${BRAND_NAME} - Мои заказы`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

</script>
<template>
    <h2 class="font-black text-black text-3xl"><span class="mr-4">📋</span>Мои заказы</h2>
</template>