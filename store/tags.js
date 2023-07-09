export function state() {
    return {
        tags: [],
        categorias: [],
    }
}

export const mutations = {
    setTags(state, payload) {
        state.tags = payload
    },
    setCategorias(state, payload) {
        state.categorias = payload
    },
    addTag(state, payload) {
        state.tags.unshift(payload)
    },
    updateTag(state, payload) {
        const ind = state.tags.findIndex(t => t.id === payload.id)
        state.tags.splice(ind, 1, payload)
    },
    deleteTag(state, payload) {
        state.tags = state.tags.filter(t => t.id !== payload.id)
    }
}

export const actions = {
    async createTag({ commit }, payload) {
        let data = {...payload}

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        data = (await this.$axios.post(`/tag`, data, { headers })).data
        commit('addTag', data)
    },


    async fetchTags({ commit }) {
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        // fetch tags
        const tags = (await this.$axios.get('/tag', { headers })).data
        commit('setTags', tags)

        // fetch categories
        const categorias = (await this.$axios.get('/public/categorias', { headers })).data
        commit('setCategorias', categorias)
    },

    async updateTag({ commit }, payload) {
        let data = {...payload}

        // add field
        data._method = "PUT"

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        data = (await this.$axios.post(`/tag/${data.id}`, data, { headers })).data
        commit('updateTag', data)
    },


    async deleteTag({ commit }, payload) {
        const data = {...payload}

        // add field
        data._method = "DELETE"

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        await this.$axios.delete(`/tag/${data.id}`, { headers })
        commit('deleteTag', data)
    },
}

