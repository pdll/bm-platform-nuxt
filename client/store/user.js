let user = {
  mame: 'pdll',
  last_name: 'Юринов',
  first_name: 'Степан'
}

export const state = {
  logged: false,
  info: user
}

export const actions = {
  login: ({ commit }, { login, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('log_in', { info: user })
        resolve(user)
      }, 1500)

      // setTimeout(() => {
      //    reject({ err: { message: 'Bad credentials' } })
      // }, 500)
    })
  }
}

export const mutations = {
  log_in: (state, { info = null } = {}) => {
    state.logged = true
    state.info = info
  },
  log_out: state => {
    state.logged = false
    state.info = {}
  }
}
