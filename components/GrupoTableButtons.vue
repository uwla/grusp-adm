<template>
    <div class="tag-actions">
        <b-button variant="success" :href="`/grupos/${grupo.id}`">
            <b-icon icon="eye" />
        </b-button>
        <b-button variant="primary" :href="`/grupos/editar/${grupo.id}`">
            <b-icon icon="pencil" />
        </b-button>
        <b-button variant="danger" :href="`/grupos/deletar/${grupo.id}`">
            <b-icon icon="trash" />
        </b-button>
    </div>
</template>
<style>
.tag-actions {
    display: flex;
    flex-wrap: nowrap;
    gap: 5px;
}
</style>
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
