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
        data = (await this.$axios.post('/user', data)).data
        commit('addUser', data)
    },

    async fetchUsers({ commit }) {
        const users = (await this.$axios.get('/user')).data
        commit('setUsers', users)
    },

    async updateUser({ commit }, payload) {
        let data = {...payload}
        let { id } = data
        data._method = "PUT"
        data = (await this.$axios.post(`/user/${id}`, data)).data
        commit('updateUser', data)
    },

    async deleteUser({ commit }, payload) {
        let data = {...payload}
        let { id } = data
        data = (await this.$axios.delete(`/user/${id}`, { data })).data
        commit('deleteUser', data)
    },
}

