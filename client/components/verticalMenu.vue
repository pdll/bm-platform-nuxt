<template>
  <ul class="VerticalMenu vertical">
          
    <li v-for="item in items" :key="item.value" @click.prevent="closeMenu">
      <nuxt-link v-if="item.link" :to="'/'" @click="item.onClick">
        <!--<Icon name={i.icon} />-->
        {{ item.label ? item.label : item.value }}
      </nuxt-link>
      <span v-else>
        <!--<Icon name={i.icon} />-->
        {{ item.label ? item.label : item.value }}
      </span>
    </li>

  </ul>
</template>

<script>
  export default {
    methods: {
      closeMenu: function () {}
    },
    props: {
      items: { type: Object, default: () => ([]) }
    }
  }
</script>
