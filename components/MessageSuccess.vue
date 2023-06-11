<template>
    <b-alert variant="success" :show="show" dismissible @dismissed="hide()">
        <slot></slot>
    </b-alert>
</template>

<script>
export default {
    methods: {
        hide() {
            this.$emit('hide')
        }
    },
    props: {
        message: String,
        show: Boolean,
    }
}
</script>
