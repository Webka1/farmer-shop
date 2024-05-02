<template>
    <div class="p-6 rounded-xl shadow-lg" v-animate>
        <div class="flex items-center gap-4 justify-between">
            <div>
                <NuxtImg class="fixed-img rounded-xl" :src="props.item.item_image" />
            </div>
            <div>
                <span class="text-gray-400 text-xs">НАИМЕНОВАНИЕ</span>
                <p class="font-semibold -mt-1">{{ props.item.item_name }}</p>
            </div>
            <div>
                <span class="text-gray-400 text-xs">КОЛ-ВО</span>
                <p class="-mt-1">{{ props.item.quantity }} шт.</p>
            </div>
            <div>
                <span class="text-gray-400 text-xs">ЦЕНА ЗА ЕД.</span>
                <p class="-mt-1">{{ props.item.item_price.toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB'
                    }) }}</p>
            </div>
            <div>
                <span class="text-gray-400 text-xs">ИТОГ</span>
                <p class="-mt-1">{{ (props.item.quantity * props.item.item_price).toLocaleString('ru-RU', {
                    style: 'currency',
                    currency: 'RUB'
                }) }}</p>
            </div>
            <UIButton width="fit" button_type="loading" v-if="is_loading">errew</UIButton>
            <div v-else class="flex gap-2">
                <button @click="addItemToCart(props.item.id)"
                    class="transition hover:bg-green-600 font-semibold w-10 h-10 text-white rounded-lg bg-green-500">
                    <span>+1</span>
                </button>
                <button @click="removeItemFromCart(props.item.id)"
                    class="transition hover:bg-red-600 font-semibold w-10 h-10 text-white rounded-lg bg-red-500">
                    <span>-1</span>
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
    .fixed-img {
        width: 75px;
        /* устанавливаем ширину */
        height:75px;
        /* устанавливаем высоту */
        object-fit: cover;
        /* сохраняем пропорции изображения */
    }
</style>