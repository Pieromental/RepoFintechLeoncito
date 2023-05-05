<template lang="pug">
  div.td-div
    input.w-full.font-label.vx-table-input(
      ref="tableInput"
      class="vxtable-input-arrow"
      :placeholder="placeholder"
      :class="[{'vxtable-input-bgdanger': error},{'bgtransparent': transparent}]"
      :value="data"
      @dblclick="focusInput"
      @keydown="arrowFunction"
      @keydown.enter="focusInput"
      @keydown.esc="escFocusInput"
      @mousedown="escFocusInput"
      @input="$emit('update:data',$event.target.value)"
      @focus="addClassFocus"
      @blur="removeClassFocus"
      :readonly="readonly"
      :style="{cursor: typeCursor}"
      :tabindex="tabIndex"
      v-on="$listeners"
      :disabled="disabled"
    )
    vs-button.td-input-button(
      v-if="btnSearch"
      tabindex="-1"
      size="small" 
      color="primary" 
      icon-pack="feather" 
      icon="icon-search" 
      :title="title" 
      @mousedown="actionButton"
    )
    input.btnfile(v-if="btnFile" ref="tableFile" type="file" :value="valueFile" @change="cargaArchivo")
</template>
<script>
export default {
  name: 'VxTableInput',
  props: {
    data: {},
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    unique: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    idx: {
      type: String,
      default: ''
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'search'
    },
    btnSearch: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: String,
      default: ''
    },
    btnFile: {
      type: Boolean,
      default: false
    },
    habilitado: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    readonly: true,
    typeCursor: 'default',
    statusRequired: false,
    statusUnique: false,
    valueFile: '',
  }),
  watch: {
    error(val) {
      if (val == true) this.$parent.showTooltip();
    }
  },
  methods: {
    escFocusInput() {
      //this.readonly = true
      //this.readonly = this.tooltip ? this.$parent.$parent.$parent.$parent.readonlytd : this.$parent.$parent.$parent.readonlytd
      this.valReadOnly(true);
      this.typeCursor = this.readonly ? 'default' : 'text';
      this.userSelect = this.readonly ? 'none' : 'text';
    },
    focusInput() {
      //this.readonly = false
      //this.readonly = this.tooltip ? this.$parent.$parent.$parent.$parent.readonlytd : this.$parent.$parent.$parent.readonlytd
      if(!this.habilitado) return
      this.valReadOnly(false);
      this.addclass('', this.$refs.tableInput);
      this.$refs.tableInput.focus();
      this.typeCursor = this.readonly ? 'default' : 'text';
    },
    actionButton() {
      if(!this.btnFile){
        this.$emit('tableButton', this.value);
        this.$refs.tableInput.focus();
        console.log(this.$refs.tableInput);
      }else{
        this.$refs.tableFile.click();
      }
    },
    addClassFocus($event) {
      this.readonly = this.tooltip ? this.$parent.$parent.$parent.$parent.readonlytd : this.$parent.$parent.$parent.readonlytd;
      this.addclass($event);
      this.typeCursor = this.readonly ? 'default' : 'text';
    },
    removeClassFocus($event) {
      //this.readonly = true
      this.readonly = this.tooltip ? this.$parent.$parent.$parent.$parent.readonlytd : this.$parent.$parent.$parent.readonlytd;

      this.removeClass($event);
      this.typeCursor = this.readonly ? 'default' : 'text';

      console.log(this.unique, this.required);

      if (this.required) this.validateRequired();
      if (this.unique) this.validateUnique();
    },
    addclass($event, ref = null) {
      if (ref != null) {
        if (!this.error) ref.classList.add('focus');
        if (this.btnSearch) ref.nextSibling.classList.add('focus');
        return;
      }
      if (!this.error) $event.srcElement.classList.add('focus');
      if (this.btnSearch) $event.srcElement.nextSibling.classList.add('focus');
    },
    removeClass($event) {
      if (!this.error) $event.srcElement.classList.remove('focus');
      if (this.btnSearch) $event.srcElement.nextSibling.classList.remove('focus');
    },
    actionClick() {
      console.log('stop parado');
    },
    focusOption() {
      this.focusInput();
    },
    valReadOnly(val) {
      if (this.tooltip) this.readonly = this.$parent.$parent.$parent.$parent.readonlytd = val;
      else this.readonly = this.$parent.$parent.$parent.readonlytd = val;
    },
    validateUnique() {
      console.log('unique');
      let datax = this.tooltip ? this.$parent.$parent.$parent.$parent : this.$parent.$parent.$parent,
        count = 0;

      if (datax.data.length > 0) {
        datax.data.forEach((element) => {
          if (this.data === element[this.value]) count++;
        });
        console.log('unique');
        if (count > 1) {
          //this.statusUnique = false
          datax.errorTable({ response: 'unique', value: this.value, content: this.idx, estado: true });
          this.$parent.showTooltip();
          this.$emit('update:error', true);
          this.$emit('update:transparent', false);
        } else {
          datax.errorTable({ response: 'unique', value: this.value, content: this.idx, estado: false });
          if (this.statusRequired) return;
          this.$emit('update:error', false);
          this.$emit('update:transparent', true);
        }
      }
    },
    validateRequired() {
      this.statusRequired = false;

      let datax = this.tooltip ? this.$parent.$parent.$parent.$parent : this.$parent.$parent.$parent,
        count = 0;

      console.log(datax);
      if (datax.data.length > 0) {
        datax.data.forEach((element) => {
          if (element[this.value] === '') {
            count++;
            console.log('#', element[this.value], this.value, count);
          }
        });

        if (count > 0) {
          this.statusRequired = true;
          datax.errorTable({ response: 'required', value: this.value, content: this.idx, estado: true });
          this.$parent.showTooltip();
          this.$emit('update:error', true);
          this.$emit('update:transparent', false);
        } else {
          this.statusRequired = false;
          datax.errorTable({ response: 'required', value: this.value, content: this.idx, estado: false });
          this.$emit('update:error', false);
          this.$emit('update:transparent', true);
        }
      }
    },
    cargaArchivo(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      let nameFile = e.target.files[0].name;
      let fileToBase64 = '';
      reader.onloadend = () =>{
        fileToBase64 = reader.result;
        this.$emit('fileArchive', nameFile, fileToBase64,this.idx);
        this.valueFile = '';
      };
      reader.readAsDataURL(file);
    },
    arrowFunction() {
      //$event.preventDefault()
      //console.log($event.target.tabIndex)
      //let inputs = document.getElementsByClassName("vxtable-input-arrow")
      //console.log("$",inputs)
      //console.log("-->",inputs.index($event.target))
    }
  },
  mounted() {
    /*
    this.tabIndex = this.tooltip ? this.$parent.$parent.$parent.$parent.tabIndex : this.$parent.$parent.$parent.tabIndex
    
    if (this.tooltip) 
      this.$parent.$parent.$parent.$parent.tabIndex++
    else 
      this.$parent.$parent.$parent.tabIndex++
    
    console.log("tabindex", this.tabIndex )
    */

    if (this.focus) {
      let datax = this.tooltip ? this.$parent.$parent.$parent.$parent : this.$parent.$parent.$parent;
      if (datax.data.length > 0) if (this.idx === datax.data[datax.data.length - 1].idx) this.focusOption();
    }
  }
};
</script>
<style>
  .btnfile {
    display: none;
  }
</style>
