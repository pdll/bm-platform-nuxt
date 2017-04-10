export const state = {
  list: {}
}

export const actions = {}

export const mutations = {
  push: (state, { list }) => {
    state.list = { ...state.list, ...list }
  }
}
