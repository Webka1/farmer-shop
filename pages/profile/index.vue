<script setup>
    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Профиль`,
        ogTitle: `${BRAND_NAME} - Профиль`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })
</script>
<template>
    <div>
        <UIPageTitle icon="✌️">Мой профиль</UIPageTitle>
        <UILink link="/profile/sessions">Сессии</UILink>
    </div>
</template>