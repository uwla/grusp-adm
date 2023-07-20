<template>
    <div>
        <!-- ERROR MESSAGE -->
        <message-errors :errors="errors" @hide="hideErrors()"/>

        <!-- SUCCESS MESSAGE -->
        <message-success :show="showSuccess" @hide="hideSuccess()">
            Grupo deletado!
        </message-success>

        <form class="form" @submit.prevent="submitForm()">
            <b-form-group label="Senha" label-for="password">
                <b-form-input type="password" v-model="password" id="password"/>
            </b-form-group>
            <b-button block variant="danger" type="submit">DELETAR</b-button>
        </form>
    </div>
</template>

<script>
export default {
    middleware: 'auth',

    data() {
        return {
            password: "",
            errors: [],
            showSuccess: false,
            formBusy: false,
        }
    },

    computed: {
        showErrors() {
            return this.errors.length > 0
        }
    },

    methods: {
        submitForm() {
            if (this.formBusy) return
            this.formBusy = true

            const url = `/grupo/${this.grupo.id}`;
            const data = {
                password: this.password,
                _method: "delete"
            }

            this.$axios.post(url, data)
                .then(res => {
                    this.hideErrors()
                    this.showSuccess = true
                    this.password = ""
                    setTimeout(() => this.$router.push('/grupos'), 1500)
                })
                .catch(e => {
                    this.handleErrors(e.response.data.errors)
                })
                .finally(() => this.formBusy = false)
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },

        handleErrors(errorsObj) {
            const errors = []
            for (let field in errorsObj)
                for (let errorMessage of errorsObj[field])
                    errors.push(errorMessage)
            this.errors = errors
        },
    },

    props: {
        grupo: Object
    }
}
</script>
