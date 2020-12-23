export const state = () => ({
    searchString: ''
})

export const mutations = {
    updateSearchString(state, searchString) {
        state.searchString = searchString
    },
}

export const getters = {
    getSearchString: (state) => {
        return state.searchString
    }
}