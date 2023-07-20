import { createActions, createMutations } from "../utils"

export function state() {
    return {
        tags: [],
        categorias: [],
    }
}

export const mutations = {
    // merge
    ... createMutations('tags'),

    setCategorias(state, payload) {
        state.categorias = payload
    }
}

export const actions = {
    ... createActions('/tag'),

    async fetchCategorias({ commit }) {
        const categorias = (await this.$axios.get('/public/categorias')).data
        commit('setCategorias', categorias)
    },
}

