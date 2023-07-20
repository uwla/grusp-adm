export function state() {
    return {
        roles: [],
        permissions: [],
    }
}

export const mutations = {
    setRoles(state, payload) {
        state.roles = payload
    },
    setPermissions(state, payload) {
        state.permissions = payload
    },
    addRole(state, payload) {
        state.roles.unshift(payload)
    },
    updateRole(state, payload) {
        const ind = state.roles.findIndex(t => t.id == payload.id)
        state.roles.splice(ind, 1, payload)
    },
    deleteRole(state, payload) {
        state.roles = state.roles.filter(t => t.id != payload.id)
    }
}

export const actions = {
    async createRole({ commit }, payload) {
        let data = {...payload}
        data = (await this.$axios.post('/role', data,)).data
        commit('addRole', data)
    },

    async fetchRoles({ commit }) {
        const roles = (await this.$axios.get('/role')).data
        commit('setRoles', roles)
        const permissions = (await this.$axios.get('/permission')).data
        commit('setPermissions', permissions)
    },

    async updateRole({ commit }, payload) {
        let data = {...payload}
        let { id } = data
        data._method = "PUT"
        data = (await this.$axios.post(`/role/${id}`, data)).data
        commit('updateRole', data)
    },

    async deleteRole({ commit }, payload) {
        let data = {...payload}
        let { id } = data
        data = (await this.$axios.delete(`/role/${id}`, { data })).data
        commit('deleteRole', data)
    },
}

