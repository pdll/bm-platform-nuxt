import axios from 'axios'

export const state = {
  list: {},
  keys: []
}

export const actions = {
  fetch: ({ commit, state }, { params }) => {
    return new Promise((resolve, reject) => {
      axios.get('/api/feed/all')
        .then(res => {
          console.log(res)
          commit('fill', { data: res.data.result })
          resolve(res.data.result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export const mutations = {
  fill: (state, { data }) => {
    let keys = []
    let list = {}
    let users = {}

    data.map(el => {
      keys.push(el.post_id)
      list[el.post_id] = el
      if (el.Post.User) users[el.Post.User.id] = el.Post.User
    })

    state.list = { ...state.list, ...list }
    state.keys = keys
  },
  clear: state => {
    state.list = {}
    state.keys = []
  },
  clearKeys: state => {
    state.keys = []
  }
}
