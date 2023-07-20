<template>
    <grupo-tags :tags="grupo.tags" />
</template>
<script>
export default {
    computed: {
        grupo() {
            return this.data
        },
    },
    props: {
        data: Object,
    },
}
</script>
