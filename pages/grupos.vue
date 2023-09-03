<template>
    <grusp-dashboard v-bind="{fieldsCreate, fieldsEdit, tableParams}"
        namespace="grupos" title="GRUPOS" modalSize="lg" />
</template>
<script>
// insensitive search 'b' within 'a'
const isearch = (a, b) => a.toLowerCase().includes(b.toLowerCase())

// search text within the tags of a data row
const searchTag = (data, search) => data.tags.some(t => isearch(t, search))

export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('grupos/fetch')
        await store.dispatch('grupos/fetchTags')
    },

    computed: {
        fieldsCreate() {
            return [
                {
                    label: 'Título',
                    name: 'titulo',
                    type: 'input',
                },
                {
                    label: 'Descrição',
                    name: 'descricao',
                    props: { rows: 6 },
                    type: 'textarea',
                },
                {
                    component: 'img-cropper',
                    label: 'Imagem Principal',
                    model: true,
                    name: 'img',
                    type: 'file',
                },
                {
                    label: 'Fotos do grupo (adicionar fotos)',
                    name: 'images',
                    props: { multiple: true, accept: 'image/*' },
                    type: 'file',
                },
                {
                    label: 'Informações de contato (opcional)',
                    name: 'contato',
                    type: 'textarea',
                },
                {
                    label: 'Informações de horário (opcional)',
                    name: 'horario',
                    type: 'textarea',
                },
                {
                    label: 'Informações de mensalidade (opcional)',
                    name: 'mensalidade',
                    type: 'textarea',
                },
                {
                    label: 'Informações de público alvo (opcional)',
                    name: 'publico',
                    type: 'textarea',
                },
                {
                    label: 'Links úteis',
                    name: 'links',
                    type: 'textarea',
                },
                {
                    name: 'tags',
                    component: 'multiselect',
                    props: this.multiselectParams
                },
                {
                    component: 'vfb-buttons',
                    label: 'none',
                    props: {
                        submitText: 'SALVAR',
                        resetText: 'CANCELAR',
                        class: 'block',
                    },
                    wrapper: 'div',
                }
            ]
        },

        fieldsEdit() {
            let fields = [... this.fieldsCreate]
            fields.splice(0, 0, {
                name: 'id',
                props: { hidden: true },
            })
            fields.splice(4, 0, {
                component: 'img-select',
                label: 'Fotos atuais (selecione para deletar)',
                model: true,
                name: 'images_del',
            })
            return fields
        },

        multiselectParams() {
            return this.$store.getters['grupos/multiselectParams']
        },
    },

    data() {
        const tableParams = {
            lang: 'pt-br',
            sortingMode: 'single',
            columns: [
                {
                    key: 'titulo',
                    title: 'Título'
                },
                {
                    component: 'grupo-table-tags',
                    searchable: true,
                    searchFunction: searchTag,
                    title: 'Tags',
                },
                {
                    component: 'vdt-action-buttons',
                    componentProps: { actions: ['edit', 'delete'] },
                    title: 'Ações',
                },
            ],
        }

        return { tableParams }
    },
}
</script>