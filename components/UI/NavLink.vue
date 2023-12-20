<script setup>
    const props = defineProps({
        link: {
            type: String,
            default: '/',
            required: true,
        },
        text: {
            type: String,
            default: '',
            required: true
        },
        icon: {
            type: String,
            default: '',
            required: true,
        },
        color: {
            type: String,
            default: 'text-gray-500',
            required: false,
        },
        hover: {
            type: String,
            default: 'text-black',
            required: false,
        }
    })
</script>
<template>
    <NuxtLink activeClass="text-green-500 hover:text-green-400" :class="`flex transition items-center justify-start ${props.color} font-bold hover:${props.hover}`" :to="props.link">
        <Icon :name="`${props.icon}`" width="25" height="25"/>&nbsp;
        <p>{{ props.text }}</p>
    </NuxtLink>
</template>