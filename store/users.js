export function state() {
    return {
        users: [],
    }
}

export const mutations = {
    setUsers(state, payload) {
        state.users = payload
    },
    addUser(state, payload) {
        state.users.unshift(payload)
    },
    updateUser(state, payload) {
        const ind = state.users.findIndex(t => t.id === payload.id)
        state.users.splice(ind, 1, payload)
    },
    deleteUser(state, payload) {
        state.users = state.users.filter(t => t.id !== payload.id)
    }
}

export const actions = {
    async createUser({ commit }, payload) {
        let data = {...payload}

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        data = (await this.$axios.post(`/user`, data, { headers })).data
        commit('addUser', data)
    },

    async fetchUsers({ commit }) {
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        // fetch users
        const users = (await this.$axios.get('/user', { headers })).data
        commit('setUsers', users)
    },

    async updateUser({ commit }, payload) {
        let data = {...payload}

        // add field
        data._method = "PUT"

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        data = (await this.$axios.post(`/user/${data.id}`, data, { headers })).data
        commit('updateUser', data)
    },


    async deleteUser({ commit }, payload) {
        const data = {...payload}

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        await this.$axios.delete(`/user/${data.id}`, { headers, data })
        commit('deleteUser', data)
    },
}

