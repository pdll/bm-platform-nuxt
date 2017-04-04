<template>
  <span :class="{ 'Reblog__button': true, ['Reblog__button-' + state]: state, 'loading': loading }">
    <a href="#" @click.prevent="reblog" title="translate('reblog')">
      <!--<Icon name="reblog" />-->
    </a>
  </span>
</template>

<script>
  export default {
    methods: {
      reblog: function () {}
    },
    props: {
      state: { type: String, default: null },
      loading: { type: Boolean, default: false }
    }
  }
</script>
