<template>
    <grusp-dashboard v-bind="{fields,tableParams}" namespace="grupos" title="GRUPOS" modalSize="lg" />
</template>
<script>
const isearch = (a, b) => a.toLowerCase().includes(b.toLowerCase())
const searchTag = (data, search) => data.tags.some(t => isearch(t, search))

export default {
    middleware: 'auth',

    async asyncData({ store }) {
        await store.dispatch('grupos/fetch')
        await store.dispatch('grupos/fetchTags')
    },

    computed: {
        fields() {
            return [
                'id',
                'name:_method|hidden|value:PUT',
                'name:titulo|label:Título|text',
                'name:descricao|label:Descrição|textarea|rows=6',
                'name:img|type:file|model:true|label:Image Principal|component:img-cropper',
                'name:images|label:Fotos do grupo (adicionar)|file|multiple|accept=image/*',
                'name:images_del|model:true|label:Fotos atuais (selecione para deletar)|component:img-select',
                'name:contato|label:Informações de contato|textarea',
                'name:horario|label:Informações de horário|textarea',
                'name:lugar|lugar:Informações de lugar|textarea',
                'name:mensalidade|label:Informações de mensalidade|textarea',
                'name:publico|label:Informações de público alvo|textarea',
                'name:links|label:Links úteis|textarea',
                { name: 'tags', component: 'multiselect', props: this.multiselectParams },
                'buttons',
            ]
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
                { key: 'titulo', title: 'Título' },
                { title: 'Tags', component: 'GrupoTableTags', searchable: true, searchFunction: searchTag },
                // { title: 'Ações', component: 'GrupoTableButtons' },
                { title: 'Ações', component: 'vdt-action-buttons' },
            ],
        }

        return { tableParams }
    },
}
</script>