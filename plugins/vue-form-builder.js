import Vue from 'vue'
import { default as install, fieldAliases } from '@uwlajs/vue-form-builder'
import '@uwlajs/vue-form-builder/dist/VueFormBuilder.css'

fieldAliases.delAllAliases()
fieldAliases.addAliases({
    'id': 'name:id|label:none|hidden|type:input|componentWrapper:div',
    'name': 'name:name|text|label:Nome',
    'email': 'name:email|email',
    'password': 'name:password|password|label:Senha',
    'password_confirmation': 'name:password|label:Digite sua senha para confirmar|password',
    'buttons': {
        component: 'vfb-buttons',
        componentWrapper: 'div',
        label: 'none',
        props: {
            submitText: 'SALVAR',
            resetText: 'CANCELAR',
            class: 'block',
        },
    }
})

Vue.use(install)