<template lang="pug">
  .demo-alignment
    vs-popup.width_change_company(:title='title' :active='active' @close="close")
      div.vx-row.align_items_center.mb-3
        div.vx-col.justify_content_center.mb-1(class="w-full sm:w-1/3")
          feather-icon(:icon="icon" class="navbar-fuzzy-search ml-1" svgClasses='h-10 w-10')
        div.vx-col(class="w-full sm:w-2/3")
          template(v-if='!viewAmpliar')
            span {{$t(body)}}
          template(v-else)
            span {{$t(body)}}
            v-select.w-full.font-label.width_combo(name="compania" label="label"  :clearable="false" :placeholder="`${$t('Seleccione Compañía')}`" :options="optionCompany"  v-model="companySelect")
              template(slot="selected-option" slot-scope="option")
                span {{option.label}}
              template(slot="option" slot-scope="option")
                span {{option.codigo}} - {{option.label}} 
              template(slot="no-options")
                small {{$t('No se encontraron resultados')}}
      div.vx-row.justify_content_flex_end.mt-1
        div.vx-col.pr-1.pl-1
          vs-button(color="primary" type="filled" @click="clickConfirm" :disabled="disabledConfirm" ) {{$t('Aceptar')}}
        div.vx-col.pr-1.pl-1
          vs-button(color="warning" type="filled" @click="close") {{$t('Cancelar')}}

</template>

<script>
import _color from '@/assets/utils/color';
export default {
  name: 'VxChangeCompany',
  components: {
    vSelect: () => import('vue-select'),
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
      default: 'Title'
    },
    icon: {
      type: String,
      default: 'CheckIcon'
    },
    optionCompany:{
      type: Array,
      default: () => []
    },
    companyParameter: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      companySelect: '',
    }
  },
  computed: {
    viewAmpliar(){
      return JSON.stringify(this.companyParameter) == '{}' ? false : this.companyParameter.action == 'ampliar' ? true : false;
    },
    body(){
      return JSON.stringify(this.companyParameter) == '{}' ? false : this.companyParameter.action == 'ampliar' ? 'Para ampliar el registro es necesario seleccionar una compañia.' : `${this.$t(`Para ${this.companyParameter.action} el registro es necesario cambiar la compania logueada a`)} ${this.companyParameter.company.id} - ${this.companyParameter.company.descripcion}. ${this.$t('¿Desea continuar?')}`;
    },
    disabledConfirm(){
      return JSON.stringify(this.companyParameter) == '{}' ? true : this.companyParameter.action == 'ampliar' ? this.companySelect ? false : true : false;
    }
  },
  watch: {
    
  },
  methods: {
    close() {
      this.companySelect = '';
      this.$emit('cancel');
    },
    clickConfirm() {
      let company = this.companyParameter.action == 'ampliar' ? this.companySelect.id : this.companyParameter.company.id;
      if(this.companyParameter.company.id != this.companySelect.id){
        localStorage.setItem('compania-actual', company);
        this.$store.dispatch('cambiarCompaniaSeleccionada', company);
      }
      this.companySelect = '';
      this.$emit('confirm', this.companyParameter);
      
    },
    convertColor(color) {
      switch (color) {
        case 'primary':
          return 'rgb(26,115,232)';
        case 'success':
          return 'rgb(40,199,111)';
        case 'danger':
          return 'rgb(234,84,85)';
        case 'warning':
          return 'rgb(255,159,67)';
        case 'dark':
          return 'rgb(30,30,30)';
      }
    }
  },
  mounted() {
    try{
      this.$vs.loading({ type: "point" });
      const value = document.getElementsByClassName('width_change_company');
      const isColor = _color.isColor(this.color);
      const color = isColor ? this.convertColor(this.color) : _color.getColor(this.color);
      value[0].childNodes[1].childNodes[0].style.borderBottomColor = color;
      value[0].childNodes[1].childNodes[0].childNodes[1].id = 'hover-close';
      document.getElementById('hover-close').addEventListener('mouseover', function() {
        this.style.color = color;
      });
      document.getElementById('hover-close').addEventListener('mouseout', function() {
        this.style.color = '';
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      this.$vs.loading.close();
    }
  },

};
</script>

<style>
.width_change_company .vs-popup {
  max-width: 400px;
}
.width_change_company .vs-popup--header {
  background-color: #ffff;
  border: 2px solid;
  border-top-color: #ffff;
  border-right-color: #ffff;
  border-left-color: #ffff;
  border-bottom-color: #ffff;
  border-radius: 5px 5px 0px 0px;
}

.justify_content_flex_end {
  justify-content: flex-end;
}

.width_combo {
  margin-top: 15px;
  margin-bottom: 15px;
}

.align_items_center {
  align-items: center;
}

.justify_content_center {
  justify-content: center;
  display: flex;
}
</style>
