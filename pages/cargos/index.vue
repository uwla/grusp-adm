<template>
    <main>
        <h1>CARGOS</h1>

        <b-button variant="success" @click="showCreateForm()">CRIAR CARGO</b-button>

        <vue-data-table v-bind="options" :data="roles" @userEvent="showForm" />

        <b-modal ref="form-create" title="CRIAR CARGO" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form @submit.prevent="submit('create')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="role.name"  name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="role.description"  name="description" />
                </b-form-group>
                <b-form-group label="Permissões">
                    <b-form-select v-model="role.permissions" :options="permissions" multiple
                        :select-size="12" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-create')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('create')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-edit" title="EDITAR CARGO" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form @submit.prevent="submit('edit')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="role.name"  name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="role.description"  name="description" />
                </b-form-group>
                <b-form-group label="Permissões">
                    <b-form-select v-model="role.permissions" :options="permissions" multiple
                        :select-size="12" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-edit')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('edit')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-delete" title="DELETAR CARGO" hide-footer>
            <p>Tem certeza que deseja deletar o cargo <i>{{ role.name }}</i>?</p>
            <message-errors :errors="errors" @hide="hideErrors()" />
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
    },

    data() {
        return {
            busy: false,
            password: "",
            errors: [],
            role : {},
            options: {
                lang: 'pt-br',
                sortingMode: 'single',
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
        roles() {
            return this.$store.state.roles.roles
        },
        permissions() {
            return this.$store.state.roles.permissions
        },
    },

    methods: {
        showCreateForm(){
            this.role = { name: "", description: "", permissions: [] }
            this.$refs['form-create'].show()
        },
        hide(modalRef) {
            this.$refs[modalRef].hide()
            this.errors = []
            this.password = ""
        },
        showForm(payload) {
            let { action, data } = payload
            this.errors = []
            switch (action)
            {
                case "edit":
                    this.role = {...data}
                    this.$refs['form-edit'].show()
                    break;
                case "delete":
                    this.role = {...data}
                    this.$refs['form-delete'].show()
                    break;
            }
        },
        submit(action) {
            if (this.busy) return
            this.busy = true

            let data = this.role
            switch (action) {
                case "create":
                    action = 'roles/createRole'
                    break;
                case "edit":
                    action = 'roles/updateRole'
                    break;
                case "delete":
                    action = 'roles/deleteRole'
                    data = {...data, password: this.password }
                    break;
            }

            this.$store.dispatch(action, data)
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
                })
        },
        hideErrors() {
            this.errors = []
        }
    },
}
</script>
