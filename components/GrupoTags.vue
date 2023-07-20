<template>
    <div class="tag-container">
        <b-button variant="success" size="sm"
            v-for="tag,i in tags" :key="i" @click="click(tag)">
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
