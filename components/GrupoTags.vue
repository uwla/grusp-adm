<template>
    <div class="tag-container">
        <b-button v-for="tag,i in tags" :key="i"
            @click="click(tag)" variant="success" size="sm">
            {{ tag }}
        </b-button>
    </div>
</template>

<script>
export default {
    methods: {
        click(tag) {
            this.$emit('tagClicked', tag)
        },
    },
    props: {
        tags: Array,
    },
}
</script>
