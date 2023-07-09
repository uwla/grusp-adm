<template>
    <main>
        <h1>TAGS</h1>
        <vue-data-table v-bind="options" :data="tags" @userEvent="handleAction" />

        <b-modal ref="form-edit" title="EDITAR TAG" hide-footer>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form>
                <b-form-group label="Nome" label-for="name">
                    <b-form-input v-model="tagEdit.name"  name="name" />
                </b-form-group>
                <b-form-group label="Descrição (opcional)" label-for="description">
                    <b-form-textarea v-model="tagEdit.description"  name="description" />
                </b-form-group>
                <b-form-group label="Categoria">
                    <b-form-select v-model="tagEdit.category" :options="categorias" />
                </b-form-group>
                <div class="text-right">
                    <b-button variant="info" @click="hide('form-edit')">CANCELAR</b-button>
                    <b-button variant="success" @click="submit('edit')">SALVAR</b-button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="form-delete" title="DELETAR TAG" hide-footer>
            <p>Tem certeza que deseja deletar a tag <i>{{ tagDelete.name }}</i>?</p>
            <message-errors :errors="errors" @hide="hideErrors()" />
            <form>
                <b-form-group label="Digite sua senha" label-for="password">
                    <b-form-input v-model="password"  name="password" />
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
    data() {
        return {
            password: "",
            errors: {},
            tagEdit: {},
            tagDelete: {},
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
        hide(modalRef) {
            this.$refs[modalRef].hide()
            this.errors = []
        },
        handleAction(payload) {
            const { action, data } = payload
            this.errors = []
            if (action === 'edit') {
                this.tagEdit = {...data}
                this.$refs['form-edit'].show()
            } else if (action === 'delete') {
                this.tagDelete = {...data}
                this.$refs['form-delete'].show()
            }
        },
        submit(action) {
            let tag
            switch (action) {
                case "edit":
                    tag = this.tagEdit
                    action = 'tags/updateTag'
                    break;
                case "delete":
                    tag = this.tagDelete
                    action = 'tags/deleteTag'
                    break;
            }

            this.$store.dispatch(action, tag)
                .catch(exception => {
                    const response = exception.response
                    const errorObj = response.data.errors
                    const errors = []
                    for (let field in errorObj)
                        for (let err of errorObj[field])
                            errors.push(err)
                    this.errors = errors
                })
        },
        hideErrors() {
            this.errors = []
        }
    },

    mounted() {
        this.$store.dispatch('tags/fetchTags')
    }
}
</script>
