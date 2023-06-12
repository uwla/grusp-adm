<template>
    <main>
        <h1>TAGS</h1>
        <ul>
            <li v-for="tag,i in tags" :key="i">
                {{ tag.name }}: {{ tag.tags }}
            </li>
        </ul>
    </main>
</template>

<script>
export default {
    async asyncData({ $auth, $axios }) {
        const token = $auth.strategy.token.get()
        const headers = { 'Authorization' : token }
        const tags = (await $axios.get('/tag', { headers })).data
        return { tags }
    },
}
</script>
