<template>
    <main>
        <h1>GRUPOS</h1>
        <b-button variant="success" href="/grupos/criar">CRIAR GRUPO</b-button>
        <br /><br />
        <vue-data-table v-bind="params" :data="grupos" />
    </main>
</template>
<script>
const isearch = (a, b) => a.toLowerCase().includes(b.toLowerCase())
const searchTag =  (data, search) => data.tags.some(t => isearch(t, search))

export default {
    middleware: 'auth',

    async asyncData({ $auth, $axios }) {
        const url = '/grupo'
        const token = $auth.strategy.token.get()
        const headers = { Authorization: token }
        const grupos = (await $axios.get(url, { headers })).data
        return { grupos }
    },

    data() {
        return {
            params: {
                sortingMode: 'single',
                columns: [
                    {
                        key: 'titulo',
                        title: 'Título',
                    },
                    {
                        title: 'Tags',
                        component: "GrupoTableTags",
                        searchable: true,
                        searchFunction: searchTag,
                    },
                    {
                        title: 'Ações',
                        component: 'GrupoTableButtons',
                    },
                ],
            },
        }
    }
}
</script>
