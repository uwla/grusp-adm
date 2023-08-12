<template>
    <b-modal id="form-delete" :title="title" hide-footer>
        <p>{{ messageConfirmation }}</p>

        <message-errors :errors="errors" @hide="hideErrors()" />

        <form @submit.prevent="deleteModel()">
            <b-form-group label="Confirme com sua senha:" label-for="password">
                <b-form-input type="password" v-model="password" name="password" />
            </b-form-group>
            <div class="text-right">
                <b-button variant="danger" type="submit">
                    DELETAR
                </b-button>
            </div>
        </form>
    </b-modal>
</template>
<script>
import { parseResponseErrors } from '../utils'

export default {
    data() {
        return {
            password: '',
            isBusy: false,
            errors: [],
        }
    },

    methods: {
        deleteModel() {
            if (this.isBusy) return
            this.isBusy = true
            this.errors = []

            const { password, action, modelId: id } = this
            const payload = { id, password }

            this.$store.dispatch(action, payload)
                .then(() => {
                    this.$bvModal.hide('form-delete')
                })
                .catch(exception => {
                    this.errors = parseResponseErrors(exception.response)
                })
                .finally(() => {
                    this.isBusy = false
                    this.password = ''
                })
        },
        hideErrors() {
            this.errors = []
        },
    },

    props: {
        action: String,
        modelId: Number,
        messageConfirmation: String,
        messageDeleted: String,
        title: String,
    },
}
</script>
