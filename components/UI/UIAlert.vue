<script setup>
import { stringifyQuery } from 'vue-router';

    const props = defineProps({
        type: {
            type: String,
            required: false,
            default: 'default'
        },
        custom_class: {
            type: stringifyQuery,
            required: false
        }
    })
</script>
<template>
    <div v-if="type === 'error'" :class="`p-4 text-slate-100 rounded-xl bg-red-500 ${props.custom_class}`">
        <p><span class="font-bold">Ошибка: </span><slot/></p>
    </div>
    <div v-else="type === 'default'" :class="`p-4 text-slate-100 rounded-xl bg-slate-500 ${props.custom_class}`">
        <p><span class="font-bold">Инфо: </span><slot/></p>
    </div>
</template>