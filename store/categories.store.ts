export const useCategoriesStore = defineStore('categories', {
    state: () => ({
        categories: [],
        is_loading: false,
        error: '',
    }),
    getters: {
        getCategories: async (state) => {
            state.is_loading = true
            const categories = await $fetch('/api/categories/categories', {
                method: 'GET',
            }).finally(() => {
                state.is_loading = false
            })
            // handle errors
            if (categories.error) {
                // @ts-ignore
                state.error = categories.reason
                return []
            } else {
                // @ts-ignore
                state.categories = categories.categories
                // @ts-ignore
                return categories.categories
            }
        }
    },
})