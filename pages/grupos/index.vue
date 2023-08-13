<template>
    <main>
        <h1>GRUPOS</h1>
        <b-button variant="success" href="/grupos/criar">CRIAR GRUPO</b-button>
        <br />
        <br />
        <vue-data-table v-bind="params" :data="grupos" />
    </main>
</template>
<script>
const isearch = (a, b) => a.toLowerCase().includes(b.toLowerCase())
const searchTag = (data, search) => data.tags.some(t => isearch(t, search))

export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('grupos/fetchGrupos')
    },

    computed: {
        grupos() {
            return this.$store.state.grupos.grupos
        },
    },

    data() {
        return {
            params: {
                lang: 'pt-br',
                sortingMode: 'single',
                columns: [
                    {
                        key: 'titulo',
                        title: 'Título',
                    },
                    {
                        title: 'Tags',
                        component: 'GrupoTableTags',
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
    },
}
</script>
