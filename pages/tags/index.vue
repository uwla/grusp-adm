<template>
    <main>
        <h1>TAGS</h1>

        <b-button variant="success" @click="showCreateForm()">CRIAR TAG</b-button>

        <vue-data-table v-bind="options" :data="tags" @userEvent="showForm" />

        <b-modal ref="form-create" title="CRIAR TAG" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form>
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="tag.name"  name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="tag.description"  name="description" />
                </b-form-group>
                <b-form-group label="Categoria">
                    <b-form-select v-model="tag.category" :options="categorias" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-create')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('create')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-edit" title="EDITAR TAG" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form>
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="tag.name"  name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="tag.description"  name="description" />
                </b-form-group>
                <b-form-group label="Categoria">
                    <b-form-select v-model="tag.category" :options="categorias" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-edit')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('edit')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-delete" title="DELETAR TAG" hide-footer>
            <p>Tem certeza que deseja deletar a tag <i>{{ tag.name }}</i>?</p>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form>
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
        await store.dispatch('tags/fetchTags')
    },

    data() {
        return {
            busy: false,
            password: "",
            errors: {},
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
        tags() {
            return this.$store.state.tags.tags
        },
        categorias() {
            return this.$store.state.tags.categorias
        },
    },

    methods: {
        showCreateForm(){
            this.tag = { name: "", description: "", category: ""}
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
                    this.tag = {...data}
                    this.$refs['form-edit'].show()
                    break;
                case "delete":
                    this.tag = {...data}
                    this.$refs['form-delete'].show()
                    break;
            }
        },
        submit(action) {
            if (this.busy) return
            this.busy = true

            switch (action) {
                case "create":
                    action = 'tags/createTag'
                    break;
                case "edit":
                    action = 'tags/updateTag'
                    break;
                case "delete":
                    action = 'tags/deleteTag'
                    break;
            }

            this.$store.dispatch(action, this.tag)
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
