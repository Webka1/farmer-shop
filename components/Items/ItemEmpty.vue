<script setup>
    const props = defineProps({
        image: {
            type: String,
            default: '/img/2936983.png'
        },
        image_size: {
            type: Number,
            default: 100
        },
        title: {
            type: String,
            default: 'Нет данных'
        },
        description: {
            type: String,
            default: 'Нет данных'
        },
        button_enabled: {
            type: Boolean,
            default: false
        },
        button_text: {
            type: String,
            default: 'Вернуться назад'
        },
        button_link: {
            type: String,
            default: '/'
        }
    })
</script>
<template>
    <div class="flex justify-center items-center" v-auto-animate>
        <div>
            <NuxtImg class="mx-auto" :height="props.image_size" :src="props.image"/>
            <h3 class="text-center text-2xl text-slate-800 font-semibold mt-4">{{ props.title }}</h3>
            <p class="text-center mt-1 tex-md text-slate-400 font-semibold">{{ props.description }}</p>

            <div class="mt-6 flex justify-center" v-if="props.button_enabled">
                <NuxtLink :to="props.button_link">
                    <UIButton width="fit" with_icon="true" size="large" button_type="success">{{ props.button_text }}</UIButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>