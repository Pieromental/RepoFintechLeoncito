<template>
  <div>
    <div v-if="!multiple">
      <v-select class="font-label style-dropdown" v-bind="$attrs" v-on="$listeners" :id="name" :showClearButton="clearable" :filterBy="filterByIdLabel" :options="options" v-model="inputModel" :placeholder="placeholder" :disabled="disabled" :inputId="'input'+name" @search:focus="styleFocus(name)" @search:blur="styleBlur(name)" :maxHeight="maxHeight" >
        <template slot="selected-option" slot-scope="option" >
          <slot name="selected-option" v-bind:codigo="option.codigo" v-bind:label="option.label" > </slot>  
        </template>
        <template slot="option" slot-scope="option" >
          <slot name="option" v-bind:codigo="option.codigo" v-bind:label="option.label" > </slot>  
        </template>
        <template slot="no-options" >
          <slot name="no-options" > </slot>  
        </template>
      </v-select>
    </div>
    <div v-else>
      <v-select class="font-label style-dropdown" v-bind="$attrs" v-on="$listeners" :id="name" :showClearButton="clearable" :filterBy="filterByIdLabel" :options="options" v-model="inputModels" :placeholder="placeholder" :disabled="disabled" :inputId="'input'+name" @search:focus="styleFocus(name)" @search:blur="styleBlur(name)" :maxHeight="maxHeight"  multiple >
        <template slot="selected-option" slot-scope="option" >
          <slot name="selected-option" v-bind:codigo="option.codigo" v-bind:label="option.label" > </slot>  
        </template>
        <template slot="option" slot-scope="option" >
          <slot name="option" v-bind:codigo="option.codigo" v-bind:label="option.label" > </slot>  
        </template>
        <template slot="no-options" >
          <slot name="no-options" > </slot>  
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>

import vSelect from 'vue-select';

export default {

  name: "ComboBox",

  components: {
    vSelect
  },

  props: {
    name:{
      type: String,
      default: '',
    },
    value:{
      default: '',
    },
    values:{
      type: Array,
      default() {
        return []
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    placeholder: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: "400px"
    }
  },
  
  computed: {
    inputModel:{
      get(){
        return this.value;
      },
      set(newValue){
        this.$emit('input', newValue);
      }
    },
    inputModels:{
      get(){
        return this.values;
      },
      set(newValues){
        this.$emit('input', newValues);
      }
    },
  },

  methods: {
    filterByIdLabel(option, label, search) {
      return (option.codigo || '').toString().toLowerCase().indexOf(search.toLowerCase()) > -1 || (option.label || '').toString().toLowerCase().indexOf(search.toLowerCase()) > -1;
    },
    styleBlur(id){
      if(id){
        let select = document.getElementById(id).childNodes[0];
        setTimeout(() => {
          select.style.border = '';
          select.style.boxShadow = '';
        }, 1);
      }
    },
    styleFocus(id){
      if(id){
        let select = document.getElementById(id).childNodes[0];
        setTimeout(() => {
          select.style.border = '1px solid rgba(var(--vs-primary),1)';
          select.style.boxShadow = '0 3px 10px 0 rgba(0,0,0,.15)';
        }, 1);
      }
    },
    focusInput(){
      if(this.name) document.getElementById('input'+this.name).focus();
    }
  }

};
</script>

<style lang="scss">
  .style-dropdown{
    ul.dropdown-menu {
      z-index: 1000;
    }
  }
</style>