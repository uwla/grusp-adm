<template>
    <grusp-dashboard v-bind="{fields, tableParams}" namespace="categories" title="CATEGORIAS" />
</template>
<script>
export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('categories/fetch')
    },

    data() {
        return {
            tableParams: {
                lang: 'pt-br',
                sortingMode: 'single',
                columns: [
                    { key: 'name', title: 'Nome', },
                    {
                        title: 'Ações',
                        cssClass: 'wmin',
                        component: 'vdt-action-buttons',
                        componentProps: { actions: ['edit', 'delete'] },
                    },
                ],
            },
            fields: [
                'id',
                'name:name|label:Nome|text',
                'name:description|label:Descrição (opcional)|textarea|rows=2',
                'buttons',
            ]
        }
    },
}
</script>

