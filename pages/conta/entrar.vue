<template>
    <main class="w400">
        <h1>ENTRAR</h1>
        <vfb class="form" v-bind="{fields, errors}" @submit="login" />
    </main>
</template>
<script>
export default {
    middleware: 'auth',
    auth: 'guest',

    data() {
        return {
            fields: [
                'name:email|email',
                'name:password|password|label:Senha',
                'component:vfb-buttons|submitText=ENTRAR|showReset=false|class=block',
            ],
            errors: {},
            formBusy: false,
        }
    },

    methods: {
        login(payload) {
            // prevent making another request before receiving a response
            if (this.formBusy) return

            // make form as busy
            this.formBusy = true

            this.$auth.loginWith('local', {
                data: payload
            })
            .then(response => {
                this.$auth.setUser(response.data.user)
            })
            .catch(exception => {
                this.errors = exception.response.data.errors
            })
            .finally(() => {
                this.formBusy = false
            })
        },
    },
}
</script>
