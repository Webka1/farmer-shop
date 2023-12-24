import { required, email, helpers } from '@vuelidate/validators';

export const login_rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage('Это обязательное поле', required),
            email: helpers.withMessage('Почта указана неверно', email)
        },
        password: {
            required: helpers.withMessage('Это обязательное поле', required),
        }
    }
})