<template>
    <main>
        <grupo-view :grupo="grupo" />
    </main>
</template>
<script>
export default {
    middleware: 'auth',

    async asyncData({ $auth, $axios, params, store }) {
        const id = params.id
        const url = `/grupo/${id}`
        const token = $auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const grupo = (await $axios.get(url, { headers }) ).data
        return { grupo }
    },
}
</script>
