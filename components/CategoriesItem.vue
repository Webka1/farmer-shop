<script setup>
    import generateGradient from '@/utils/generateGradient'

    const props = defineProps({
        category: Object
    })
</script>
<template>
    <NuxtLink class="w-fit" :to="`/category/${props.category.category_url}`">
        <div class="transition-all text-white duration-150 rounded-xl p-6 w-fit font-semibold text-md bg-gradient-to-tl from-green-200 via-green-400 to-green-500 bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%]">
            {{ props.category.category_name }}
        </div>
    </NuxtLink>
</template>
<style scoped>
    
</style>