<template>
    <main class="w500">
        <h1>REGISTRAR CONTA</h1>

        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ message }}
        </message-success>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <form class="form" @submit.prevent="register()">
            <b-form-group label="Nome" label-for="name">
                <b-form-input type="text" v-model="f.name" id="name"/>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
                <b-form-input type="text" v-model="f.email" id="email"/>
            </b-form-group>
            <b-form-group label="Senha" label-for="passsword">
                <b-form-input type="password" v-model="f.password" id="password"/>
            </b-form-group>
            <b-form-group label="Confirmação da senha" label-for="passsword_confirmation">
                <b-form-input type="password" v-model="f.password_confirmation" id="password_confirmation"/>
            </b-form-group>
            <b-button block variant="success" type="submit">
                REGISTRAR
            </b-button>
        </form>
    </main>
</template>

<script>
export default {
    data() {
        const data = {
            f: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            errors: [],
            showSuccess: false,
            message: "Conta criada com sucesso!",
            formBusy: false,
        }
        return data
    },

    methods: {
        register() {
            if (this.formBusy) return
            this.formBusy = true

            this.hideErrors()
            this.hideSuccess()

            const axios = this.$axios
            const url = "/auth/register"
            const data = this.f

            axios.post(url, data)
                .then(() => {
                    this.hideErrors()
                    this.showSuccessMsg()
                    this.clearForm()
                })
                .catch(e => {
                    let errors = e.response.data.errors
                    this.handleErrors(errors)
                }).then(() => {
                    this.formBusy = false
                });
        },

        handleErrors(errors) {
            this.errors = []
            for (let field in errors)
                for (let errorMessage of errors[field])
                    this.errors.push(errorMessage)
            this.showErrors = true
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },

        showSuccessMsg() {
            this.showSuccess = true
        },

        clearForm() {
            for (let field in this.f)
                this.f[field] = ""
        }
    }
}
</script>
