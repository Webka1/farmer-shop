<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';
    import { storeToRefs } from 'pinia';
    import { useBookmarksStore } from '~/store/bookmarks.store';

    useSeoMeta({
        title: `${BRAND_NAME} - Избранные товары`,
        ogTitle: `${BRAND_NAME} - Избранные товары`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    const bookmarksStore = useBookmarksStore()
    const { bookmarks, error } = storeToRefs(bookmarksStore)

    if(!bookmarks.value.bookmarks) {
        await bookmarksStore.getBookmarks
    }

    if(error.value) {
        console.log('Error from bookmarks: ', error)
    }

</script>
<template>
    <div>
        <div class="flex gap-4 items-center justify-between">
            <div>
                <UIPageTitle icon="🔖">Ваши избранные товары</UIPageTitle>
            </div>
            <div v-if="bookmarks.length > 0">
                <Filter/>
            </div>
        </div>
        <ItemsList v-if="bookmarks.length > 0" class="mt-8" :items="bookmarks"/>
        <div class="flex flex-row justify-center items-center mt-20" v-else v-auto-animate>
            <div>
                <NuxtImg height="200" src="/img/2936983.png"/>
                <p class="text-center text-lg text-wrap text-slate-400">Нет избранных товаров</p>
            </div>
        </div>
    </div>
</template>