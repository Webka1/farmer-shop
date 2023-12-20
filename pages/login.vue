<script setup>
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

</script>
<template>
    <div class="rounded-3xl login-form pt-10 pb-10 pl-12 pr-12">
        <h1 class="font-black text-3xl">Войти в аккаунт</h1>
    </div>
</template>
<style scoped>
    .login-form {
        width: fit-content;
        margin: 0 auto;
        border: 1px solid #e4e4e4;
    }
</style>