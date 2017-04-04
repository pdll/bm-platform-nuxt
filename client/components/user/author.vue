<template>
  <span class="Author">
    <span itemProp="author" itemScope itemType="http://schema.org/Person" class="Author__name">
      <nuxt-link :to="{ name: 'user', params: { user: '@' + username.name } }">{{ fullName }}</nuxt-link>
    </span>
  </span>
</template>

<script>
  export default {
    computed: {
      fullName: function () {
        return this.username.first_name + ' ' + this.username.last_name
      }
    },
    data: () => ({
      username: {
        first_name: 'Степан',
        last_name: 'Юринов',
        name: 'paperdoll'
      }
    })
  }
</script>
