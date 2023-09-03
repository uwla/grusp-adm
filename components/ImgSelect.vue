<template>
    <b-form-checkbox-group v-model="selectedImages" @input="handleInput">
        <b-form-checkbox v-for="img, i in images" :key="i" :value="img.id">
            <img class="img-checkbox" :src="img.url">
        </b-form-checkbox>
    </b-form-checkbox-group>
</template>
<script>
export default {
    computed: {
        images() {
            return this.model.images
        }
    },
    data() {
        return {
            selectedImages: []
        }
    },
    methods: {
        handleInput() {
            this.$emit('input', this.selectedImages)
        }
    },
    props: ['value', 'model']
}
</script>
<style>
.img-checkbox {
    width: 80px;
    margin: 5px;
    height: 80px;
}
</style>