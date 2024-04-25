export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        is_loading: false,
        error: '',
    }),
    getters: {
        getCartItems: async (state) => {
            state.is_loading = true
            state.error = ''
            const cart:any = await $fetch('/api/user/cart/my', {
                method: 'GET',
            }).finally(() => {
                state.is_loading = false
            })

            // handle errors
            if(cart.error) {
                // @ts-ignore
                state.error = cart.reason
                return []
            } else {
                // @ts-ignore
                state.items = cart.items
                // @ts-ignore
                return cart.items
            }
        }
    },
    actions: {
        async addToCart(item_id: number) {
            
            this.$patch({
                error: '',
                is_loading: true
            })

            const response = await $fetch('/api/user/cart/add', {
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

            if(response.error) {
                this.$patch({
                    error: response.reason
                })
            } else {
                this.$patch({
                    // @ts-ignore
                    items: [...this.items, response.item]
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