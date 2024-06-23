import { required, email, helpers, minLength, maxLength, numeric, sameAs, not } from '@vuelidate/validators';

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

export const register_rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage('Это обязательное поле', required),
            email: helpers.withMessage('Почта указана неверно', email)
        },
        password: {
            required: helpers.withMessage('Это обязательное поле', required),
            minLength: helpers.withMessage('Пароль не должен быть меньше 6 символов', minLength(6)),
            maxLength: helpers.withMessage('Пароль не должен быть больше 30 символов', maxLength(30))
        },
        first_name: {
            required: helpers.withMessage('Это обязательное поле', required),
            minLength: helpers.withMessage('Имя не должно быть короче 2 символов', minLength(2)),
            maxLength: helpers.withMessage('Имя не должно быть больше 30 символов', maxLength(30)),
        },
        last_name: {
            required: helpers.withMessage('Это обязательное поле', required),
            minLength: helpers.withMessage('Фамилия не должна быть короче 2 символов', minLength(2)),
            maxLength: helpers.withMessage('Фамилия не должна быть больше 30 символов', maxLength(30)),
        },
        phone_number: {
            required: helpers.withMessage('Это обязательное поле', required),
            minLength: helpers.withMessage('Поле заполнено неправильно', minLength(11)),
            maxLength: helpers.withMessage('Поле заполнено неправильно', maxLength(11)),
            numeric: helpers.withMessage('Только цифры', numeric),
        }
    }
})