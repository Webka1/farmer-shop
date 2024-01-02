<script setup>

    const props = defineProps({
        fetch_url: {
            type: String,
            default: '/api/items/all'
        },
        is_bookmarks: {
            type: Boolean,
            default: false
        }
    })

    const is_loading = ref(false)
    const data = ref([])
    const error = ref(null)

    const fetchItems = ( async () => {
        is_loading.value = true
        try {
            const response = await $fetch(props.fetch_url)
            data.value = response
        } catch (e) {
            error.value = e
        } finally {
            is_loading.value = false
        }
    })


    const isFavoriteLoading = ref(false)

    async function onClickFavorite(id) {
        isFavoriteLoading.value = true
        await $fetch('/api/user/bookmark', {
            method: 'POST',
            body: {
                id: id,
                action: data.value.items.find(item => item.id === id).isFavorite ? 'remove' : 'add'
            }
        })
        isFavoriteLoading.value = false

        data.value.items = data.value.items.map(item => {
            if (item.id === id) {
                item.isFavorite = !item.isFavorite
            }
            return item
        })
    }

    onMounted(async () => {
        is_loading.value = true
        await fetchItems().finally(() => {
            is_loading.value = false
        })
    })
</script>

<template>
    <div>
        <Loading v-if="is_loading" />
        <div v-else>
            <UIAlert v-if="error" type="error">{{ error }}</UIAlert>
            <div v-else>
                <div v-if="data.items" class="flex items-center justify-normal gap-8">
                    <ItemCard
                        v-for="item in data.items"
                        :key="item.id"
                        :id="item.id"
                        :image="item.item_image"
                        :title="item.item_name"
                        :price="item.item_price"
                        :isFavorite="item.isFavorite"
                        :isAdded="item.isAdded"

                        :isFavoriteLoading="isFavoriteLoading"
                        @clickFavorite="onClickFavorite(item.id)"
                    />
                </div>
                <div v-else>
                    <UIAlert v-if="!props.is_bookmarks" type="info">Товаров пока нет</UIAlert>
                    <div v-else>
                        <div class="grid h-auto mt-10 place-items-center">
                            <div class="text-center w-1/5">
                                <center>
                                    <img width="200" src="/img/2936983.png"/>
                                </center>
                            </div>
                            <p class="text-slate-500 text-xl mb-8">У вас еще не сохраненных товаров</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>