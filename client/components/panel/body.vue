<template>
  <div :class="{
    'panel__body': true,
    'panel__body_no_padding': noPadding,
    'panel__body_no_vertical-padding': noVerticalPadding,
    'panel__body_no_horizontal-padding': noHorizontalPadding,
    [ 'panel__body_padding panel__body_padding_' + paddingClass ]: paddingClass
    }">
    <slot />
  </div>
</template>

<script>
  let paddings = [ 'small' ]

  export default {
    computed: {
      paddingClass: function () {
        if (this.padding && paddings.indexOf(this.padding.toLowerCase() !== -1)) return this.padding.toLowerCase()
        return null
      }
    },
    props: {
      padding: { type: String, default: null },
      noPadding: { type: Boolean, default: false },
      noVerticalPadding: { type: Boolean, default: false },
      noHorizontalPadding: { type: Boolean, default: false }
    }
  }
</script>
