<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';
    import { Field, Form, ErrorMessage } from 'vee-validate';
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/store/auth.store'

    const router = useRouter()
    const { login } = useAuthStore();
    const { authenticated, error, loading } = storeToRefs(useAuthStore())

    if(authenticated.value == true) {
        router.push('/profile')
    }

    // SEO
    useSeoMeta({
        title: `${BRAND_NAME} - Авторизация`,
        ogTitle: `${BRAND_NAME} - Авторизация`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    // USER INPUTS
    const email = ref('')
    const password = ref('')

    // LOGIN ACTION
    async function login_user(values) {
        await login(email.value, password.value)
        
        if(authenticated.value == true) {
            router.push({
                path: '/profile/'
            })
        }

    }


    // FIELDS VALIDATE
    function isRequired(value) {
        if (value && value.trim()) {
            return true;
        }

        return 'Обязательное поле';
    }

</script>
<!-- TODO: 'СДЕЛАТЬ РЕДИРЕКТ ТАМ И АНИМАЦИИ ИЛИ ОПОВЕЩЕНИЕ О УСПЕШНОЙ АВТОРИЗАЦИИ И НУ ЕЩЕ ЧОТО' -->
<template>
    <div class="rounded-3xl login-form p-10">
        <h1 class="font-black text-3xl">Войти в аккаунт</h1>
        <div class="mb-4">&emsp;<UIAlert v-if="error" type="error">{{ error }}</UIAlert></div>
        <Form @submit="login_user" class="mt-4">
            <div>
                <label for="login">Логин: </label><br>
                <Field v-model="email" name="login" placeholder="example@example.com" class="form-input-custom mt-1" :rules="isRequired" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="login" />
            </div>
            <div class="mt-4">
                <label for="login">Пароль: </label><br>
                <Field v-model="password" name="password" type="password" placeholder="**************" class="form-input-custom mt-1" :rules="isRequired" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="password" />
            </div>
            <div class="mt-4">
                <UIButton v-if="!loading" type="submit" button_type="success">
                    Войти
                </UIButton>
                <UIButton v-else type="button" button_type="loading"/>
            </div>
            <div class="flex items-center justify-between mt-4">
                <UILink type="error" link="/reset-password">Забыли пароль?</UILink>
                <UILink :bold="true" link="/register">Зарегистрироваться</UILink>
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
        width: 400px;
        @apply border-slate-400 rounded-md transition outline-none p-2 hover:border-slate-500 focus:border-green-500
    }
</style>