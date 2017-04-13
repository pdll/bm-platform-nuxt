<template>
  <panel>
    <div v-for="user in users">
      {{ user.first_name }} {{ user.name }} {{ user.last_name }}

      <a @click.prevent="cehRegister(user.id)">Зарегистрировать в ЦЕХ</a>
    </div>
  </panel>
</template>

<script>
  import axios from 'axios'

  export default {
    methods: {
      cehRegister: function (userId) {
        axios.post('/api/users/program/register', {
          program_id: 1,
          user_id: userId
        })
          .then(({ data, status }) => {
            if (status === 200 && data.result) console.log('ecgt[')
            else if (data.message) console.log(data.message)
          })
      }
    },
    data () {
      return axios.get('http://localhost:3000/api/users/list')
        .then(({ data, status }) => ({
          users: data.users,
          message: null
        }))
        .catch(err => console.warn(err))
    },
    components: {}
  }
</script>
