<template>
  <div class="comments">
            
    <!-- comment -->
    <div class="comments__item comments__item_root">
      <button :class="{ 'comments__branch-collapse': true, 'comments__branch-collapse_collapsed': collapsed2 }" @click.prevent="collapsed2 = !collapsed2" />

      <comment :collapsed="collapsed2" />

      <!-- branch -->
      <div class="comments__branch" v-if="!collapsed2">

        <!-- comment -->
        <div class="comments__item">
          <comment />
        </div>

        <!-- comment -->
        <div class="comments__item">
          <button :class="{ 'comments__branch-collapse': true, 'comments__branch-collapse_collapsed': collapsed }" @click.prevent="collapsed = !collapsed" />
          <comment :collapsed="collapsed" />

          <!-- branch -->
          <div class="comments__branch" v-if="!collapsed">
            <!-- comment -->
            <div class="comments__item">
              <comment />
            </div>

            <!-- comment -->
            <div class="comments__item">
              <comment />
            </div>
          </div>
          <!-- end of branch -->

        </div>
      </div>
      <!-- end of branch -->

    </div>

    <div class="comments__item  comments__item_root">
      <comment />
    </div>
    
    <div class="comments__item  comments__item_root">
      <comment />
    </div>    

  </div>
</template>

<script>
  import comment from './entry.vue'

  export default {
    data: () => ({
      collapsed: true,
      collapsed2: false
    }),
    components: { comment }
  }
</script>
