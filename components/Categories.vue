<template>
    <div class="mt-5 mb-5">
        <CategoryTitle>Категории товаров</CategoryTitle>
        <Loading v-if="pending"/>
        <UIAlert v-else-if="!pending && error" class="mt-4" type="error">{{ error }}</UIAlert>
        <div class="mt-4 flex items-center justify-stretch gap-2" v-else>
            <CategoriesItem v-for="category in data.categories" :category="category"/>
        </div>
    </div>
</template>

<script setup>
    const { data, pending, error, refresh } = await useFetch('/api/categories/categories')
</script>

<style>

</style>