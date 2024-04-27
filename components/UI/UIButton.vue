<script setup>

// TODO: REFACTOR BUTTONS

    const props = defineProps({
        button_type: {
            type: String,
            default: 'default',
            required: false,
        },
        size: {
            type: String,
            default: 'normal',
            required: false,
        },
        width: {
            type: String,
            default: 'full',
            required: false,
        },
        type: {
            type: String,
            default: 'button',
            required: false
        },
        custom_class: {
            type: String,
            required: false
        },
        font: {
            type: String,
            default: 'normal',
            required: false
        },
        with_icon: {
            type: Boolean,
            default: false,
            required: false
        },
        icon: {
            type: String,
            default: 'solar:arrow-left-linear',
            required: false
        }
    })

    const emit = defineEmits(['click_fn'])
</script>
<template>
    <button 
        @click="$emit('click_fn')"
        :class="{
            'w-full': props.width === 'full',
            'w-fit pl-7 pr-7': props.width === 'fit',
            'w-auto pl-7 pr-7': props.width === 'auto',
            custom_class,
            'transition text-white bg-green-500 rounded-2xl hover:bg-green-400': props.button_type === 'success',
            'transition text-white bg-slate-500 rounded-2xl hover:bg-slate-400': props.button_type === 'default',
            'transition text-white bg-red-500 rounded-2xl hover:bg-red-400': props.button_type === 'error',
            'transition text-white bg-slate-500 rounded-2xl hover:bg-slate-400': props.button_type === 'loading',
            'p-2': props.size === 'normal',
            'p-3 text-md': props.size === 'large',
            'p-1': props.size === 'small',
            'font-bold': props.font === 'bold',
            'font-semibold': props.font === 'normal',
        }"
    >

        <div v-if="props.button_type === 'loading'" role="status">
            <svg aria-hidden="true" class="inline w-5 h-5 text-gray-500 animate-spin  fill-gray-300 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        <div class="flex items-center justify-center gap-2" v-else-if="props.with_icon">
            <div class="mt-[-1px]">
                <Icon :name="props.icon" width="20" height="20"/>
            </div>
            <div>
                <slot/>
            </div>
        </div>
        <div v-else>
            <slot/>
        </div>

    </button>
</template>