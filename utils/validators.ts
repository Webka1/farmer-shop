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

// export const placeorder_rules = computed(() => {
//     return {
//         firstname: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Имя не должно быть короче 2 символов', minLength(2)),
//             maxLength: helpers.withMessage('Имя не должно быть больше 30 символов', maxLength(30)),
//         },
//         lastname: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Фамилия не должна быть короче 2 символов', minLength(2)),
//             maxLength: helpers.withMessage('Фамилия не должна быть больше 30 символов', maxLength(30)),
//         },
//         email: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             email: helpers.withMessage('Почта указана неверно', email)
//         },
//         phone: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Поле заполнено неправильно', minLength(11)),
//             maxLength: helpers.withMessage('Поле заполнено неправильно', maxLength(11)),
//             numeric: helpers.withMessage('Только цифры', numeric),
//         },


//         city: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Неверное значение', minLength(2)),
//             maxLength: helpers.withMessage('Неверное значение', maxLength(30)),
//         },
//         street: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Неверное значение', minLength(2)),
//             maxLength: helpers.withMessage('Неверное значение', maxLength(30)),
//         }, 
//         entrance: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Неверное значение', minLength(1)),
//             maxLength: helpers.withMessage('Неверное значение', maxLength(3)),
//         },
//         floor: {
//             minLength: helpers.withMessage('Неверное значение', minLength(1)),
//             maxLength: helpers.withMessage('Неверное значение', maxLength(3)),
//         },
//         flat: {
//             minLength: helpers.withMessage('Неверное значение', minLength(1)),
//             maxLength: helpers.withMessage('Неверное значение', maxLength(3)),
//         },
//         zipcode: {
//             required: helpers.withMessage('Это обязательное поле', required),
//             minLength: helpers.withMessage('Неверное значение', minLength(6)),
//             maxLength: helpers.withMessage('Неверное значение', maxLength(6)),
//         }
//     }
// })