<template>
  <div>

    <div>
      <!-- Input -->
      <vs-input
        ref="input"
        :placeholder="placeholder"
        v-model="searchQuery"
        @keyup.esc="escPressed"
        @keyup.up="increaseIndex(false)"
        @keyup.down="increaseIndex"
        @keyup.enter="suggestionSelected"
        @focus="updateInputFocus"
        @blur="updateInputFocus(false)"
        v-mask="{ mask: funcionMascara(maskCant,'D'), tokens:{ 'D': {pattern: new RegExp(maskPattern) }}}" 
      />
    </div>
    <div v-if="showList" :class="{ 'mostrar': showList, 'ocultar': !showList }">
      <ul
        class="auto-suggest-suggestions-list z-50 rounded-lg mt-1 shadow-lg overflow-x-hidden cursor"
        @mouseenter="insideSuggestions = true"
        @mouseleave="insideSuggestions = false"
        @focus="updateInputFocus(true)"
        @blur="updateInputFocus(false)"
      >
        <li
          v-for="(suggestion, index) in filteredData"
          :key="index"
          class="auto-suggest__suggestion-group__suggestion py-2 px-4 "
          :class="{ 'vx-auto-suggest__current-selected': currentSelected == `${index}` }"
          @mouseenter="currentSelected = `${index}`"
          @click="suggestionSelected"
        >
          <slot name="option" :suggestion="suggestion"></slot>
        </li>

        <li class="auto-suggest__suggestion-group__suggestion py-2 px-4 no-results" v-if="!filteredData.length && searchQuery">
          <slot name="no-options">
            <p>{{ $t('No hay resultados') }}</p>
          </slot>
        </li>
      </ul>
    </div>
    
  </div>
  
</template>

<script>

import funciones from '@/functions';

export default {

  props: {
    placeholder: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      required: true
    },
    initalData: {
      type: Array,
      default: () => [],
    },
    typeList: {
      type: Boolean,
      default: false,
    },
    maskCant: {
      type: Number,
      default: 50,
    },
    maskPattern: {
      default: /[\\W\\w\\s]/,
    },
  },

  data() {
    return {
      showList: false,
      searchQuery: '',
      filteredData: [],
      currentSelected: -1,
      inputFocused: false,
      insideSuggestions: false,
      seleccionado: null,
    };
  },

  watch: {
    searchQuery(val) {
      this.$emit('input', val);
      if(this.seleccionado==val){
        this.showList = false;
        return;
      }else{
        this.seleccionado = null;
        this.showList = true;
      }
      if (val == '') {
        this.inputInit();
        this.showList = false;
      } else {
        let filtro = [];
        if(this.typeList){
          if(this.data.length) filtro = this.concat_list(val);
        }else{
          if(this.data.length) filtro = this.filter_list(val);
        }
        this.filteredData = filtro;
      }
    },
    filteredData(val) {
      this.currentSelected = '0';
    }
  },

  methods: {

    slugify(str) {
      const map = {
        a: 'á|à|ã|â|À|Á|Ã|Â',
        e: 'é|è|ê|É|È|Ê',
        i: 'í|ì|î|Í|Ì|Î',
        o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        c: 'ç|Ç',
        n: 'ñ|Ñ'
      };
      str = str.toLowerCase();
      for (let pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
      }
      return str;
    },

    escPressed() {
      this.showList = false;
    },

    cajaBlur(){
      this.$emit('selected', this.searchQuery );
      this.$emit('blur'); 
    },

    concat_list(value){
      let tmpFilter = [];
      let tmpConcat = [];
      let encuentra = false;
      let tmpExtr = this.data.map( (item) => {
        let num = this.slugify(value).indexOf(this.slugify(item.charAt(0)));
        if(num===-1) {
          return '';
        }else{
          encuentra = true;
          return value.substr(Number(num)-Number(value.length));
        }
      });
      let filtro = [];
      tmpExtr.forEach( (item) =>{
        if(item){
          filtro = filtro.concat(this.filter_list(item));
        }
      });
      let result = filtro.filter((item,index)=>{
        return filtro.indexOf(item) === index;
      })
      if(encuentra){
        tmpConcat =  result.map( (element) => {
          let tmp = value.indexOf(element.charAt(0));
          return value.substr(0,Number(tmp))+element;;
        });
      }else{
        tmpConcat =  this.data.map( (element) => {
          return value+element;
        });
      }
      return tmpConcat;
    },

    filter_list(value) {
      let exactEle = this.data.filter((item) => {
        return this.slugify(item).startsWith(this.slugify(value));
      });
      let containEle = this.data.filter((item) => {
        return (
          !this.slugify(item).startsWith(this.slugify(value)) &&
          this.slugify(item).indexOf(this.slugify(value)) > -1
        );
      });
      return exactEle.concat(containEle);
    },

    inputInit() {
      if (this.initalData.length === 0) {
        this.filteredData = {};
      } else {
        this.filteredData = this.initalData;
      }
    },

    updateInputFocus(val = true) {
      if (val) {
        if (this.searchQuery == '') this.inputInit();
        setTimeout(() => {
          this.inputFocused = true;
        }, 100);
      } else {
        if (this.insideSuggestions) return;
        setTimeout(() => {
          this.inputFocused = false;
        }, 100);
        this.escPressed();
        this.cajaBlur();
      }
    },

    suggestionSelected() {
      if (this.currentSelected > -1) {
        const item_index = this.currentSelected;
        const selected_item = this.filteredData[item_index];
        let item = selected_item.substr(0,Number(this.maskCant));
        this.searchQuery = item;
        this.seleccionado = item;
        this.$emit('selected', item );
        this.escPressed();
        this.cajaBlur();
      }
    },

    increaseIndex(val = true) {
      if(!this.filteredData.length) return;
      const item_i = this.currentSelected;
      const grp_arr = this.filteredData;
      const active_grp_total_items = grp_arr.length;
      if (val) {
        if (active_grp_total_items - 1 > item_i) {
          this.currentSelected = (Number(item_i) + 1);
        } 
      } else {
        if (Number(item_i)) {
          this.currentSelected = (Number(item_i) - 1);
        } 
      }
    },

    funcionMascara(numero, token) {
      return funciones.longitudMaskNumero(numero, token);
    },
    
  },
  
};
</script>

<style lang="scss">
.vs-con-input-label{
  width: 100% !important;
}
.vs-input--input.normal{
  font-size: 11px !important;
  font-family: "Montserrat", Helvetica, Arial, sans-serif !important;
  padding: .4rem !important;
}
.auto-suggest-suggestions-list .auto-suggest__suggestion-group__suggestion {
  .span {
    color: red;
  }
}
.vx-auto-suggest__current-selected{
  background-color: CornFlowerBlue;
  color: #ffffff;
}
.auto-suggest__suggestion-group__suggestion{
  list-style: none;
  overflow: hidden;
  direction: ltr; 
  //direction: rtl; 
  text-overflow:  ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
}
.auto-suggest-suggestions-list {
  position: static;
  width: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 5px 5px;
}
.mostrar{
  display: block;
}
.ocultar{
  display: none;
}
.cursor:hover{
  cursor: pointer;
}
</style>
