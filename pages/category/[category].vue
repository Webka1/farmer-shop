<script setup>
    const route = useRoute()

    const category_id = route.params.category
    
    const { data, error, pending } = await useFetch('/api/categories/items?category=' + category_id)
    const filtered_items = ref(data.value.items)
    const non_change_items = ref(data.value.items)



    const onSearch = (input) => {

        if (input.length > 0) {
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
        <div class="flex items-center flex-wrap justify-between">
            <UIPageTitle icon="📦">{{ data.category_name }}</UIPageTitle>
            <ItemsFilter />
        </div>
        <Loading icon="🔎" v-if="pending" />
        <div v-else>
            <UIAlert v-if="error || data.error" class="mt-4" type="error">{{ data.reason }}</UIAlert>
            <div v-else>
                <ItemsItemList class="mt-8" v-if="filtered_items.length > 0" :items="filtered_items" />
                <ItemsItemEmpty v-else-if="filtered_items.length < 1" title="Здесь ничего нет :("
                    description="Товаров по вашему запросу не найдено" />
            </div>
        </div>
    </div>
</template>