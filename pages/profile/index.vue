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
        <h2 class="font-black text-black text-3xl"><span class="mr-4">😃</span>Мой профиль</h2>
        <UILink link="/profile/sessions">Сессии</UILink>
    </div>
</template>