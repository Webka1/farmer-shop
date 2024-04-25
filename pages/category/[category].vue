<script setup>
    const route = useRoute()

    const category_id = route.params.category

    const { data, error, pending } = await useFetch('/api/categories/items?category=' + category_id)

</script>
<template>
    <div class="mt-4">
        <UIPageTitle>{{ data.category_name }}</UIPageTitle>
        <Loading icon="🔎" v-if="pending" />
        <div v-else>
            <UIAlert v-if="error || data.error" class="mt-4" type="error">{{ data.reason }}</UIAlert>
            <div v-else>
                <ItemsList class="mt-8" v-if="data.items.length > 0" :items="data.items" />
                <ItemsEmpty v-else-if="data.items.length < 1" 
                    title="Здесь ничего нет :("
                    description="Товаров в этой категории нет в наличии"
                />
            </div>
        </div>
    </div>
</template>