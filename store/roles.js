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
        const ind = state.roles.findIndex(t => t.id === payload.id)
        state.roles.splice(ind, 1, payload)
    },
    deleteRole(state, payload) {
        state.roles = state.roles.filter(t => t.id !== payload.id)
    }
}

export const actions = {
    async createRole({ commit }, payload) {
        let data = {...payload}

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        data = (await this.$axios.post(`/role`, data, { headers })).data
        commit('addRole', data)
    },

    async fetchRoles({ commit }) {
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        // fetch roles
        const roles = (await this.$axios.get('/role', { headers })).data
        commit('setRoles', roles)

        // fetch roles
        const permissions = (await this.$axios.get('/permission', { headers })).data
        commit('setPermissions', permissions)
    },

    async updateRole({ commit }, payload) {
        let data = {...payload}

        // add field
        data._method = "PUT"

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        data = (await this.$axios.post(`/role/${data.id}`, data, { headers })).data
        commit('updateRole', data)
    },


    async deleteRole({ commit }, payload) {
        const data = {...payload}

        // request headers
        const token = this.$auth.strategy.token.get()
        const headers = { 'Authorization' : token }

        await this.$axios.delete(`/role/${data.id}`, { headers, data })
        commit('deleteRole', data)
    },
}

