<template>
    <main class="w700" style="min-height: 120vh">
        <h1>REGISTRAR GRUPO</h1>
        <b-link href="/meus-grupos">Voltar</b-link>
        <br />
        <br />
        <grupo-form v-bind="formParams" />
    </main>
</template>

<script>
export default {
    middleware: 'auth',

    async asyncData({ store }) {
        // fetch tags for creating a grupo
        // these tags will be stored in our vuex store
        await store.dispatch('grupo/fetchTags')

        return {
            formParams: {
                grupo: {},
                method: 'post',
                successMessage: 'Grupo criado!',
                url: '/grupo',
            },
        }
    },
}
</script>
