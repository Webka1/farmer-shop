<script setup>
    const items = [
        {
            id: 1,
            image: 'https://static.insales-cdn.com/r/dNEubbkCwHM/rs:fit:1000:1000:1/plain/images/products/1/4834/711193314/3639879716.jpg@webp',
            title: 'Столовый край говяжий',
            price: 2438,
            isFavorite: true,
            isAdded: true,
        },
        {
            id: 2,
            image: 'https://static.insales-cdn.com/r/dNEubbkCwHM/rs:fit:1000:1000:1/plain/images/products/1/4834/711193314/3639879716.jpg@webp',
            title: 'Столовый край говяжий',
            price: 77,
            isFavorite: false,
            isAdded: true
        },
    ]
</script>

<template>
    <div class="mt-8 flex items-center justify-normal gap-8">
        <ItemCard 
            v-for="item in items"
            :key="item.id"
            :image="item.image"
            :title="item.title"
            :price="item.price"
            :isFavorite="item.isFavorite"
            :isAdded="item.isAdded"
        />
    </div>
</template>

<style scoped></style>