<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';
    
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/store/auth.store'
    
    import { login_rules } from '@/utils/validators'
    import { useVuelidate } from '@vuelidate/core';

    const router = useRouter()

    const authsStore = useAuthStore()
    const { authenticated, error, loading } = storeToRefs(authsStore)

    watch(() => {
        console.log('Auth in login.vue watch: ', authenticated.value)

        if (authenticated.value === true) {
            router.push('/')
        }
    })

    // SEO
    useSeoMeta({
        title: `${BRAND_NAME} - Авторизация`,
        ogTitle: `${BRAND_NAME} - Авторизация`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    // USER INPUTS
    const formData = reactive({
        email: '',
        password: ''
    })


    // FIELDS VALIDATE
    const v$ = useVuelidate(login_rules, formData)


    // LOGIN ACTION
    const login_user = async () => {
        v$.value.$validate();
        if (!v$.value.$error) {
            await authsStore.login(formData.email, formData.password)
        }
    }

</script>
<template>
    <div>
        <div class="rounded-3xl login-form p-10">
            <h1 class="font-black text-3xl">Войти в аккаунт</h1>
            <UIAlert class="mt-4" v-if="error" type="error">{{ error }}</UIAlert>
            <form @submit.prevent="login_user">
                <div class="mt-4 flex flex-col">
                    <label for="login">Логин: </label>
                    <input @change="v$.email.$touch" v-model="formData.email" type="text" name="login" placeholder="example@example.com" class="form-input-custom mt-1" :class="{
                        'form-input-error mt-1': v$.email.$error
                    }">
                    <div class="text-xs text-red-500 mt-1" v-for="error in v$.email.$errors">
                        {{ error.$message }}
                    </div>
                </div>
                <div class="mt-4 flex flex-col">
                    <label for="password">Пароль: </label>
                    <input @change="v$.password.$touch" v-model="formData.password" type="password" name="password" placeholder="**********" class="form-input-custom mt-1" :class="{
                        'form-input-error mt-1': v$.password.$error
                    }">
                    <div class="text-xs text-red-500 mt-1" v-for="error in v$.password.$errors">
                        {{ error.$message }}
                    </div>
                </div>
                <div class="mt-4">
                    <UIButton v-if="!loading" type="submit" button_type="success">
                        Войти
                    </UIButton>
                    <UIButton v-else type="button" button_type="loading"/>
                </div>
                <div class="flex items-center justify-between mt-4">
                    <UILink type="error" link="/">Забыли пароль?</UILink>
                    <UILink :bold="true" link="/register">Зарегистрироваться</UILink>
                </div>
            </form>
        </div>
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
        @apply border-slate-400 rounded-2xl transition outline-none p-2 hover:border-slate-500 focus:border-green-500
    }
    .form-input-error {
        border: 1px solid;
        width: 400px;
        @apply border-red-400 rounded-2xl transition outline-none p-2 hover:border-red-500 focus:border-red-500
    }
</style>