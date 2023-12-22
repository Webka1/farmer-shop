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
    <UIPageTitle icon="📋">Мои заказы</UIPageTitle>
</template>