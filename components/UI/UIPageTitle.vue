<template>
    <h2 class="font-black text-black text-3xl mb-5"><span class="mr-3">{{ props.icon }}</span><slot/></h2>
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