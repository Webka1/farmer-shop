export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        totalSum: 0,
        is_loading: false,
        error: '',
        
    }),
    getters: {
        getCartItems: async (state) => {
            state.is_loading = true
            state.error = ''
            state.totalSum = 0
            const cart:any = await $fetch('/api/user/cart/my', {
                method: 'GET',
            }).finally(() => {
                state.is_loading = false
            })

            console.log('From cart store', cart)

            // handle errors
            if(cart.error) {
                // @ts-ignore
                state.error = cart.reason
                return []
            } else {
                // // @ts-ignore
                state.items = cart.cart_items
                state.totalSum = cart.totalSum
                // @ts-ignore
                return cart.cart_items
            }
        }
    },
    actions: {
        async addToCart(item_id: number) {
            this.$patch({
                error: '',
                is_loading: true
            })

            const response = await $fetch('/api/user/cart/update', {
                method: 'POST',
                body: {
                    id: item_id,
                    action: 'add'
                }
            }).finally(() => {
                this.$patch({
                    is_loading: false
                })
            })

            // @ts-ignore
            if(response.error) {
                this.$patch({
                    // @ts-ignore
                    error: response.reason
                })
            } else {
                this.$patch({
                    // @ts-ignore
                    items: response.cart_items,
                    // @ts-ignore
                    totalSum: response.totalSum
                })
            }
        },
        async removeFromCart(item_id: number) {
            this.$patch({
                error: '',
                is_loading: true
            })

            const response = await $fetch('/api/user/cart/update', {
                method: 'POST',
                body: {
                    id: item_id,
                    action: 'remove'
                }
            }).finally(() => {
                this.$patch({
                    is_loading: false
                })
            })

            // @ts-ignore
            if(response.error) {
                this.$patch({
                    // @ts-ignore
                    error: response.reason
                })
            } else {
                this.$patch({
                    // @ts-ignore
                    items: response.cart_items,
                    // @ts-ignore
                    totalSum: response.totalSum
                })
            }
        },

        // async removeFromBookmarks(item_id: number) {
        //     this.$patch({
        //         error: '',
        //         is_loading: true
        //     })

        //     const response = await $fetch('/api/user/bookmarks/bookmark', {
        //         method: 'POST',
        //         body: {
        //             id: item_id,
        //             action: 'remove'
        //         }
        //     }).finally(() => {
        //         this.$patch({
        //             is_loading: false
        //         })
        //     })

        //     if(response.error) {
        //         this.$patch({
        //             error: response.reason
        //         })
        //     } else {
        //         this.$patch({
        //             bookmarks: this.bookmarks.filter((bookmark: any) => {
        //                 return bookmark.id !== item_id
        //             })
        //         })
        //     }
        // },
    }
})