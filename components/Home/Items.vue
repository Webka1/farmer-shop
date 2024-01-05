<script setup>

    const props = defineProps({
        category: {
            type: String,
            default: 'all'
        },
        display_name: String,
        filter_enabled: {
            type: Boolean,
            default: false
        },
        empty_text: String
    })

    const all_items = ref([])
    const is_loading = ref(false)
    const error = ref('')

    const { data, execute } = useFetch(`/api/items/${props.category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.data.value.error) {
            error.value = res.data.value.reason
        } else {
            all_items.value = res.data.value.items
        }
    }).catch(err => {
        console.log('Error from Home items (category: ' + props.category + '): ', err)
        error.value = err
    }).finally(() => {
        is_loading.value = false
    })

    onMounted(async () => {
        is_loading.value = true
        await execute
    })

    function onSearch(input) {

        if (input.length > 0) {
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
                <CategoryTitle>{{ display_name }}</CategoryTitle>
                <Filter v-if="filter_enabled" />
            </div>

            <Loading v-if="is_loading" />
            <UIAlert v-else-if="error && !is_loading" class="mt-4" type="error">{{ error }}</UIAlert>
            <ItemsList v-else-if="all_items.length > 0" :items="all_items" class="mt-8" />
            <ItemsEmpty v-else>{{ empty_text }}</ItemsEmpty>
        </div>
    </div>
</template>
<style scoped></style>