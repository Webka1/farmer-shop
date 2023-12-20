<script setup>
    const props = defineProps({
        type: {
            type: String,
            default: 'default',
            required: false,
        },
        size: {
            type: String,
            default: 'normal',
            required: false,
        },
    })
</script>
<template>
    <button v-if="props.type === 'success'" :class="`w-full ${props.size === 'normal' ? 'p-2' : 'p-1' } transition font-bold text-white bg-green-500 rounded-md hover:bg-green-400`"><slot/></button>
    <button v-if="props.type === 'default'" :class="`w-full ${props.size === 'normal' ? 'p-2' : 'p-1' } transition font-bold text-white bg-slate-500 rounded-md hover:bg-slate-400`"><slot/></button>
    <button v-if="props.type === 'error'" :class="`w-full ${props.size === 'normal' ? 'p-2' : 'p-1' } transition font-bold text-white bg-red-500 rounded-md hover:bg-red-400`"><slot/></button>
</template>