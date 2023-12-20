<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Авторизация`,
        ogTitle: `${BRAND_NAME} - Авторизация`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    const router = useRouter()
    const isLoadingStore = useIsLoadingStore()
    const authStore = useAuthStore()

    const email = ref('')
    const password = ref('')

    const login = async () => {
        isLoadingStore.set(true)

        // создам сессию (атворизация крч)
        await account.createEmailSession(email.value, password.value)

        // после авторизации получаем данные об аккаунте
        const response = await account.get()

        // если есть респонс, то в стор добавляем юзера
        if(response) {
            authStore.set({
                email: response.email,
                name: response.name,
                status: response.status
            })
        }

        email.value = ''
        password.value = ''

        await router.push('/')

        isLoadingStore.set(false)
    }

    import { Field, Form, ErrorMessage } from 'vee-validate';

    function isRequired(value) {
    if (value && value.trim()) {
        return true;
    }

    return 'Обязательное поле';
    }

</script>
<template>
    <div class="rounded-3xl login-form p-10">
        <h1 class="font-black text-3xl">Войти в аккаунт</h1>
        <Form class="mt-8">
            <div>
                <label for="login">Логин: </label><br>
                <Field name="login" placeholder="example@example.com" class="form-input-custom mt-1" :rules="isRequired" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="login" />
            </div>
            <div class="mt-4">
                <label for="login">Пароль: </label><br>
                <Field name="password" type="password" placeholder="**************" class="form-input-custom mt-1" :rules="isRequired" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="password" />
            </div>
            <div class="mt-4">
                <UIButton type="success">Войти</UIButton>
            </div>
            <div class="flex items-center justify-between mt-4">
                <UILink type="error" link="/reset-password">Забыли пароль?</UILink>
                <UILink bold="true" link="/register">Зарегистрироваться</UILink>
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