<template>
  <panel v-if="!fetching">
    <h3 class="panel__title" slot="header">Добро пожаловать в программу {{ program.title }}, {{ user.first_name }}!</h3>

    <div slot="sub-header">
      <p>Нажмите «активировать» чтобы подвердить свое участие в программе</p>
    </div>
    
    <button :class="{ 'myBtn': true, 'myBtn_hollow': activating }" :disabled="fetching || activating" @click.prevent="activate(activation.hash)">
      <template v-if="!activating">Активировать</template>
      <template v-else>Загрузка...</template>
    </button>
  </panel>
</template>

<script>
  import axios from 'axios'

  let initialData = {
    fetching: false,
    activating: false
  }

  export default {
    layout: 'auth',
    methods: {
      activate: function (hash) {
        this.activating = true
        return axios.post('http://localhost:3000/api/users/program/activation', { hash, confirmation: true })
          .then(({ status }) => {
            if (status === 200) {
              setTimeout(() => {
                this.activating = false
                this.$router.push('/')
              }, 1000)
            }
          })
          .catch(err => console.warn(err))
      }
    },
    data ({ params, error }) {
      return axios.post('http://localhost:3000/api/users/program/activation', { hash: params.hash })
        .then(res => {
          let { program } = res.data

          if (!program) return error({ statusCode: 403, message: 'Ваша ссылка недействительна' })

          let user = program.Users[0]
          let activation = user.UserProgram

          return { program, user, activation, ...initialData }
        })
        .catch(err => console.log(err.message))
    }
  }
</script>
