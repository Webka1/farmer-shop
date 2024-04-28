<script setup>
    const props = defineProps({
        input_type: String,
        input_name: String,
        input_placeholder: String,
        width: {
            type: String,
            required: false,
            default: '400px'
        }
    })

    const model = defineModel()
</script>
<template>
    <input 
        :type="props.input_type" 
        :name="props.input_name" 
        :placeholder="props.input_placeholder" 
        class="form-input-custom mt-1"

        :style="{ width: props.width }"

        v-model="model"
    />
</template>
<style scoped>
    .form-input-custom {
        border: 1px solid;
        @apply border-slate-400 rounded-2xl transition outline-none p-2 hover:border-slate-500 focus:border-green-500
    }
</style>