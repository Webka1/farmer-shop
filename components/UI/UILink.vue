<script setup>
    const props = defineProps({
        type: {
            type: String,
            required: false,
            default: 'normal'
        },
        bold: {
            type: Boolean,
            default: false,
            required: false
        },
        link: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <NuxtLink :to="props.link">
        <p v-if="props.type === 'normal'" :class="`transition text-slate-400 hover:text-slate-500 hover:underline ${props.bold ? 'font-bold' : 'font-normal'}`"><slot/></p>
        <p v-if="props.type === 'error'" :class="`transition text-red-400 hover:text-red-500 hover:underline ${props.bold ? 'font-bold' : 'font-normal'}`"><slot/></p>
    </NuxtLink>
</template>