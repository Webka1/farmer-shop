<script setup>

    const all_items = ref([])
    
    const { data, error, pending, execute } = useFetch('/api/items/all', {
        onDone: (data) => {
            all_items.value = data
        }
    })

    onMounted(async () => {
        await execute()
    })

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
            <ItemsList v-else :items="data.items" class="mt-8"/>
        </div>
    </div>
</template>
<style scoped>

</style>