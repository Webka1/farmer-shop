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
        </div>
        <ItemsList v-if="bookmarks.length > 0" class="mt-8" :items="bookmarks"/>
        <ItemsEmpty image="/img/image_9.png" image_size="70" class="mt-10" title="Избранных товаров нет :(" description="Вы ничего не добавили в избранные товары" v-else/>
    </div>
</template>