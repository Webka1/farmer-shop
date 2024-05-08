<script setup>
    const { toggleCart, isOpenedCart } = inject('toggleCart')

    const props = defineProps({
        isLoggedIn: Boolean
    })

    const userIsLoggedIn = ref(props.isLoggedIn)

    const cartStore = useCartStore()
    const { items, error, totalSum } = storeToRefs(cartStore)

    if(error.value) {
        console.log('Error from cart: ', error)
    }
    
</script>
<template>
    <div>
        <div @click="toggleCart" class="fixed cursor-pointer top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
        <div class="bg-white w-[800px] h-full fixed right-0 top-0 z-20 p-8" v-auto-animate>
            <h2 class="font-black text-3xl">Корзина</h2>

            <div v-if="userIsLoggedIn" class="h-3/4 overflow-auto mt-4">
                <CartItem v-animate v-for="item in items" :item="item" />
            </div>
            <p v-else>Сначала войдите в аккаунт</p>


            <div class="pt-4 pb-4" v-if="userIsLoggedIn">
                <div class="flex justify-between gap-4 text-gray-700">
                    <p>
                        <span>Кол-во наименований в корзине:</span><br>
                        <span>Сумма товаров в корзине:</span><br>
                        <span>Комиссия сервиса:</span><br>
                        <span class="text-lg font-semibold text-gray-900">ИТОГО:</span>
                    </p>
                    <p class="text-right">
                        <span>{{ items.length }} шт.</span><br>
                        <span>{{ totalSum.toLocaleString('ru-ru', {
                            style: 'currency',
                            currency: 'RUB'
                            }) }}</span><br>
                        <span class="font-semibold text-green-500">{{ 0o0.toLocaleString('ru-ru', {
                            style: 'currency',
                            currency: 'RUB'
                            }) }}</span><br>
                        <span class="font-bold text-gray-900">
                            {{ totalSum.toLocaleString('ru-ru', {
                            style: 'currency',
                            currency: 'RUB'
                            }) }}
                        </span>
                    </p>
                </div>

                <NuxtLink to="/placeorder">
                    <UIButton @click_fn="toggleCart" size="large" class="mt-4" button_type="success">Перейти к оформлению заказа</UIButton>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>