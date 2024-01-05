<script setup>

    const all_items = ref([])
    const is_loading = ref(false)
    
    const { data, error, pending, execute } = useFetch('/api/items/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        all_items.value = res.data.value.items
    }).catch(err => {
        console.log('Error from all items: ', err)
    }).finally(() => {
        console.log('All items: ', all_items.value)
        is_loading.value = false
    })

    onMounted(async () => {
        is_loading.value = true
        await execute
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

            <Loading v-if="is_loading"/>
            <UIAlert v-else-if="error && !is_loading" class="mt-4" type="error">{{ error }}</UIAlert>
            <ItemsList v-else-if="all_items" :items="all_items" class="mt-8"/>
            <ItemsEmpty v-else>Нет товаров</ItemsEmpty>
        </div>
    </div>
</template>
<style scoped>

</style>