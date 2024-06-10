<script setup>

const { data: user_data, error: user_error, pending } = await useFetch('/api/user/info')
import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    const formValues = ref({
        firstname: '',
        lastname: '',
        phone: '',
        email: ''
    })

    const getUserInfo = async () => {

        const user = user_data.value.user

        formValues.value.firstname = user.first_name
        formValues.value.lastname = user.last_name
        formValues.value.phone = user.phone_number
        formValues.value.email = user.email
    }
    
    const clearForm = async () => {

        formValues.value.firstname = ''
        formValues.value.lastname = ''
        formValues.value.phone = ''
        formValues.value.email = ''
    }
    
    const deliveryAdress = ref({
        city: '',
        street: '',
        zipcode: '',
        flat: '',
        entrance: '',
        floor: ''
    })

    import { useCartStore } from '~/store/cart.store';
    const cartStore = useCartStore()
    const { totalSum } = storeToRefs(cartStore)

    useSeoMeta({
        title: `${BRAND_NAME} - Оформление заказа`,
        ogTitle: `${BRAND_NAME} - Оформление заказа`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })
</script>
<template>
    <div>
        <div class="flex justify-center items-center mt-6">
            <div class="w-1/2 p-6 border rounded-2xl border-[#e4e4e4]">
                <UIPageTitle icon="📃">Оформление заказа</UIPageTitle>
                <div class="mt-6">
                    <p class="text-xl font-bold text-slate-600">Получатель: </p>
                    <p class="mb-2">
                        <span @click="getUserInfo"
                            class="text-sm font-medium text-green-500 underline cursor-pointer hover:text-green-400 transition">
                            Получать буду я
                        </span>
                        &emsp;
                        <span @click="clearForm"
                            class="text-sm font-medium text-red-500 underline cursor-pointer hover:text-red-400 transition">
                            Очистить
                        </span>
                    </p>
                    <div class="grid grid-cols-2 items-center  gap-4">
                        <div>
                            <p class="font-semibold text-gray-500">Имя:</p>
                            <UIInput v-model="formValues.firstname" width="100%" input_placeholder="Ваше имя"
                                input_name="firstname" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Фамилия: </p>
                            <UIInput v-model="formValues.lastname" width="100%" input_placeholder="Ваша фамилия"
                                input_name="lastname" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Телефон:</p>
                            <UIInput v-model="formValues.phone" width="100%" input_placeholder="Ваш телефон"
                                input_name="phone" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Почта: </p>
                            <UIInput v-model="formValues.email" width="100%" input_placeholder="Ваша почта"
                                input_name="email" />
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <p class="text-xl mb-2 font-bold text-slate-600">Адрес получателя:</p>
                    <div class="grid grid-cols-2 items-center  gap-4">
                        <div>
                            <p class="font-semibold text-gray-500">Город:</p>
                            <UIInput v-model="deliveryAdress.city" width="100%" input_placeholder="Например: Москва"
                                input_name="firstname" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Улица:</p>
                            <UIInput v-model="deliveryAdress.street" width="100%"
                                input_placeholder="Например: Московская" input_name="firstname" />
                        </div>
                    </div>
                    <div class="grid grid-cols-4 mt-2 items-center gap-4">
                        <div>
                            <p class="font-semibold text-gray-500">Подъезд:</p>
                            <UIInput v-model="deliveryAdress.entrance" width="100%" input_placeholder="1"
                                input_name="entrance" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Этаж:</p>
                            <UIInput v-model="deliveryAdress.floor" width="100%" input_placeholder="2"
                                input_name="floor" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Квартира:</p>
                            <UIInput v-model="deliveryAdress.flat" width="100%" input_placeholder="48"
                                input_name="flat" />
                        </div>
                        <div>
                            <p class="font-semibold text-gray-500">Почтовый индекс:</p>
                            <UIInput v-model="deliveryAdress.zipcode" width="100%" input_placeholder="121500"
                                input_name="zipcode" />
                        </div>
                    </div>
                </div>
                <div class="mt-6 border-2 border-dashed p-2 border-slate-400">
                    <p>Доставка: <span class="text-green-500 font-semibold">Курьером магазина (0 руб.)</span></p>
                    <p>Способ оплаты: <span class="text-green-500 font-semibold">При получении</span></p>
                    <p>К оплате: <span class="text-green-500 font-semibold">{{ totalSum.toLocaleString('ru-RU', {
                        style: 'currency',
                        currency: 'RUB'
                    }) }}</span></p>
                </div>
                <UIButton class="mt-6" button_type="success">Разместить заказ</UIButton>
            </div>
        </div>
    </div>
</template>
<style scoped></style>