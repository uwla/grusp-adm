<template>
    <main class="w500">
        <h1>DELETAR GRUPO</h1>
        <b-link href="/meus-grupos">Voltar</b-link><br/><br/>
        <p>Para ter certeza que deseja deletar o grupo, digite sua senha:</p>
        <grupo-delete :grupo="grupo" />
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    async asyncData({ $auth, $axios, params, store }) {
        // fetch tags for creating a grupo
        // these tags will be stored in our vuex store
        await store.dispatch('grupo/fetchTags')

        // fetch the Grupo
        const id = params.id
        const url = `/grupo/${id}`
        const token = $auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const grupo = (await $axios.get(url, { headers }) ).data

        return { grupo }
    },
}
</script>
