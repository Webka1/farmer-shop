<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';
    import { storeToRefs } from 'pinia';
    import { useBookmarksStore } from '~/store/bookmarks.store';

    useSeoMeta({
        title: `${BRAND_NAME} - Сохраненные товары`,
        ogTitle: `${BRAND_NAME} - Сохраненные товары`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    const bookmarksStore = useBookmarksStore()
    const { bookmarks, is_loading, error } = storeToRefs(bookmarksStore)

    if(!bookmarks.value.bookmarks) {
        await bookmarksStore.getBookmarks
    }

</script>
<template>
    <div>
        <UIPageTitle icon="🔖">Сохраненные товары</UIPageTitle>
        <Loading v-if="is_loading"/>
        <div v-else-if="error && !is_loading" >
            <UIAlert class="mt-4" type="error">{{ error }}</UIAlert>
            <div class="mt-2">
                <UIButton @click_fn="bookmarksStore.getBookmarks">Повторить</UIButton>
            </div>
        </div>
        <ItemsList v-else class="mt-8" :items="bookmarks"/>
    </div>
</template>