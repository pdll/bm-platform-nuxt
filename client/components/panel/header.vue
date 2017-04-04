<template>
  <div :class="{ 'panel__header': true, 'panel__header_no-border': noBorder }">
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      noBorder: { type: Boolean, default: false }
    }
  }
</script>
