<template>
  <component :is="component" :class="{ 'panel': true, 'panel_no_margin': noMargin, [ 'panel_margin_' + margin ]: margin }">
    <panelHeader v-if="$slots['header']" :noBorder="header.noBorder || (!$slots['menu'] && !!$slots['sub-header']) || false"><slot name="header" /></panelHeader>
    <panelMenu v-if="$slots['menu']"><slot name="menu" /></panelMenu>
    <panelSubHeader v-if="$slots['sub-header']" :noPadding="subHeader.noPadding || false"><slot name="sub-header" /></panelSubHeader>

    <panelBody v-if="!noBody" :padding="body.padding" :noPadding="body.noPadding" :noVerticalPadding="body.noVerticalPadding" :noHorizontalPadding="body.noHorizontalPadding">
      <slot />
    </panelBody>

    <panelFooter v-if="$slots['footer']"><slot name="footer" /></panelFooter>
  </component>
</template>

<script>
  import panelMenu from './menu.vue'
  import panelBody from './body.vue'
  import panelFooter from './footer.vue'
  import panelHeader from './header.vue'
  import panelSubHeader from './sub-header.vue'

  export default {
    props: {
      header: { type: Object, default: () => ({ noBorder: false }) },
      subHeader: { type: Object, default: () => ({ noPadding: false }) },
      body: { type: Object, default: () => ({ padding: null, noPadding: false, noVerticalPadding: false, noHorizontalPadding: false }) },
      component: { type: String, default: 'div' },
      noBody: { type: Boolean, default: false },
      noMargin: { type: Boolean, default: false },
      margin: { type: String, default: null }
    },
    components: {
      panelMenu,
      panelBody,
      panelFooter,
      panelHeader,
      panelSubHeader
    }
  }
</script>
