<script setup>
    import generateGradient from '@/utils/generateGradient'

    const props = defineProps({
        category: Object
    })
</script>
<template>
    <NuxtLink class="w-fit" :to="`/category/${props.category.category_url}`">
        <div class="transition rounded-3xl p-6 w-fit font-semibold text-md hover:opacity-90" :class="generateGradient()">
            {{ props.category.category_name }}
        </div>
    </NuxtLink>
</template>
<style scoped>
    
</style>