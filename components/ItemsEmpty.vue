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
        }
    })
</script>
<template>
    <div class="flex justify-center items-center" v-auto-animate>
        <div>
            <NuxtImg class="mx-auto" :height="props.image_size" :src="props.image"/>
            <h3 class="text-center text-2xl text-slate-800 font-semibold mt-4">{{ props.title }}</h3>
            <p class="text-center text-slate-400 font-semibold">{{ props.description }}</p>
        </div>
    </div>
</template>