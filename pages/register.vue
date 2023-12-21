<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';
    import { Field, Form, ErrorMessage } from 'vee-validate';


    // seo 
    useSeoMeta({
        title: `${BRAND_NAME} - Регистрация`,
        ogTitle: `${BRAND_NAME} - Регистрация`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })


    // VUE QUERY INIT
    const queryClient = useQueryClient()


    // USER INPUTS
    const email = ref('') // login
    const password = ref('') // зашифровать бы его по хорошему)
    const first_name = ref('')
    const last_name = ref('')
    const phone_number = ref('')


    // FETCH
    const is_loading = ref(false)
    const is_error = ref('')

    // REGUSTER FUNCTION
    const register = async (e) => {
        is_loading.value = true
        try {
            const request = await $fetch('/api/register', {
                method: 'POST',
                body: {
                    email: email.value,
                    password: password.value,
                    first_name: first_name.value,
                    last_name: last_name.value,
                    phone_number: phone_number.value
                },
            })

            is_error.value = ''
            if(request.error) {
                is_error.value = request.reason
            }
        } catch (error) {
            console.log(error)
            is_error.value = error.message
        } finally {
            is_loading.value = false
        }
    }


    // FIELDS VALIDATOR
    function isRequired(value) {
        if (value && value.trim()) {
            return true
        }

        return 'Обязательное поле';
    }

    function isEmail(value) {
        if(value && value.trim()) {
            const str = String(value.trim())
            if(str.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return true
            }

            return 'Неверно указан email'
        }

        return 'Почта обязательна для регистрации';
    }

    function isPhone(value) {
        if(value && value.trim()) {
            const str = String(value.trim())
            if(str.toLowerCase().match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm)) {
                return true
            }

            return 'Неверный номер телефона'
        }

        return 'Телефон обязателен для регистрации';
    }


</script>
<!-- TODO: ANIMATIONS -->
<template>
    <div class="rounded-3xl login-form p-10">
        <h1 class="font-black text-3xl">Зарегистрироваться</h1>
        <UIAlert v-if="is_error" custom_class="mt-4" type="error">{{ is_error }}</UIAlert>
        <Form @submit="register" class="mt-8">
            <div>
                <label for="login">Логин: </label><br>
                <Field v-model="email" autocomplete="off" name="login" type="email" placeholder="example@example.com" class="form-input-custom mt-1" :rules="isEmail"/><br>
                <ErrorMessage class="text-red-500 text-xs" name="login" />
            </div>
            <div class="mt-4">
                <label for="login">Пароль: </label><br>
                <Field v-model="password" name="password" type="password" placeholder="**************" class="form-input-custom mt-1" :rules="isRequired" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="password" />
            </div>
            <div class="flex items-center justify-between mt-4 gap-4">
                <div>
                    <label for="name">Имя: </label><br>
                    <Field v-model="first_name" name="name" type="text" placeholder="Иван" class="form-input-custom mt-1" :rules="isRequired" /><br>
                    <ErrorMessage class="text-red-500 text-xs" name="name" />
                </div>
                <div>
                    <label for="lastname">Фамилия: </label><br>
                    <Field v-model="last_name" name="lastname" type="text" placeholder="Иванов" class="form-input-custom mt-1" :rules="isRequired" /><br>
                    <ErrorMessage class="text-red-500 text-xs" name="lastname" />
                </div>
            </div>
            <div class="mt-4">
                <label for="phone">Телефон: </label><br>
                <Field v-model="phone_number" name="phone" type="text" placeholder="+71112223344" class="form-input-custom mt-1" :rules="isPhone" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="phone" />
            </div>
            <div class="mt-4">
                <UIButton v-if="!is_loading" type="submit" button_type="success">
                    Зарегистрироваться
                </UIButton>
                <UIButton v-else type="button" button_type="loading"/>
            </div>
            <div class="flex items-center justify-between mt-4">
                <UILink :bold="true" link="/login">Уже есть аккаунт?</UILink>
            </div>
        </Form>
    </div>
</template>
<style scoped>
    .login-form {
        width: fit-content;
        margin: 0 auto;
        border: 1px solid #e4e4e4;
    }
    .form-input-custom {
        border: 1px solid;
        @apply border-slate-400 rounded-md w-full transition outline-none p-2 hover:border-slate-500 focus:border-green-500
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>