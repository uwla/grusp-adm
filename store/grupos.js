export function state() {
    return {
        tags: [],
        grupos: [],
    }
}

export const getters = {
    /* MULTISELECT PLUGIN */

    // options used by multiselect plugin
    multiselectOptions(state) {
        const tags= state.tags
        const options = []
        for (let t in tags)
            options.push({ 'label': t, 'values': tags[t] })
        return options
    },

    // parameters for multiselect plugin
    multiselectParams(state, getters) {
        // the options is accessed via another getter
        const options = getters.multiselectOptions

        // these are the global parameters
        return {
            'close-on-select': false,
            'group-label': 'label',
            'group-select': true,
            'group-values': 'values',
            'multiple': true,
            'options': options,
            'placeholder': 'selecionar tag',
            'show-labels': false,
        }
    }
}

export const mutations = {
    setTags(state, tags) {
        state.tags = tags
    },
    setGrupos(state, grupos) {
        state.grupos = grupos
    },
}

export const actions = {
    async fetchTags({ commit }) {
        const url = "/public/tags"
        const tags = (await this.$axios.get(url)).data
        commit('setTags', tags)
    },
    async fetchGrupos({ commit }) {
        const url = "/public/grupos"
        const grupos = (await this.$axios.get(url)).data
        commit('setGrupos', grupos)
    },
}
