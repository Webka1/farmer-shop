<template>
    <h2 class="font-black text-slate-800 text-3xl"><span class="mr-3">{{ props.icon }}</span><slot/></h2>
</template>
<script setup>
    const props = defineProps({
        icon: {
            required: false,
            default: '🍿'
        }
    })
</script>
<style  scoped>

</style>