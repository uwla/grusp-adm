import Vue from 'vue'
import { mount } from '@vue/test-utils'
import plugin from '@uwlajs/vue-form-builder'
import LoginPage from '@/pages/conta/entrar.vue'

Vue.use(plugin)

const wrapper = mount(LoginPage)

test('it is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
})

test('it displayes form fields', () => {
    expect(wrapper.find('input[type=email]').exists()).toBe(true)
    expect(wrapper.find('input[type=password]').exists()).toBe(true)
    expect(wrapper.find('button[type=submit]').exists()).toBe(true)
})