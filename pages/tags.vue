<template>
    <main>
        <h1>TAGS</h1>

        <b-button variant="success" @click="showCreateForm()">
            CRIAR TAG
        </b-button>

        <vue-data-table v-bind="options" :data="tags" @userEvent="showForm" />

        <b-modal id="form-create" title="CRIAR TAG" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <message-success :show="showSuccess" @hide="hideSuccess()">
                TAG CRIADA!
            </message-success>
            <form @submit.prevent="submit('create')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="tag.name" name="name" required />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="tag.description"  name="description" />
                </b-form-group>
                <b-form-group label="Categoria">
                    <b-form-select
                        v-model="tag.category"
                        :options="categorias"
                    />
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

        <b-modal id="form-edit" title="EDITAR TAG" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <message-success :show="showSuccess" @hide="hideSuccess()">
                TAG ATUALIZADA!
            </message-success>
            <form @submit.prevent="submit('edit')">
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="tag.name" name="name" required />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="tag.description"  name="description" />
                </b-form-group>
                <b-form-group label="Categoria">
                    <b-form-select v-model="tag.category" :options="categorias" />
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

        <form-delete
            action="tags/delete"
            messageDeleted="TAG DELETADA!"
            :messageConfirmation="`Certeza que deseja deletar a tag ${tag.name}?`"
            :modelId="tag.id"
            title="DELETAR TAG" />
    </main>
</template>
<script>
import { VdtActionButtons } from '@uwlajs/vue-data-table'
import { parseResponseErrors } from '../utils'

export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('tags/fetch')
        await store.dispatch('categories/fetch')
    },

    data() {
        return {
            busy: false,
            showSuccess: false,
            password: '',
            errors: [],
            tag: {},
            options: {
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
                        component: VdtActionButtons,
                        componentProps: { actions: ['edit', 'delete'] },
                    },
                ],
            },
        }
    },

    computed: {
        tags() {
            return this.$store.state.tags.tags.map(t => {
                if (t.category == null)
                    return {...t, category: ''}
                return t
            })
        },
        categorias() {
            return this.$store.state.categories.categories.map(c=>c.name)
        },
    },

    methods: {
        showCreateForm() {
            this.showForm({
                action: 'create',
                data: { name: '', description: '', category: '' },
            })
        },
        hide(modalRef) {
            this.$bvModal.hide(modalRef)
            this.errors = []
            this.password = ''
        },
        showForm(payload) {
            let { action, data } = payload
            this.showSuccess = false
            this.errors = []
            this.tag = { ...data }
            this.$bvModal.show('form-'+action)
        },
        submit(form) {
            if (this.busy) return
            this.busy = true
            this.errors = []
            this.showSuccess = false

            let action
            let data = this.tag
            switch (form) {
                case 'create':
                    action = 'tags/create'
                    break
                case 'edit':
                    action = 'tags/update'
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
