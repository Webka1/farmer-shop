<script setup>
import { stringifyQuery } from 'vue-router';

    const props = defineProps({
        type: {
            type: String,
            required: false,
            default: 'default'
        },
        custom_class: {
            type: String,
            required: false
        }
    })
</script>
<template>
    <div v-if="type === 'error'" :class="`p-4 text-slate-100 rounded-xl font-semibold bg-red-500 ${props.custom_class} custom_alert`">
        <p><slot/></p>
    </div>
    <div v-else="type === 'default'" :class="`p-4 text-slate-100 rounded-xl bg-slate-500 ${props.custom_class} custom_alert`">
        <p><span class="font-bold">Инфо: </span><slot/></p>
    </div>
</template>
<style scoped>
    @keyframes show {
        from {
            transform: scale(0.5);
            opacity: 0.4;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    .custom_alert {
        animation: show 0.3s ease-in-out;
    }
</style>