<template>
  <select class="form-select-custom mt-1">
    <option v-for="option in props.options" :value="option.value">
        {{ option.name  }}
    </option>
  </select>
</template>

<script setup>
    const props = defineProps({
        options: {
            type: Array,
            required: true,
            value: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
    })
</script>

<style scoped>
    .form-select-custom {
        border: 1px solid;
        width: 400px;
        @apply border-slate-400 w-fit rounded-md transition outline-none p-[9.5px] hover:border-slate-500 focus:border-green-500 bg-white
    }
</style>