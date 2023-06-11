<template>
    <noscript>
        Esta página deve efetuar o logout. Para isso, garanta que JavaScript está habilitado
    </noscript>
</template>

<script>
export default {
    middleware: 'auth',
    mounted() {
        this.$auth.logout()
    }
}
</script>
