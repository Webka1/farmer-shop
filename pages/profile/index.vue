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
        <!-- <UILink link="/profile/sessions">Сессии</UILink> -->
        <div class="mt-8 grid grid-cols-2 gap-8">
            <ProfileUserInfo />
            <div class="shadow-lg rounded-xl p-8">
                <p class="font-bold text-2xl">📋 Мои заказы</p>
            </div>
            <ProfileUserChangePassword />
            <div class="grid gap-8">
                <NuxtLink
                    class="shadow-lg rounded-xl p-8 hover:shadow-xl transition flex items-center justify-center group"
                    to="/profile/bookmarks">
                    <p class="text-3xl text-slate-600 font-bold transition group-hover:text-green-500">🔖 Избранные
                        товары</p>
                </NuxtLink>
                <NuxtLink
                    class="shadow-lg rounded-xl p-8 hover:shadow-xl transition flex items-center justify-center group"
                    to="/profile/sessions">
                    <p class="text-3xl text-slate-600 font-bold transition group-hover:text-green-500">⚙️ Сессии
                        пользователя</p>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>