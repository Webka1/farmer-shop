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
        <UIPageTitle icon="✌️">Профиль</UIPageTitle>
        <div class="mt-8 grid xl:grid-cols-2 2xl:grid-cols-2 gap-8 md:grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            <ProfileUserInfo />
            <ProfileLink link="/profile/orders">📋 Мои заказы</ProfileLink>
            <ProfileUserChangePassword />
            <div class="grid gap-8">
                <ProfileLink link="/profile/bookmarks">🔖 Избранные товары</ProfileLink>
                <ProfileLink link="/profile/sessions">⚙️ Сессии пользователя</ProfileLink>
            </div>
        </div>
    </div>
</template>