import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const useAuthStore = defineStore('auth', {
    state: () => ({
        authenticated: false,
        loading: false,
        error: '',
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
            return session.session
        }
    },
    actions: {
        async login(login: string, password: string) {
            this.loading = true
            this.authenticated = false
            this.error = ''
            const request = await $fetch('/api/login', {
                method: 'POST',
                body: {
                    email: login,
                    password
                },
            })

            if(request.error == true) {
                // @ts-ignore
                this.error = request.reason
                this.loading = false
            }
            // @ts-ignore
            if(request.token) {
                const token = useCookie('token')
                // @ts-ignore
                token.value = request.token
                this.authenticated = true
            }
        },
        logUserOut() {
            const token = useCookie('token')
            this.authenticated = false
            token.value = null
            this.loading = false
        },
    }
})