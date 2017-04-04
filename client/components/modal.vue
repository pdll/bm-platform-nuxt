<template>
  <transition name="modal-fade">
    <div class="vue-modal-portal" v-if="opened || forceOpened" :id="uniq">
      <div class="modal__overlay" @click.self="onClose" ref="modal-overlay">
      
        <div class="modal__content" tabindex="-1"  :style="contentStyles"  ref="modal-content">
          <button class="modal__close" @click.prevent="onClose" />
          <slot @onClose="onClose" @scrollTop="scrollTop" />
          
        </div>

      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'app-modal',
    methods: {
      onClose: function () {
        this.$emit('onClose')
        if (this.forceOpened) this.forceOpened = false
      },
      toggleVisibility: function () {
        if (this.opened || this.forceOpened) {
          if (this.hash) this.$router.push('#' + this.hash)
          document.body.class += ' noscroll'
        } else {
          if (this.hash) this.$router.push('#')
          document.body.class = document.body.class.replace('noscroll', '')
        }
      }
      // adjustPosition: function () {
      //   if (this.$refs['modal-overlay'] && this.$refs['modal-content']) {
      //     let diff = this.$refs['modal-overlay'].getBoundingClientRect().height - this.$refs['modal-content'].getBoundingClientRect().height
      //     if (diff > 0) this.top = diff / 2
      //   }
      // }
    },
    watch: {
      opened: function () { this.toggleVisibility() },
      forceOpened: function () { this.toggleVisibility() },
      scrollTop: function () { if (this.$refs['modal-overlay']) this.$refs['modal-overlay'].scrollTop = this.scrollTop }
    },
    computed: {
      uniq: () => Math.floor(Math.random() * 10000),
      contentStyles: function () {
        let styles = { maxWidth: this.width }
        if (this.height) styles.height = this.height
        // if (this.top) styles.top = this.top + 'px'

        return styles
      }
    },
    data: () => ({
      forceOpened: false,
      top: 0
    }),
    mounted: function () {
      document.body.append(this.$el)
      if (this.hash) this.forceOpened = ('#' + this.hash) === window.location.hash
      if (this.$refs['modal-overlay']) this.$refs['modal-overlay'].scrollTop = this.scrollTop
    },
    destroy: function () {
      this.$el.remove()
      document.body.class = document.body.class.replace('noscroll', '')
    },
    props: {
      opened: { type: Boolean, dafault: false },
      width: { type: String, default: '550px' },
      height: { type: String, default: null },
      hash: { type: String, default: null },
      scrollTop: { type: Number, default: 0 }
    }
  }
</script>
