<template>
    <div class="img-cropper" ref="wrapper">
        <div v-if="imgURI">
            <img :src="imgURI" alt="">
            <p class="text-center">A imagem acima será a imagem do grupo</p>
        </div>
        <vue-anka-cropper :options="cropperOptions" @cropper-saved="updateImg" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgURI: this.model.img,
            cropperOptions: {
                showPreview: false,
                dropareaMessage: 'Descarregue a imagem aqui',
                selectButtonLabel: 'Selecionar imagem',
            },
        }
    },
    methods: {
        updateImg(payload) {
            this.imgURI = payload.croppedImageURI
            this.$emit('input', payload.croppedFile)
        },
        normalizeButtons() {
            // add type=button to prevent form submission when clicking the buttons
            this.$refs['wrapper'].querySelectorAll('button').forEach(btn => {
                btn.setAttribute('type', 'button')
            })
        }
    },
    mounted() {
        this.normalizeButtons()
    },
    props: ['value', 'model'],
    updated() {
        this.$nextTick(this.normalizeButtons)
    }
}
</script>
<style>
.ankaCropper a {
    box-sizing: content-box;
}

.ankaCropper svg {
    vertical-align: unset;
}

.ankaCropper__saveButton {
    display: flex !important;
    align-items: center;
}
</style>