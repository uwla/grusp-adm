<template>
    <b-alert :show="show" variant="danger" dismissible @dismissed="hide()">
        <ul>
            <li v-for="error,i in errors" :key="i">
                {{ error }}
            </li>
        </ul>
    </b-alert>
</template>

<script>
export default {
    computed: {
        show() {
            return this.errors.length > 0
        }
    },
    methods: {
        hide() {
            this.$emit('hide')
        }
    },
    props: {
        errors: Array,
    }
}
</script>
