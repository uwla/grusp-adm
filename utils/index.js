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
            if (ind >= 0) state[modelName].splice(ind, 1, model)
        },
        deleteModel(state, model) {
            state[modelName] = state[modelName].filter(m => m.id != model.id)
        },
    }
}

export function createActions(endpoint) {
    return {
        async create({ commit }, data) {
            // if data has file, we need to add some headers
            let headers = {}
            if (data instanceof FormData)
                headers['ContentType'] = 'multipart/form-data'

            data = (await this.$axios.post(endpoint, data, headers)).data
            commit('addModel', data)
        },

        async fetch({ commit }) {
            const models = (await this.$axios.get(endpoint)).data
            commit('setModels', models)
        },

        async update({ commit }, data) {
            let headers = {}
            let id

            // We need to:
            // 1. get the id of the resource being updated.
            // 2. add "_method" field set to "PUT" due to Laravel API requirements

            // if data has file, it is an instance of form data
            if (data instanceof FormData) {
                id = data.get('id')
                data.append('_method', 'PUT')

                // we also need to set the headers
                headers['ContentType'] = 'multipart/form-data'
            }

            // otherwise, it is a JS Object
            else {
                id = data['id']
                data['_method'] = 'PUT'
            }

            const url = `${endpoint}/${id}`
            data = (await this.$axios.post(url, data, headers)).data
            commit('updateModel', data)
        },

        async delete({ commit }, data) {
            let { id } = data
            await this.$axios.delete(`${endpoint}/${id}`, { data })
            commit('deleteModel', data)
        },
    }
}
