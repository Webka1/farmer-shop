<script setup>

    const all_items = ref([])
    
    const { data, error, pending, execute } = useFetch('/api/items/all')

    watch(data, () => {
        all_items.value = data.value.items
    })
    computed(() => {
        all_items.value = data.value.items
    })

    onMounted(async () => {
        await execute()
    })

    function onSearch(input) {

        if(input.length > 0) {
            all_items.value = all_items.value.filter(item => {
                return item.item_name.toLowerCase().includes(input.toLowerCase())
            })
        } else {
            all_items.value = data.value.items
        }

        console.log('Filtered items: ', all_items.value)
    }

    provide('search', onSearch)

</script>
<template>
    <div>
        <div class="mt-14">
            <div class="flex items-center justify-between">
                <CategoryTitle>Все товары</CategoryTitle>
                <Filter/>
            </div>

            <Loading v-if="pending"/>
            <UIAlert v-else-if="error && !pending" class="mt-4" type="error">{{ error }}</UIAlert>
            <ItemsList v-else :items="all_items" class="mt-8"/>
        </div>
    </div>
</template>
<style scoped>

</style>