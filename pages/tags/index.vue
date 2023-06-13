<template>
    <main>
        <h1>TAGS</h1>
        <vue-data-table v-bind="options" :data="tags" />
    </main>
</template>

<style src='@andresouzaabreu/vue-data-table/dist/DataTable.css'></style>

<script>
export default {

    // static data
    data() {
        return {
            options: {
                lang: 'pt-br',
                sortingMode: 'single',
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
    },

    computed: {
        tags() {
            return this.$store.state.tags.tags
        },
    },

    async mounted() {
        this.$store.dispatch('tags/fetchTags')
    }
}
</script>
