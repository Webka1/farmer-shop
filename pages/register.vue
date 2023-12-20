<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';

    useSeoMeta({
        title: `${BRAND_NAME} - Регистрация`,
        ogTitle: `${BRAND_NAME} - Регистрация`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    // TODO: 'Register action'

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
        <h1 class="font-black text-3xl">Зарегистрироваться</h1>
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
            <div class="flex items-center justify-between mt-4 gap-4">
                <div>
                    <label for="name">Имя: </label><br>
                    <Field name="name" type="text" placeholder="Иван" class="form-input-custom mt-1" :rules="isRequired" /><br>
                    <ErrorMessage class="text-red-500 text-xs" name="name" />
                </div>
                <div>
                    <label for="lastname">Фамилия: </label><br>
                    <Field name="lastname" type="text" placeholder="Иванов" class="form-input-custom mt-1" :rules="isRequired" /><br>
                    <ErrorMessage class="text-red-500 text-xs" name="lastname" />
                </div>
            </div>
            <div class="mt-4">
                <label for="phone">Телефон: </label><br>
                <Field name="phone" type="text" placeholder="+7000-000-00-00" class="form-input-custom mt-1" :rules="isRequired" /><br>
                <ErrorMessage class="text-red-500 text-xs" name="phone" />
            </div>
            <div class="mt-4">
                <UIButton type="success">Зарегистрироваться</UIButton>
            </div>
            <div class="flex items-center justify-between mt-4">
                <UILink bold="true" link="/login">Уже есть аккаунт?</UILink>
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
</style>