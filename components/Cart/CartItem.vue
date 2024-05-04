<template>
    <div class="p-6 rounded-xl shadow-lg" v-animate>
        <div class="grid grid-cols-7 items-center gap-2 justify-between">
            <div class="relative">
                <NuxtImg class="rounded-xl fixed-img" :src="props.item.item_image" :class="{
                    'border-2 border-red-500': props.item.item_is_sale
                }" />
                <span v-if="props.item.item_is_sale"
                    class="bg-red-500 text-white font-semibold pl-2 pr-2 rounded-bl-xl rounded-tr-xl text-xs absolute bottom-0 left-0">SALE</span>
            </div>
            <div class="col-span-2">
                <span class="text-gray-400 text-xs">НАИМЕНОВАНИЕ</span>
                <p class="font-semibold -mt-1">{{ props.item.item_name }}</p>
            </div>
            <div>
                <span class="text-gray-400 text-xs">КОЛ-ВО</span>
                <p class="-mt-1">{{ props.item.quantity }} шт.</p>
            </div>
            <div>
                <span class="text-gray-400 text-xs">ЦЕНА ЗА ЕД.</span>
                <p v-if="props.item.item_is_sale" class="-mt-1 text-red-500">
                    {{ Math.floor(props.item.item_price - ((props.item.item_price * props.item.item_discount) /
                    100)).toLocaleString('ru-ru',
                    {
                    style: 'currency',
                    currency: 'RUB'
                    }) }}
                </p>
                <p v-else class="-mt-1">
                    {{ props.item.item_price.toLocaleString('ru-ru',
                    {
                    style: 'currency',
                    currency: 'RUB'
                    }) }}
                </p>
            </div>
            <div>
                <span class="text-gray-400 text-xs">ИТОГ</span>
                <p v-if="!props.item.item_is_sale" class="-mt-1">{{ (props.item.quantity *
                    props.item.item_price).toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB'
                    }) }}</p>
                <p v-else class="-mt-1">
                    {{
                    Math.floor(props.item.quantity * Math.floor((props.item.item_price - ((props.item.item_price *
                    props.item.item_discount) / 100)))) .toLocaleString('ru-ru', {
                    style: 'currency',
                    currency: 'RUB'
                    })
                    }}
                </p>
            </div>
            <UIButton width="fit" button_type="loading" v-if="is_loading"></UIButton>
            <div v-else class="flex gap-2">
                <button @click="addItemToCart(props.item.id)"
                    class="transition hover:bg-green-600 font-semibold w-8 h-8 text-white rounded-lg bg-green-500">
                    <span>+</span>
                </button>
                <button @click="removeItemFromCart(props.item.id)"
                    class="transition hover:bg-red-600 font-semibold w-8 h-8 text-white rounded-lg bg-red-500">
                    <span>-</span>
                </button>
            </div>

        </div>
    </div>
</template>
<script setup>

    const props = defineProps({
        item: {
            required: true
        }
    })

    import { useCartStore } from '~/store/cart.store'
    
    const cartStore = useCartStore()
    const { is_loading, error } = storeToRefs(cartStore)
    
    const { addToCart, removeFromCart } = useCartStore()

    async function addItemToCart(item_id) {
        // addToCart(item_id)

        addToCart(item_id)
    }

    async function removeItemFromCart(item_id) {
        // addToCart(item_id)

        removeFromCart(item_id)
    }

</script>
<style scoped>
    .fixed-img img, .fixed-img {
        width: 75px;
        /* устанавливаем ширину */
        height:75px;
        /* устанавливаем высоту */
        object-fit: cover;
        /* сохраняем пропорции изображения */
    }
</style>