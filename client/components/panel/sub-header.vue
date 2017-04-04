<template>
  <div :class="{ 'panel__sub-header': true, 'panel__sub-header_no_padding': noPadding }">
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      noPadding: { type: Boolean, default: false }
    }
  }
</script>
