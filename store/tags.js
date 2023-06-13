export function state() {
    return {
        tags: [],
    }
}

export const mutations = {
    setTags(state, payload) {
        state.tags = payload
    },
    addTag(state, payload) {
        state.tags.push(payload)
    }
}

export const actions = {
    async fetchTags({ commit }) {
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const tags = (await this.$axios.get('/tag', { headers })).data
        commit('setTags', tags)
    },
}

