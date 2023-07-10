<template>
    <div>
        <!-- ERROR MESSAGE -->
        <message-errors :errors="errors" @hide="hideErrors()"/>

        <!-- SUCCESS MESSAGE -->
        <message-success :show="showSuccess" @hide="hideSuccess()">
            {{ successMessage }}
        </message-success>

        <!-- FORM -->
        <form class="form" @submit.prevent="nothing()">
            <b-form-group label="Título" label-for="titulo">
                <b-form-input type="text" v-model="titulo" id="titulo"/>
            </b-form-group>
            <b-form-group label="Descrição" label-for="descricao">
                <b-form-textarea v-model="descricao" id="descricao" rows="8"/>
            </b-form-group>

            <b-form-group label="Imagem Principal">
                <div v-if="imgURI">
                    <img :src="imgURI" alt="">
                    <p class="text-center">A imagem acima será a imagem do grupo</p>
                </div>
                <vue-anka-cropper :options="cropperOptions" @cropper-saved="updateImg"/>
            </b-form-group>

            <b-form-group label="Fotos do grupo (adicionar fotos)" label-for="images">
                <b-form-file v-model="images"  id="images" accept=".jpg" multiple/>
            </b-form-group>

            <b-form-group v-if="imagesCurrent.length > 0"
                label="Fotos atuais do grupo (selecione para remover)">
                <b-form-checkbox-group v-model="imagesToDel">
                    <b-form-checkbox v-for="img,i in imagesCurrent" :key="i" :value="img.id">
                        <img class="img-check" :src="img.url">
                    </b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>

            <b-form-group label="Informações de contato" label-for="contato">
                <b-form-textarea v-model="contato" id="contato" rows="3"/>
            </b-form-group>
            <b-form-group label="Informações de horários de encontro" label-for="horario">
                <b-form-textarea v-model="horario" id="horario" rows="3"/>
            </b-form-group>
            <b-form-group label="Informações do lugar de encontro" label-for="lugar">
                <b-form-textarea v-model="lugar" id="lugar" rows="3"/>
            </b-form-group>
            <b-form-group label="Informações sobre mensalidade" label-for="mensalidade">
                <b-form-textarea v-model="mensalidade" id="mensalidade" rows="3"/>
            </b-form-group>
            <b-form-group label="Informações sobre público alvo" label-for="publico">
                <b-form-textarea v-model="publico" id="publico" rows="3"/>
            </b-form-group>
            <b-form-group label="Links úteis (redes sociais, grupos de mensagem, site)" label-for="links">
                <b-form-textarea v-model="links" id="links" rows="3"/>
            </b-form-group>

            <b-form-group label="Categoria do grupo">
                <multiselect v-bind="params" v-model="tags"/>
            </b-form-group>

            <div class="form-buttons">
                <b-button block variant="success" @click="submitForm()">
                    ENVIAR
                </b-button>
                <b-button block variant="danger" type="reset">RESETAR</b-button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            titulo: "",
            descricao: "",
            contato: "",
            mensalidade: "",
            horario: "",
            lugar: "",
            publico: "",
            links: "",
            img: null,
            imgURI: null,
            images: [],
            imagesCurrent: [],
            imagesToDel: [],
            tags: [],
            errors: [],
            showSuccess: false,
            cropperOptions: {
                showPreview: false,
                dropareaMessage: "Descarregue a imagem aqui",
                selectButtonLabel: "Selecionar imagem",
            },
        }
    },

    computed: {
        // these are the parameters for vue multiselect
        params() {
            return this.$store.getters['grupo/multiselectParams']
        },

        showErrors() {
            return this.errors.length > 0
        }
    },

    mounted() {
        // initialize the values
        this.titulo = this.grupo.titulo ?? ""
        this.descricao = this.grupo.descricao ?? ""
        this.contato = this.grupo.contato ?? ""
        this.horario = this.grupo.horario ?? ""
        this.links = this.grupo.links ?? ""
        this.lugar = this.grupo.lugar ?? ""
        this.mensalidade = this.grupo.mensalidade ?? ""
        this.publico = this.grupo.publico ?? ""
        this.tags = this.grupo.tags ?? []
        this.imgURI = this.grupo.img ?? ""
        this.imagesCurrent = this.grupo.images ?? []
    },

    methods: {
        updateImg(payload) {
            this.img = payload.croppedFile
            this.imgURI = payload.croppedImageURI
        },

        // don't do nothing
        // this is due to VueAnkaCropper plugin which is accidentally submiting
        // the form even if the user does not click the SUBMIT button
        nothing() { },

        // actually submit the form
        submitForm() {
            const { contato, descricao, horario, images, imagesToDel, img, links, lugar,
                mensalidade, method, publico, tags, titulo, url } = this
            const formData = new FormData()

            // append string fields
            formData.append('titulo', titulo)
            formData.append('descricao', descricao)
            formData.append('contato', contato)
            formData.append('horario', horario)
            formData.append('links', links)
            formData.append('lugar', lugar)
            formData.append('mensalidade', mensalidade)
            formData.append('publico', publico)
            formData.append('_method', method)

            // append main image
            if (img != null) formData.append('img', img)

            // append images to be added
            images.forEach(im => formData.append('images[]', im))

            // append images to be deleted
            imagesToDel.forEach(im => formData.append('images_del[]', im))

            // append tag array
            tags.forEach(t => formData.append('tags[]', t))

            // request headers
            const token = this.$auth.strategy.token.get()
            const headers = {
                'Authorization': token,
                'Content-Type': 'multipart/form-data',
            }

            this.$axios.post(url, formData, { headers })
                .then(res => {
                    this.hideErrors()
                    this.showSuccess = true
                    console.log(res.data)
                })
                .catch(e => {
                    this.handleErrors(e.response.data.errors)
                })
        },

        hideErrors() {
            this.errors = []
        },

        hideSuccess() {
            this.showSuccess = false
        },

        handleErrors(errorsObj) {
            const errors = []
            for (let field in errorsObj)
                for (let errorMessage of errorsObj[field])
                    errors.push(errorMessage)
            this.errors = errors
        },
    },

    props: {
        grupo: Object,
        url: String,
        method: String,
        successMessage: String,
    },

}
</script>

<style type="text/css">
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
.form .img-check {
    width: 80px;
    margin: 5px;
    height: 80px;
}
</style>
