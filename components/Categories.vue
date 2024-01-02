<template>
    <div class="mt-14">
        <CategoryTitle>Категории товаров</CategoryTitle>
        <Loading v-if="is_loading"/>
        <UIAlert v-else-if="!is_loading && error" class="mt-4" type="error">{{ error }}</UIAlert>
        <div class="mt-8 flex items-center justify-stretch gap-2" v-else>
            <CategoriesItem v-for="category in data.categories" :category="category"/>
        </div>
    </div>
</template>

<script setup>
    const is_loading = ref(false)
    const data = ref([])
    const error = ref(null)

    const fetchCategories = ( async () => {
        is_loading.value = true
        try {
            const response = await $fetch('/api/categories/categories')
            data.value = response
        } catch (e) {
            error.value = e
        } finally {
            is_loading.value = false
        }
    })

    onMounted(async () => {
        is_loading.value = true
        await fetchCategories().finally(() => {
            is_loading.value = false
        })
    })
</script>

<style>

</style>