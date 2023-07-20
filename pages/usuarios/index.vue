<template>
    <main>
        <h1>USUÁRIOS</h1>

        <b-button variant="success" @click="showCreateForm()">CRIAR USUÁRIO</b-button>

        <vue-data-table v-bind="options" :data="users" @userEvent="showForm" />

        <b-modal ref="form-create" title="CRIAR USUÁRIO" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
             <message-success :show="showSuccess" @hide="hideSuccess()">
                USUÁRIO CRIADO!
            </message-success>
            <form @submit.prevent="submit('create')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="user.name"  name="name" />
                </b-form-group>
                <b-form-group label="Email" label-for="email">
                    <b-form-input v-model="user.email"  name="email" type="email"/>
                </b-form-group>
                <b-form-group label="Senha" label-for="password">
                    <b-form-input v-model="user.password"  name="password" type="password"/>
                </b-form-group>
                <b-form-group label="Cargos">
                    <b-form-select v-model="user.roles" :options="roles" multiple />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-create')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('create')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-edit" title="EDITAR USUÁRIO" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
             <message-success :show="showSuccess" @hide="hideSuccess()">
                USUÁRIO ATUALIZADO!
            </message-success>
            <form @submit.prevent="submit('edit')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="user.name"  name="name" />
                </b-form-group>
                <b-form-group label="Email" label-for="email">
                    <b-form-textarea v-model="user.email"  name="email" />
                </b-form-group>
                <b-form-group label="Cargos">
                    <b-form-select v-model="user.roles" :options="roles" multiple />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-edit')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('edit')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-delete" title="DELETAR USUÁRIO" hide-footer>
            <p>Tem certeza que deseja deletar o usuário <i>{{ user.name }}</i>?</p>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <message-success :show="showSuccess" @hide="hideSuccess()">
                USUÁRIO DELETADO!
            </message-success>
            <form @submit.prevent="submit('delete')">
                <b-form-group label="Digite sua senha" label-for="password">
                    <b-form-input type="password" v-model="password"  name="password" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-delete')">CANCELAR</b-button>
                    <b-button variant="danger" @click="submit('delete')">DELETAR</b-button>
                </div>
            </form>
        </b-modal>

    </main>
</template>
<script>
import { VdtActionButtons } from '@uwlajs/vue-data-table'

export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('roles/fetchRoles')
        await store.dispatch('users/fetchUsers')
    },

    data() {
        return {
            busy: false,
            showSuccess: false,
            password: "",
            errors: [],
            user: {},
            options: {
                lang: 'pt-br',
                columns: [
                    {
                        key: 'name',
                        title: 'Nome',
                    },
                    {
                        title: "Ações",
                        cssClass: "wmin",
                        component: VdtActionButtons,
                        componentProps: { actions: ['edit', 'delete'] }
                    }
                ]
            }
        }
    },

    computed: {
        users() {
            return this.$store.state.users.users
        },
        roles() {
            return this.$store.state.roles.roles.map(r => r.name)
        },
    },

    methods: {
        showCreateForm(){
            this.showForm({
                action: 'create',
                data: { name: "", email: "", password: "", roles: [] }
            })
        },
        hide(modalRef) {
            this.$refs[modalRef].hide()
            this.errors = []
            this.password = ""
        },
        showForm(payload) {
            let { action, data } = payload
            this.showSuccess = false
            this.errors = []
            this.user = {...data}
            this.$refs['form-' + action].show()
        },
        submit(form) {
            if (this.busy) return
            this.busy = true
            this.errors = []
            this.showSuccess = false

            let action
            let data = this.user
            switch (form) {
                case "create":
                    action = 'users/createUser'
                    break;
                case "edit":
                    action = 'users/updateUser'
                    break;
                case "delete":
                    action = 'users/deleteUser'
                    data = {...data, password: this.password }
                    break;
            }

            this.$store.dispatch(action, data)
                .then(() => {
                    this.showSuccess = true
                    setTimeout(() => this.hide('form-'+form), 1500)
                })
                .catch(exception => {
                    const response = exception.response
                    const errorObj = response.data.errors
                    const errors = []
                    for (let field in errorObj)
                        for (let err of errorObj[field])
                            errors.push(err)
                    this.errors = errors
                })
                .finally(() => {
                    this.busy = false
                    this.password = ""
                })
        },
        hideErrors() {
            this.errors = []
        },
        hideSuccess() {
            this.showSuccess = false
        }
    },
}
</script>
