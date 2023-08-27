<template>
    <grusp-dashboard v-bind="{fields, tableParams}" namespace="tags" title="TAGS" />
</template>
<script>
export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('tags/fetch')
        await store.dispatch('categories/fetch')
    },

    data() {
        return {
            tableParams: {
                lang: 'pt-br',
                columns: [
                    {
                        key: 'name',
                        title: 'Nome',
                    },
                    {
                        key: 'category',
                        title: 'Categoria',
                    },
                    {
                        title: 'Ações',
                        cssClass: 'wmin',
                        component: 'vdt-action-buttons',
                        componentProps: { actions: ['edit', 'delete'] },
                    },
                ],
            },
        }
    },

    computed: {
        fields() {
            return [
                'id',
                'name:name|label:Nome|text',
                'name:description|label:Descrição (opcional)|textarea|rows=2',
                {
                    name: 'category',
                    label: 'Categorias',
                    component: 'multiselect',
                    props: {
                        options: this.categorias,
                    },
                },
                'buttons'
            ]
        },
        categorias() {
            return this.$store.state.categories.categories.map(c=>c.name)
        },
    },
}
</script>
