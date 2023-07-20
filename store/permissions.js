import { createMutations, createActions } from "../utils"

export function state() {
    return { permissions: [] }
}

export const mutations = createMutations('permissions')

export const actions = createActions('/permission')
