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
    <div 
        class="p-4 text-slate-100 rounded-xl font-semibold custom_alert"
        :class="{
            'bg-red-500': type === 'error',
            'bg-slate-500':  type === 'default',
            'bg-green-500': type === 'success'
        }, custom_class"
    >
        <slot/>
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