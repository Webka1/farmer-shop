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
        <p
            class="w-fit transition hover:underline"
            :class="{
                'text-slate-400 hover:text-slate-500': type === 'normal',
                'text-red-400 hover:text-red-500': type === 'error',
                'text-green-400 hover:text-green-500':type === 'success',

                'font-bold': bold,
                'font-normal': !bold
            }"
        >
            <slot/>
        </p>
    </NuxtLink>
</template>