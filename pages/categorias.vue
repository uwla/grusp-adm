<template>
    <main class="w700">
        <h1>CATEGORIAS</h1>

        <b-button variant="success" @click="showCreateForm()">
            CRIAR CATEGORIA
        </b-button>

        <vue-data-table v-bind="options" :data="categories" @userEvent="showForm" />

        <b-modal ref="form-create" title="CRIAR CATEGORIA" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <message-success :show="showSuccess" @hide="hideSuccess()">
                CATEGORIA CRIADA!
            </message-success>
            <form @submit.prevent="submit('create')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="category.name" name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="category.description"  name="description" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-create')">
                        CANCELAR
                    </b-button>
                    <b-button variant="success" @click="submit('create')">
                        SALVAR
                    </b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-edit" title="EDITAR CATEGORIA" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <message-success :show="showSuccess" @hide="hideSuccess()">
                CATEGORIA ATUALIZADA!
            </message-success>
            <form @submit.prevent="submit('edit')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="category.name" name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="category.description"  name="description" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-edit')">
                        CANCELAR
                    </b-button>
                    <b-button variant="success" @click="submit('edit')">
                        SALVAR
                    </b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-delete" title="DELETAR CATEGORIA" hide-footer>
            <p>Tem certeza que deseja deletar a categoria <i>{{ category.name }}</i>?</p>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <message-success :show="showSuccess" @hide="hideSuccess()">
                CATEGORIA DELETADA!
            </message-success>
            <form @submit.prevent="submit('delete')">
                <b-form-group label="Digite sua senha" label-for="password">
                    <b-form-input type="password" v-model="password"  name="password" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-delete')">
                        CANCELAR
                    </b-button>
                    <b-button variant="danger" @click="submit('delete')">
                        DELETAR
                    </b-button>
                </div>
            </form>
        </b-modal>
    </main>
</template>

<script>
import { VdtActionButtons } from '@uwlajs/vue-data-table'
import { parseResponseErrors } from '../utils'

export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('categories/fetch')
    },

    data() {
        return {
            busy: false,
            showSuccess: false,
            password: '',
            errors: [],
            category: {},
            options: {
                lang: 'pt-br',
                columns: [
                    {
                        key: 'name',
                        title: 'Nome',
                    },
                    {
                        title: 'Ações',
                        cssClass: 'wmin',
                        component: VdtActionButtons,
                        componentProps: { actions: ['edit', 'delete'] },
                    },
                ],
            },
        }
    },

    computed: {
        categories() {
            return this.$store.state.categories.categories
        },
    },

    methods: {
        showCreateForm() {
            this.showForm({
                action: 'create',
                data: { name: '', description: '' },
            })
        },
        hide(modalRef) {
            this.$refs[modalRef].hide()
            this.errors = []
            this.password = ''
        },
        showForm(payload) {
            let { action, data } = payload
            this.showSuccess = false
            this.errors = []
            this.category = { ...data }
            this.$refs['form-' + action].show()
        },
        submit(form) {
            if (this.busy) return
            this.busy = true
            this.errors = []
            this.showSuccess = false

            let action
            let data = this.category
            switch (form) {
                case 'create':
                    action = 'categories/create'
                    break
                case 'edit':
                    action = 'categories/update'
                    break
                case 'delete':
                    action = 'categories/delete'
                    data = { ...data, password: this.password }
                    break
            }

            this.$store
                .dispatch(action, data)
                .then(() => {
                    this.showSuccess = true
                    setTimeout(() => this.hide('form-' + form), 1500)
                })
                .catch(exception => {
                    this.errors = parseResponseErrors(exception.response)
                })
                .finally(() => {
                    this.busy = false
                    this.password = ''
                })
        },
        hideErrors() {
            this.errors = []
        },
        hideSuccess() {
            this.showSuccess = false
        },
    },
}
</script>

