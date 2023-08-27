import Vue from 'vue'
import { default as install, fieldAliases } from '@uwlajs/vue-form-builder'
import '@uwlajs/vue-form-builder/dist/VueFormBuilder.css'

fieldAliases.delAllAliases()
fieldAliases.addAlias('id',
    'name:id|label:none|hidden|type:input|componentWrapper:div')
fieldAliases.addAlias('password_confirmation',
    'name:password|label:Digite sua senha para confirmar|password')
fieldAliases.addAlias('buttons', {
    component: 'vfb-buttons',
    componentWrapper: 'div',
    label: 'none',
    props: {
        submitText: 'SALVAR',
        cancelText: 'CANCELAR',
        class: 'block',
    }
})

Vue.use(install)
