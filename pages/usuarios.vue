<template>
    <grusp-dashboard v-bind="{fields, tableParams}" namespace="users" title="USUÁRIOS" />
</template>
<script>
export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('roles/fetch')
        await store.dispatch('users/fetch')
    },

    data() {
        return {
            tableParams: {
                lang: 'pt-br',
                sortingMode: 'single',
                columns: [
                    { key: 'name', title: 'Nome' },
                    { key: 'email' },
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
            let roles = {
                name: 'roles',
                label: 'Cargos',
                type: 'select',
                props: { multiple: true, options: this.rolesOptions },
            }
            return ['id', 'name', 'email', 'password', roles, 'buttons']
        },
        roles() {
            return this.$store.state.roles.roles
        },
        rolesOptions() {
            return this.roles.map(r => ({ value: r.name, text: r.name }))
        }
    },
}
</script>