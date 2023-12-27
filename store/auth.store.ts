export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        error: '',
        user_id: 0,
    }),
    getters: {
        getSession: async (state) => {
            const token = useCookie('token')
            const session = await $fetch('/api/session', {
                method: 'POST',
                body: {
                    token: token.value
                }
            })
            
            // @ts-ignore
            if(session.error) {
                state.authenticated = false,
                state.user_id = 0

                token.value = ''
            }

            // @ts-ignore
            return session.session
        }
    },
    actions: {
        async login(login: string, password: string) {
            this.$patch({
                error: '',
                loading: true,
                authenticated: false
            })
            const request = await $fetch('/api/login', {
                method: 'POST',
                body: {
                    email: login,
                    password
                },
            })

            // @ts-ignore
            if(request.error == true) {
                this.$patch({
                    // @ts-ignore
                    error: request.reason,
                    loading: false,
                    // @ts-ignore
                })
            }
            // @ts-ignore
            if(request.token) {
                const token = useCookie('token')
                // @ts-ignore
                token.value = request.token
                this.$patch({
                    authenticated: true,
                    loading: false,
                    // @ts-ignore
                    user_id: request.user
                })
            }
        },
        async logUserOut() {

            const finish = await $fetch('/api/user/finish', {
                method: 'POST',
            })

            const token = useCookie('token')
            token.value = null

            this.$patch({
                authenticated: false,
                loading: false,
            })
        },
    }
})