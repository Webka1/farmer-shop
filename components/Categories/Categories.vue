<template>
    <div class="mt-14">
        <CategoriesCategoryTitle>Категории товаров</CategoriesCategoryTitle>
        <Loading v-if="is_loading"/>
        <UIAlert v-else-if="!is_loading && error" class="mt-4" type="error">{{ error }}</UIAlert>
        <div class="mt-8 flex items-center justify-stretch gap-2" v-else>
            <CategoriesCategoryItem v-for="category in categories" :category="category"/>
        </div>
    </div>
</template>

<script setup>

    import { storeToRefs } from 'pinia';
    import { useCategoriesStore } from '@/store/categories.store';

    const categoriesStore = useCategoriesStore()
    const { categories, is_loading, error } = storeToRefs(categoriesStore)

    if(!categories.value.categories) {
        await categoriesStore.getCategories
    }
</script>

<style>

</style>