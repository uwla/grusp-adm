<template>
    <main>
        <h1>TAGS</h1>
        <vue-data-table v-bind="{ columns, data: tags, lang: 'pt-br' }" />
    </main>
</template>

<script>
export default {
    middleware: ['auth'],
    async asyncData({ $auth, $axios }) {
        const token = $auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const tags = (await $axios.get('/tag', { headers })).data
        return { tags }
    },
    data() {
        return {
            columns: [
                {
                    key: 'name',
                    title: 'Nome',
                },
                {
                    key: 'tags',
                    title: 'Categoria',
                    sortable: false,
                },
            ]
        }
    }
}
</script>
