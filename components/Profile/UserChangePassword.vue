<template>
    <div class="shadow-lg rounded-xl p-8">
        <p class="font-bold text-2xl">🔒 Изменить пароль</p>
        <UIAlert class="mt-4" type="error" v-if="error || change_error">
            {{ error || change_error }}
        </UIAlert>
        <div class="flex justify-center">
            <form @submit.prevent="change_password">
                <div class="mt-6">
                    <p class="text-slate-600">Старый пароль</p>
                    <UIInput width="auto" @change="v$.old_password.$touch" v-model="formData.old_password"
                        input_type="password" input_name="old_password" input_placeholder="Старый пароль" :class="{
                            'form-input-error mt-1': v$.old_password.$error
                        }" />
                    <div class="text-xs text-red-500 mt-1" v-for="error in v$.old_password.$errors">
                        {{ error.$message }}
                    </div>
                </div>
                <div class="mt-4">
                    <p class="text-slate-600">Новый пароль</p>
                    <UIInput width="auto" @change="v$.new_password.$touch" v-model="formData.new_password"
                        input_type="password" input_name="new_password" input_placeholder="Новый пароль" :class="{
                            'form-input-error mt-1': v$.new_password.$error
                        }" />
                    <div class="text-xs text-red-500 mt-1" v-for="error in v$.new_password.$errors">
                        {{ error.$message }}
                    </div>
                </div>
                <div class="mt-4">
                    <p class="text-slate-600">Повторите новый пароль</p>
                    <UIInput width="100%" @change="v$.repeat_new_password.$touch" v-model="formData.repeat_new_password"
                        input_type="password" input_name="repeat_new_password"
                        input_placeholder="Повторите новый пароль" :class="{
                        'form-input-error mt-1': v$.repeat_new_password.$error
                    }" />
                    <div class="text-xs text-red-500 mt-1" v-for="error in v$.repeat_new_password.$errors">
                        {{ error.$message }}
                    </div>
                </div>
                <div class="mt-6">
                    <UIButton v-if="!is_loading" type="submit" button_type="success">🔐 Сохранить</UIButton>
                    <UIButton v-else type="button" button_type="loading" />
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import useVuelidate from '@vuelidate/core';
    import { required, helpers, minLength, maxLength, sameAs, not } from '@vuelidate/validators';

    const formData = reactive({
        old_password: '',
        new_password: '',
        repeat_new_password: ''
    })

    // эта хуйня не выходит за пределы бля sameAs() не выносится
    const rules = {
        old_password: {
            required: helpers.withMessage('Это обязательное поле', required),
            minLength: helpers.withMessage('Пароль не должен быть меньше 6 символов', minLength(6)),
            maxLength: helpers.withMessage('Пароль не должен быть больше 30 символов', maxLength(30))
        },
        new_password: {
            required: helpers.withMessage('Это обязательное поле', required),
            minLength: helpers.withMessage('Пароль не должен быть меньше 6 символов', minLength(6)),
            maxLength: helpers.withMessage('Пароль не должен быть больше 30 символов', maxLength(30)),
            sameAs: helpers.withMessage('Новый пароль не должен совпадать со старым', not(sameAs(computed(() => formData.old_password))))
        },
        repeat_new_password: {
            required: helpers.withMessage('Это обязательное поле', required),
            sameAsPassword: helpers.withMessage('Пароли должны совпадать', sameAs(computed(() => formData.new_password)))
        }
    }

    const error = ref('')
    const is_loading = ref(false)


    const v$ = useVuelidate(rules, formData)

    const change_password = async () => {   
        v$.value.$validate()
        if (!v$.value.$error) {

            is_loading.value = true
            error.value = ''

            const { data: change_data, error:change_error } = await $fetch('/api/user/change-password', {
                body: {
                    old_password: formData.old_password,
                    new_password: formData.new_password
                },
                method: 'POST'
            }).then((response) => {
                if (response.error) {
                    error.value = response.reason
                } else {
                    alert(response.message)

                    formData.old_password = ''
                    formData.new_password = ''
                    formData.repeat_new_password = ''
                }
            }).finally(() => {
                is_loading.value = false
            })

            console.log(change_data, change_error)
        }
    }
</script>

<style scoped>
    .form-input-error {
        border: 1px solid;
        width: 400px;
        @apply border-red-400 rounded-2xl transition outline-none p-2 hover:border-red-500 focus:border-red-500
    }
</style>