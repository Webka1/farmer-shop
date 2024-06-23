<script setup>

    import { BRAND_NAME, SITE_DESCRIPTION } from '~/app.constants';
    const { authenticated } = storeToRefs(useAuthStore())
    import { register_rules } from '@/utils/validators'
    import { useVuelidate } from '@vuelidate/core';


    // seo 
    useSeoMeta({
        title: `${BRAND_NAME} - Регистрация`,
        ogTitle: `${BRAND_NAME} - Регистрация`,
        description: SITE_DESCRIPTION,
        ogDescription: SITE_DESCRIPTION
    })

    // REDIRECT IF AUTH

    const router = useRouter()
    if(authenticated.value == true) {
        router.push('/profile')
    }


    // USER INPUTS
    const formData = reactive({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: ''
    })

    // FETCH
    const is_loading = ref(false)
    const is_error = ref('')


    // FIELDS VALIDATE
    const v$ = useVuelidate(register_rules, formData)

    const register = async (e) => {
        v$.value.$validate();
        if (!v$.value.$error) {
            is_loading.value = true
            try {
                const request = await $fetch('/api/register', {
                    method: 'POST',
                    body: { formData }
                })

                is_error.value = ''
                if(request.error) {
                    is_error.value = request.reason
                } else {
                    router.push('/login')
                    is_error.value = ''
                }
            } catch (error) {
                console.log(error)
                is_error.value = error.message
            } finally {
                is_loading.value = false
            }
        }
    }

</script>
<template>
   <div>
        <div class="rounded-3xl login-form p-3 lg:p-10 xl:p-10 sm:p-1">
            <h1 class="font-black text-3xl">Зарегистрироваться</h1>
            <UIAlert v-if="is_error" class="mt-4" type="error">{{ is_error }}</UIAlert>
            <form @submit.prevent="register">
                <div class="mt-4 flex flex-col">
                    <label for="login">Почта: </label>
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
                <div class="flex items-center flex-wrap justify-between mt-4 gap-4">
                    <div class="flex flex-col">
                        <label for="password">Имя: </label>
                        <input @change="v$.first_name.$touch" v-model="formData.first_name" type="text" name="password" placeholder="Иван" class="form-input-custom mt-1" :class="{
                            'form-input-error mt-1': v$.first_name.$error
                        }">
                        <div class="text-xs text-red-500 mt-1" v-for="error in v$.first_name.$errors">
                            {{ error.$message }}
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <label for="password">Фамилия: </label>
                        <input @change="v$.last_name.$touch" v-model="formData.last_name" type="text" name="password" placeholder="Фамилия" class="form-input-custom mt-1" :class="{
                            'form-input-error mt-1': v$.last_name.$error
                        }">
                        <div class="text-xs text-red-500 mt-1" v-for="error in v$.last_name.$errors">
                            {{ error.$message }}
                        </div>
                    </div>
                </div>
                <div class="mt-4 flex flex-col">
                    <label for="password">Телефон: </label>
                    <input @change="v$.phone_number.$touch" v-model="formData.phone_number" type="text" name="password" placeholder="71112223344" class="form-input-custom mt-1" :class="{
                        'form-input-error mt-1': v$.phone_number.$error
                    }">
                    <div class="text-xs text-red-500 mt-1" v-for="error in v$.phone_number.$errors">
                        {{ error.$message }}
                    </div>
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
        max-width: 500px;
        width: 100%;
        @apply border-slate-400 rounded-2xl w-full transition outline-none p-2 hover:border-slate-500 focus:border-green-500
    }
    .form-input-error {
        border: 1px solid;
        max-width: 500px;
        width: 100%;
        @apply border-red-400 rounded-2xl w-full transition outline-none p-2 hover:border-red-500 focus:border-red-500
    }
</style>