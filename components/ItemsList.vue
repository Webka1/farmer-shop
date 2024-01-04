<script setup>

    import { storeToRefs } from 'pinia';
    import { useBookmarksStore } from '~/store/bookmarks.store';
    
    const bookmarksStore = useBookmarksStore()
    const { bookmarks, is_loading, error } = storeToRefs(bookmarksStore)

    const props = defineProps({
        items: {
            type: Array,
            default: []
        }
    })

    const isFavroiteLoading = ref(false)

    async function onClickFavorite(id, state) {
        isFavroiteLoading.value = true

        console.log(`Item id: ${id} | Is favorited: ${state}`)

        if(state == false) {
            await useAsyncData('addBookmarks', async () => {
                await bookmarksStore.addToBookmark(id)
            }).then(() => {
                bookmarks.value = bookmarks.value.map(item => {
                    if (item.id === id) {
                        item.isFavorite = !item.isFavorite
                    }
                    return item
                })

                props.items.map(item => {
                    if(item.id === id) {
                        item.isFavorite = !item.isFavorite
                    }

                    return item
                })
            }).finally(() => {
                isFavroiteLoading.value = false
            })
        } else {
            await useAsyncData('removeBookmarks', async () => {
                await bookmarksStore.removeFromBookmarks(id)
            }).then(() => {
                bookmarks.value = bookmarks.value.map(item => {
                    if (item.id === id) {
                        item.isFavorite = !item.isFavorite
                    }
                    return item
                })

                props.items.map(item => {
                    if(item.id === id) {
                        item.isFavorite = !item.isFavorite
                    }

                    return item
                })
            }).finally(() => {
                isFavroiteLoading.value = false
            })
        }
    }
</script>

<template>
    <div v-auto-animate class="flex items-center justify-normal gap-8">
        <ItemCard
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :image="item.item_image"
            :title="item.item_name"
            :price="item.item_price"
            :isFavorite="item.isFavorite"
            :isAdded="item.isAdded"

            :isFavroiteLoadingProp="isFavroiteLoading"

            @clickFavorite="onClickFavorite(item.id, item.isFavorite)"
        />
    </div>
</template>

<style scoped></style>