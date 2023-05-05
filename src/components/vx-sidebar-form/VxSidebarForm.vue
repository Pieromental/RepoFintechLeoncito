<template>
  <VxSidebarPersonalized :parent="parentx" class="sidebarx"  color='primary'  v-model="inputModel" :value="inputModel" :width='30' :click-not-close='true' spacer >
    <VuePerfectScrollbar class="class-form" :settings="settings">
      <div class="sidebar-form-container">
        <div class="sidebar-form-header" >
          <slot name="header" >
          </slot>
        </div>
        <vs-divider />
        <div class="sidebar-form-body scroll-area" :class="minHeight ? 'sidebar-form-body-height-min':'sidebar-form-body-height-max'" >
          <slot name="body"></slot>
        </div>
        <vs-divider />
        <div class="sidebar-form-footer" >
          <slot name="footer"></slot>
        </div>
      </div>
    </VuePerfectScrollbar>
  </VxSidebarPersonalized>
</template>

<script>

import VxSidebarPersonalized from '@/components/VxSidebarPersonalized';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

export default {
  
  name: 'VxSidebarForm',

  components: {
    VxSidebarPersonalized,
    VuePerfectScrollbar
  },
  
  props: {
    value:{
      default: '',
    },
    parentx: {
      type: [String, Object],
      default: ''
    },
    color: {
      type: String,
      default: 'primary'
    }
  },

  data: () => ({
    minHeight: false,
    settings: {
      maxScrollbarLength: 60,
      wheelSpeed: 0.6
    }
  }),
  
  computed:{
    inputModel:{
      get(){
        return this.value;
      },
      set(newValue){
        this.$emit('input', newValue);
      }
    },
  },

  methods: {
    bodyHeight(){
      if(document.getElementById('VxSidebarFormBinnacle')) this.minHeight = true;
      else this.minHeight = false;
    }
  },
  
  updated(){
    this.bodyHeight() 
  }

};
</script>

<style lang="scss">

  .class-form{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;   
  }

  .sidebar-form-container {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 100vh;
  }
  
  .sidebar-form-header {
    position: sticky;
    top: 0rem;
    color: rgba(var(--vs-primary), 1) !important;
    font-weight: 600 !important;
    span {
      text-transform: uppercase;
    }
  }

  .sidebar-form-body {
    border-radius: 1rem;
    overflow-y: auto;
  }

  .sidebar-form-body-height-min{
    height: calc(100% - 19rem);
  }

  .sidebar-form-body-height-max{
    height: calc(100% - 14.5rem);
  }

  .sidebar-form-footer {
    position: sticky;
    bottom: 0rem;
  }

</style>
