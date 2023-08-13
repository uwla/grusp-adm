<template>
    <main class="w400">
        <h1>ENTRAR</h1>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <b-form class="form" @submit.prevent="login()">
            <b-form-group label="Email" label-for="email">
                <b-form-input type="email" v-model="email" id="email" required />
            </b-form-group>
            <b-form-group label="Senha" label-for="passsword">
                <b-form-input type="password" v-model="password" id="password" required/>
            </b-form-group>
            <b-button block variant="success" type="submit">
                ENTRAR
            </b-button>
        </b-form>
    </main>
</template>
<script>
import { parseResponseErrors } from '../../utils'

export default {
    middleware: 'auth',
    auth: 'guest',

    computed: {
        showErrors() {
            return this.errors.length > 0
        },
    },

    data() {
        return {
            password: '',
            email: '',
            formBusy: false,
            errors: [],
        }
    },

    methods: {
        clearForm() {
            this.password = ''
            this.email = ''
        },

        login() {
            if (this.formBusy) return
            this.formBusy = true
            const { password, email } = this
            const auth = this.$auth

            auth.loginWith('local', {
                data: { password, email },
            })
            .then(response => {
                auth.setUser(response.data.user)
            })
            .catch(exception => {
                this.errors = parseResponseErrors(exception.response)
            })
            .finally(() => (this.formBusy = false))
        },

        hideErrors() {
            this.errors = []
        },
    },
}
</script>
