export const useBookmarksStore = defineStore('bookmarks', {
    state: () => ({
        bookmarks: [],
        is_loading: false,
        error: '',
    }),
    getters: {
        getBookmarks: async (state) => {
            state.is_loading = true
            state.error = ''
            const bookmarks:any = await $fetch('/api/user/bookmarks/bookmarks', {
                method: 'GET',
            }).finally(() => {
                state.is_loading = false
            })

            // handle errors
            if(bookmarks.error) {
                // @ts-ignore
                state.error = bookmarks.reason
                return []
            } else {
                // @ts-ignore
                state.bookmarks = bookmarks.items
                // @ts-ignore
                return bookmarks.items
            }
        }
    },
    actions: {
        async addToBookmark(item_id: number) {
            
            this.$patch({
                error: '',
                is_loading: true
            })

            const response = await $fetch('/api/user/bookmarks/bookmark', {
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
                    bookmarks: [...this.bookmarks, response.item]
                })
            }
        },

        async removeFromBookmarks(item_id: number) {
            this.$patch({
                error: '',
                is_loading: true
            })

            const response = await $fetch('/api/user/bookmarks/bookmark', {
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

            if(response.error) {
                this.$patch({
                    error: response.reason
                })
            } else {
                this.$patch({
                    bookmarks: this.bookmarks.filter((bookmark: any) => {
                        return bookmark.id !== item_id
                    })
                })
            }
        },
    }
})