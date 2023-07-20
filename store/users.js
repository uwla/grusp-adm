import { createMutations, createActions, createState } from "../utils"

export const state = createState('users')
export const mutations = createMutations('users')
export const actions = createActions('/user')
