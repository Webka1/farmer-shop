<script setup>
    const { toggleCart, isOpenedCart } = inject('toggleCart')

    const props = defineProps({
        isLoggedIn: Boolean
    })

    const userIsLoggedIn = ref(props.isLoggedIn)

    const cartStore = useCartStore()
    const { items, error, totalSum } = storeToRefs(cartStore)

    // if(!items.value.items) {
    //     await cartStore.getCartItems
    // }

    if(error.value) {
        console.log('Error from cart: ', error)
    }
</script>
<template>
    <div>
        <div @click="toggleCart" class="fixed  cursor-pointer top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
        <div class="bg-white w-[800px] h-full fixed right-0 top-0 z-20 p-8" v-auto-animate>
            <h2 class="font-black text-3xl">Корзина</h2>

            <CartItem v-if="userIsLoggedIn" class="mt-4" v-for="item in items" :item="item"/>
            <p v-else>Сначала войдите в аккаунт</p>


            <div v-if="userIsLoggedIn">
                Итоговая корзина (руб): {{ totalSum.toLocaleString('ru-ru', {
                    style: 'currency',
                    currency: 'RUB'
                }) }}
            </div>
        </div>
    </div>
</template>