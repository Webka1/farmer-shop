<template>
    <div class="flex items-center justify-center gap-4">
        <UISelect @change="(e) => { filter(e.target.value) }" :options="filters" />
        <UIInput width="100%" @input="(e) => { search(e.target.value) }" input_type="text" input_name="search" input_placeholder="Поиск по товарам" />
    </div>
</template>

<script setup>
    const filters = [
        {
            name: 'По умолчанию',
            value: 'default'
        },
        {
            name: 'По возрастанию цены',
            value: 'price_asc'
        },
        {
            name: 'По убыванию цены',
            value: 'price_desc'
        }
    ]

    const search = inject('search')
    const filter = inject('filter')
    
</script>

<style scoped>

</style>