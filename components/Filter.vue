<template>
    <div class="flex items-center justify-center gap-4">
        <UISelect :options="filters" />
        <UIInput @input="(e) => { search(e.target.value) }" input_type="text" input_name="search" input_placeholder="Поиск по товарам" />
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
    
</script>

<style scoped>

</style>