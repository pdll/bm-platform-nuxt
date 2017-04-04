export const state = {
  list: {},
  structure: [],
  collapsed: [],
  post_id: null
}

export const actions = {
  fetch: ({ commit, state }, { post_id }) => {},
  add: ({ commit, rootState }, { parent_id, data }) => {
    // let user = rootState.user.id
  },
  remove: ({ commit, state }, { comment_id }) => {}
}

export const mutations = {
  set: (state, { list }) => {},
  clear: state => {
    state.list = {}
    state.structure = []
    state.collapsed = []
  },
  remove: (state, { comment_id }) => {
    if (state.list[comment_id]) delete state.list[comment_id]
  },
  collapse: (state, { branchId }) => {
    let branchIndex = state.collapsed.indexOf(branchId)
    if (state.list[branchId] && branchIndex === -1) state.collapsed.push(branchId)
  },
  expand: (state, { branchId }) => {
    let branchIndex = state.collapsed.indexOf(branchId)
    if (state.list[branchId] && branchIndex !== -1) delete state.collapsed[branchIndex]
  }
}
