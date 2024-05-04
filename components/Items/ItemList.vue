<script setup>

    import { storeToRefs } from 'pinia';
    import { useBookmarksStore } from '~/store/bookmarks.store';
    import { useCartStore } from '~/store/cart.store';

    const bookmarksStore = useBookmarksStore()
    const { bookmarks, is_loading, error } = storeToRefs(bookmarksStore)

    const cartStore = useCartStore()
    const { items:cart_items, is_loading:cart_loading } = storeToRefs(cartStore)

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

        if (state == false) {
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
                    if (item.id === id) {
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
                    if (item.id === id) {
                        item.isFavorite = !item.isFavorite
                    }

                    return item
                })
            }).finally(() => {
                isFavroiteLoading.value = false
            })
        }
    }

    async function onClickCart(id) {
        const { addToCart } = useCartStore()

        addToCart(id)
    }
</script>

<template>
    <div v-auto-animate class="flex items-center justify-self-stretch flex-wrap gap-8">
        <ItemsItemCard v-for="item in props.items" 
            
            :key="item.id" 

            :id="item.id" 
            :image="item.item_image" 
            :title="item.item_name"
            :price="item.item_price" 
            :isSale="item.item_is_sale"
            :itemDiscount="item.item_discount"

            :isFavorite="item.isFavorite" 
            :isAdded="cart_items.some((items) => items.id == item.id)"
            :isFavroiteLoadingProp="isFavroiteLoading" 
            :isCartLoadingProp="cart_loading"
            
            @clickFavorite="onClickFavorite(item.id, item.isFavorite)"
            @clickAdd="onClickCart(item.id)" />
    </div>
</template>

<style scoped></style>