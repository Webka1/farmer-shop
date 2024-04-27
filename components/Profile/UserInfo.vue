<template>
    <div class="shadow-lg rounded-xl p-8">
        <div class="flex gap-4 items-center">
            <div
                class="flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 text-slate-400 font-bold text-[35px]">
                {{ user_data.user.first_name.substring(0, 1) }}
            </div>
            <div class="font-bold text-2xl">
                {{ user_data.user.first_name }} {{ user_data.user.last_name }} <span title="Персональная скидка" class="text-base text-green-500">({{ user_data.user.personal_discound }}%)</span>
            </div>
        </div>
        <div class="user_info__desc mt-10">
            <p class="text-lg text-slate-500">Почта: <span title="Нажмите чтобы открыть\закрыть" @click="(() => {
                    is_user_hidden.email = !is_user_hidden.email
                })" :class="{
                    'blur-sm': is_user_hidden.email
                }" class="cursor-pointer text-black ml-4 select-none">{{ user_data.user.email }}</span></p>
            <p class="text-lg text-slate-500">Телефон: <span title="Нажмите чтобы открыть\закрыть" @click="(() => {
                    is_user_hidden.phone = !is_user_hidden.phone
                })" :class="{
                    'blur-sm': is_user_hidden.phone
                }" class="cursor-pointer text-black ml-4 select-none">{{ phoneFormat(user_data.user.phone_number)
                    }}</span></p>
        </div>
    </div>
</template>
<script setup>
    import { phoneFormat } from '~/utils/formatters'

    const { data: user_data, error: user_error } = await useFetch('/api/user/info')

    const is_user_hidden = ref({
        email: true,
        phone: true
    })
</script>