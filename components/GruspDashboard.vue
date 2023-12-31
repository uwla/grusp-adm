<template>
    <main>
        <h1>{{ title }}</h1>
        <b-button variant="success" @click="showCreateForm">ADICIONAR</b-button>

        <vue-data-table v-bind="tableParams" :data="data" @userEvent="handleUserEvent" />

        <b-modal ref="modal" :size="bModalSize" :title="formTitle" hide-footer>
            <vue-form-builder v-bind="formParams" @submit="submitForm" @reset="closeForm" />
        </b-modal>
    </main>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    computed: {
        data() {
            return this.$store.state[this.namespace][this.namespace]
        },
        formParams() {
            return {
                errors: this.errors,
                fields: this.formFields,
                model: this.model,
                omitNull: true,
                useBootstrap: true,
                validateOnSubmit: false,
            }
        },
    },
    data() {
        return {
            model: {},
            errors: {},
            isBusy: false,
            formTitle: '',
            formAction: '',
            formFields: [],
            bModalSize: this.modalSize,

            // form fields used for deletion
            fieldsDelete: ['id', 'password_confirmation', 'buttons'],
        }
    },
    methods: {
        closeForm() {
            this.$refs['modal'].hide()
        },
        showCreateForm() {
            let data = this.model
            for (let key of Object.keys(data))
            {
                let val = data[key]
                if (typeof val === 'string')
                    data[key] = ''
                if (Array.isArray(val))
                    data[key] = []
            }
            this.showForm(data, 'ADICIONAR', 'create', this.fieldsCreate || this.fields, this.modalSize)
         },
        handleUserEvent(payload) {
            let { action, data } = payload
            if (action === 'edit')
                this.showForm(data, 'EDITAR', 'update', this.fieldsEdit || this.fields, this.modalSize)
            if (action === 'delete')
                this.showForm(data, `DELETAR ${data.name||data.titulo}`, 'delete', this.fieldsDelete, 'md')
        },
        showForm(data, title, action, fields, modalSize) {
            this.errors = {}
            this.model = {...data}
            this.formTitle = title
            this.formAction = action
            this.formFields = fields
            this.bModalSize = modalSize
            this.$refs['modal'].show()
        },
        showSuccess() {
            Swal.fire({
                title: 'SUCESSO!',
                icon: 'success',
                position: 'bottom-end',
                toast: true,
                timer: 2500,
                showConfirmButton: false,
            })
        },
        submitForm(data) {
            // do not make new request if it is busy making one
            if (this.isBusy) return

            // mark it as busy
            this.isBusy = true

            // clear errors
            this.errors = {}

            // compute the action to dispatch
            let action = this.namespace + '/' + this.formAction

            // make a request
            this.$store.dispatch(action, data)
                .then(() => {
                    this.showSuccess()
                    setTimeout(this.closeForm, 500)
                })
                .catch(exception => {
                    this.errors = exception.response.data.errors
                })
                .finally(() => {
                    this.isBusy = false
                    this.password = ''
                })
        },
    },
    props: {
        tableParams: {
            required: true,
            type: Object,
        },
        fields: {
            required: false,
            type: Array,
        },
        fieldsCreate: {
            type: Array,
        },
        fieldsEdit: {
            type: Array,
        },
        namespace: {
            required: true,
            type: String,
        },
        title: {
            required: true,
            type: String,
        },
        modalSize: {
            default: "md",
        }
    }
}
</script>