<script setup>
    const props = defineProps({
        link: {
            required: true
        }
    })
</script>
<template>
    <NuxtLink class="shadow-lg rounded-xl p-8 hover:shadow-xl transition flex items-center justify-center group"
        :to="link">
        <p class="text-3xl text-slate-600 font-bold transition group-hover:text-green-500"><slot/></p>
    </NuxtLink>
</template>