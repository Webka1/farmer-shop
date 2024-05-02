<script setup>
    const props = defineProps({
        id: Number,
        image: String,
        title: String,
        price: Number,
        url: String,
        isSale: Boolean,
        itemDiscount: Number,
        isAdded: Boolean,
        isFavorite: Boolean,
        isFavroiteLoadingProp: Boolean,
        isCartLoadingProp: Boolean,
        onClickAdd: Function,
        onClickFavorite: Function
    })

    const isFavroiteLoading = ref(false)

    watch(() => props.isFavroiteLoadingProp, (value) => {
        isFavroiteLoading.value = value
    })

    import { useAuthStore } from '~/store/auth.store';
    const authStore = useAuthStore()
    const { authenticated } = storeToRefs(authStore)
</script>

<template>
    <div v-auto-animate class="rounded-b-3xl w-96 hover:shadow-2xl group transition-all duration-150 hover:mt-[-10px]">
        <NuxtImg class="rounded-t-3xl custom-class-image" :src="props.image" loading="lazy" />
        <div class="w-96 transition p-4 border border-b border-l border-r border-slate-300 rounded-b-3xl text-wrap">
            <p class="text-black text-xl text-wrap">
                {{ props.title }}
            </p>
            <div class="flex mt-4 items-end justify-between">
                <div class="font-bold text-xl">
                    <span class="text-slate-600 text-sm font-normal">ЦЕНА <span
                            class="text-[12px] font-bold text-slate-400 line-through" v-if="props.isSale">{{
                            props.price.toLocaleString('ru-ru', {
                            style: 'currency',
                            currency: 'RUB'
                            }) }}</span></span><br>
                    <span :class="{
                            'text-red-500': isSale
                        }">
                        {{ Math.floor(props.price - ((props.price * props.itemDiscount) / 100)).toLocaleString('ru-ru',
                        {
                        style: 'currency',
                        currency: 'RUB'
                        }) }}
                    </span>
                </div>
                <div class="flex items-center justify-center gap-2">
                    <div title="Скидка" v-if="props.isSale"
                        class="p-2 h-[42.5px] border-slate-300 rounded-xl bg-red-500 text-white font-bold cursor-pointer">
                        10%
                    </div>
                    <div v-if="isFavroiteLoading" class="p-2 border border-slate-300 rounded-xl cursor-pointer">
                        <div role="status">
                            <svg aria-hidden="true"
                                class="inline w-5 h-5 text-slate-500 animate-spin  fill-gray-300 dark:fill-gray-300"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                        </div>
                    </div>
                    <div @click="onClickFavorite" v-else-if="isFavorite && !isFavroiteLoading && authenticated"
                        class="p-2 border border-pink-100 bg-pink-100 transition hover:bg-pink-200 hover:border-pink-200 rounded-xl cursor-pointer">
                        <Icon class="text-pink-500" name="solar:heart-bold" width="20" height="20" />
                    </div>
                    <div @click="onClickFavorite" v-else-if="!isFavorite && !isFavroiteLoading && authenticated"
                        class="p-2 border border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition rounded-xl cursor-pointer">
                        <Icon class="text-slate-500" name="solar:heart-outline" width="20" height="20" />
                    </div>
                    <div v-if="isCartLoadingProp" class="p-2 border border-slate-300 rounded-xl cursor-pointer">
                        <div role="status">
                            <svg aria-hidden="true"
                                class="inline w-5 h-5 text-slate-500 animate-spin  fill-gray-300 dark:fill-gray-300"
                                viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                        </div>
                    </div>
                    <div v-else-if="isAdded && !isCartLoadingProp && authenticated"
                        class="p-2 border border-green-100 bg-green-100 rounded-xl cursor-pointer">
                        <Icon class="text-green-500" name="solar:cart-large-minimalistic-bold" width="20" height="20" />
                    </div>
                    <div @click="onClickAdd" v-else-if="!isAdded && !isCartLoadingProp && authenticated"
                        class="p-2 border border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition rounded-xl cursor-pointer">
                        <Icon class="text-slate-500" name="solar:cart-large-minimalistic-outline" width="20"
                            height="20" />
                    </div>
                    <NuxtLink
                        class="p-2 border border-slate-300 hover:border-slate-400 hover:bg-slate-100 transition rounded-xl cursor-pointer"
                        to="/login" v-else>
                        <Icon class="text-slate-500" name="solar:cart-large-minimalistic-outline" width="20"
                            height="20" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-class-image {
        width: 384px;
        /* устанавливаем ширину */
        height: 300px;
        /* устанавливаем высоту */
        object-fit: cover;
        /* сохраняем пропорции изображения */
    }
</style>