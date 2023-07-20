<template>
    <main>
        <grupo-view :grupo="grupo" />
    </main>
</template>
<script>
export default {
    middleware: 'auth',

    async asyncData({ $axios, params }) {
        const id = params.id
        const url = `/grupo/${id}`
        const grupo = (await $axios.get(url)).data
        return { grupo }
    },
}
</script>
