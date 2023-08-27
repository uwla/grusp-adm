<template>
    <grusp-dashboard v-bind="{fields, tableParams}" namespace="roles" title="CARGOS" />
</template>
<script>
export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('roles/fetch')
        await store.dispatch('permissions/fetch')
    },

    data() {
        return {
            tableParams: {
                lang: 'pt-br',
                sortingMode: 'single',
                columns: [
                    { key: 'name', title: 'Nome' },
                    {
                        title: 'Ações',
                        cssClass: 'wmin',
                        component: 'vdt-action-buttons',
                        componentProps: { actions: ['edit', 'delete'] }
                    }
                ]
            }
        }
    },

    computed: {
        fields() {
            return [
                'id',
                'name:name|label:Nome|text',
                'name:description|label:Descrição (opcional)|textarea|rows=4',
                {
                    name: 'permissions',
                    label: 'Permissões',
                    type: 'select',
                    props: { multiple: true, options: this.permissionsOptions },
                },
                'buttons'
            ]
        },
        permissions() {
            return this.$store.state.permissions.permissions
        },
        permissionsOptions() {
            return this.permissions.map(p => ({ value: p, text: p }))
        }
    },
}
</script>
