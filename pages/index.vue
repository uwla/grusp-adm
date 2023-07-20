<template>
    <main>
        <h1>GRUSP ADM</h1>
        <p>Bem vindo {{ user.name }}</p>
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
}
</script>
