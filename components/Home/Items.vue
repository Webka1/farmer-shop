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
        empty_title: {
            type: String,
        },
        empty_description: {
            type: String,
        },
        empty_image: {
            type: String,
        },
        empty_image_size: {
            type: Number,
        }
    })

    const is_loading = ref(true)
    
    const filtered_items = ref([])
    const non_change_items = ref([])

    const { data, error } = useFetch(`/api/items/${props.category}`).then(res => {
        if (res.data.value.error) {
            error.value = res.data.value.reason
        } else {
            filtered_items.value = res.data.value.items
            non_change_items.value = res.data.value.items
        }
    }).catch(err => {
        console.log('Error from Home items (category: ' + props.category + '): ', err)
        error.value = err
    }).finally(() => {
        is_loading.value = false
    })

    const onSearch = (input) => {
        
        if(input.length > 0) {
            filtered_items.value = non_change_items.value.filter(item => {
                return item.item_name.toLowerCase().includes(input.toLowerCase())
            })
        } else {
            filtered_items.value = non_change_items.value
        }
    }

    const OnFilter = (filter) => {

        if (filter == 'default') {
            filtered_items.value = non_change_items.value.sort((a, b) => {
                return a.id - b.id
            })
        } else if (filter == 'price_asc') {
            filtered_items.value = non_change_items.value.sort((a, b) => {
                return a.item_price - b.item_price
            })
        } else {
            filtered_items.value = non_change_items.value.sort((a, b) => {
                return b.item_price - a.item_price
            })
        }
        
    }
    

    provide('search', onSearch)
    provide('filter', OnFilter)

</script>
<template>
    <div>
        <div class="flex items-center justify-between">
            <CategoryTitle>{{ display_name }}</CategoryTitle>
            <Filter v-if="filter_enabled" />
        </div>

        <Loading v-if="is_loading" />
        <UIAlert v-else-if="error && !is_loading" class="mt-4" type="error">{{ error }}</UIAlert>
        <ItemsList v-else-if="filtered_items.length > 0" :items="filtered_items" class="mt-8" />
        <ItemsEmpty 
            :title="props.empty_title" 
            :description="props.empty_description" 
            :image="props.empty_image" 
            :image_size="props.empty_image_size" 
            class="mt-10" 
            v-else 
        />
    </div>
</template>
<style scoped></style>