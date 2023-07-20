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
        data = (await this.$axios.post('/tag', data)).data
        commit('addTag', data)
    },

    async fetchTags({ commit }) {
        const tags = (await this.$axios.get('/tag')).data
        commit('setTags', tags)
        const categorias = (await this.$axios.get('/public/categorias')).data
        commit('setCategorias', categorias)
    },

    async updateTag({ commit }, payload) {
        let data = {...payload}
        let { id } = data
        data._method = "PUT"
        data = (await this.$axios.post(`/tag/${id}`, data)).data
        commit('updateTag', data)
    },

    async deleteTag({ commit }, payload) {
        let data = {...payload}
        let { id } = data
        data = (await this.$axios.delete(`/tag/${id}`, { data })).data
        commit('deleteTag', data)
    },
}

