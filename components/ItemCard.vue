<script setup>
    const props = defineProps({
        id: Number,
        image: String,
        title: String,
        price: Number,
        url: String,
        isAdded: Boolean,
        isFavorite: Boolean,
        onClickAdd: Function,
        onClickFavorite: Function
    })
</script>

<template>
    <div class="rounded-b-3xl w-96 hover:shadow-sm group animka">
        <img class="rounded-t-3xl w-96" :src="props.image" alt="">
        <div class="w-96 transition p-4 border border-b border-l border-r border-slate-300 group-hover:border-b-slate-500 group-hover:border-l-slate-500 group-hover:border-r-slate-500 rounded-b-3xl text-wrap">
            <p class="text-black text-xl text-wrap">
                {{ props.title }}
            </p>
            <div class="flex mt-4 items-end justify-between">
                <div class="font-bold text-xl">
                    <span class="text-slate-600 text-sm font-normal">ЦЕНА:</span><br>
                    {{ props.price.toLocaleString('ru-ru', {
                        style: 'currency',
                        currency: 'RUB'
                    }) }}
                </div>
                <div class="flex items-center justify-center gap-2">
                    <div @click="onClickFavorite" v-if="isFavorite" class="p-2 border border-pink-100 bg-pink-100 rounded-xl cursor-pointer">
                        <Icon class="text-pink-500" name="solar:heart-bold" width="20" height="20"/>
                    </div>
                    <div @click="onClickFavorite" v-else class="p-2 border border-slate-300 rounded-xl cursor-pointer">
                        <Icon class="text-slate-500" name="solar:heart-outline" width="20" height="20"/>
                    </div>
                    <div v-if="isAdded" class="p-2 border border-green-100 bg-green-100 rounded-xl cursor-pointer">
                        <Icon class="text-green-500" name="solar:cart-large-minimalistic-bold" width="20" height="20"/>
                    </div>
                    <div @click="onClickAdd" v-else class="p-2 border border-slate-300 rounded-xl cursor-pointer">
                        <Icon class="text-slate-500" name="solar:cart-large-minimalistic-outline" width="20" height="20"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>