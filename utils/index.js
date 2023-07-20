export function parseResponseErrors(response) {
    const errorObj = response.data.errors
    const errors = []
    for (let field in errorObj)
        for (let err of errorObj[field]) errors.push(err)
    return errors
}

export function createState(modelName) {
    return function () {
        return {
            [modelName]: [],
        }
    }
}

export function createMutations(modelName) {
    return {
        setModels(state, models) {
            state[modelName] = models
        },
        addModel(state, model) {
            state[modelName].unshift(model)
        },
        updateModel(state, model) {
            const ind = state[modelName].findIndex(m => m.id == model.id)
            state[modelName].splice(ind, 1, model)
        },
        deleteModel(state, model) {
            state[modelName] = state[modelName].filter(m => m.id != model.id)
        },
    }
}

export function createActions(endpoint) {
    return {
        async create({ commit }, payload) {
            let data = { ...payload }
            data = (await this.$axios.post(endpoint, data)).data
            commit('addModel', data)
        },

        async fetch({ commit }) {
            const models = (await this.$axios.get(endpoint)).data
            commit('setModels', models)
        },

        async update({ commit }, payload) {
            let data = { ...payload }
            let { id } = data
            data._method = 'PUT'
            data = (await this.$axios.post(`${endpoint}/${id}`, data)).data
            commit('updateModels', data)
        },

        async delete({ commit }, payload) {
            let data = { ...payload }
            let { id } = data
            data = (await this.$axios.delete(`${endpoint}/${id}`, { data }))
                .data
            commit('deleteModel', data)
        },
    }
}
