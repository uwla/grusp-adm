<template>
    <main>
        <h1>MAIN CONTENT</h1>
        bem vindo {{ user.name }}, <br/>
        seu email eh {{ user.email }} <br/>
        seus cargos são: {{ user.roles }}
    </main>
</template>

<script>
export default {
    middleware: 'auth',
    computed: {
        user() {
            return this.$auth.user
        }
    },
    methods: {
        foo() {
            console.log(this.$auth.strategy, this.$auth.strategy.token)
        }
    },
}
</script>
