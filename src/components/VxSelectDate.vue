<template lang="pug">
  div.vx-col.vs-align-items
    v-select.w-full.font-label.mr-1(label="label" :clearable="false" placeholder="" :options="optionDay"  v-model="daySelect")
      template(slot="selected-option" slot-scope="option")
        span {{option.label}}
      template(slot="option" slot-scope="option")
        span {{option.label}}
      template(slot="no-options")
        small {{ "No se encontraron registros." }}
    v-select.w-full.font-label.mr-1(label="label" :clearable="false" placeholder="" :options="optionMonth"  v-model="monthSelect")
      template(slot="selected-option" slot-scope="option")
        span {{option.label}}
      template(slot="option" slot-scope="option")
        span {{option.label}}
      template(slot="no-options")
        small {{ "No se encontraron registros." }}
    v-select.w-full.font-label(label="label" :clearable="false" placeholder="" :options="optionYear"  v-model="yearSelect")
      template(slot="selected-option" slot-scope="option")
        span {{option.label}}
      template(slot="option" slot-scope="option")
        span {{option.label}}
      template(slot="no-options")
        small {{ "No se encontraron registros." }}
</template>

<script>
import vSelect from 'vue-select';

export default {
  name: 'VxSelectDate',
  components: {
    vSelect,
  },
  data() {
    return {
      daySelect: (new Date()).getDate(),
      optionDay: [],
      monthSelect: '',
      yearSelect: (new Date()).getFullYear()
    };
  },
  computed: {
    optionYear(){
      let anioActual = (new Date()).getFullYear() + 1;
      let array = [];
      for (let index = 0; index < 115; index++) {
        anioActual = anioActual - 1;
        array.push(anioActual);
      }
      return array;
    },
    optionMonth(){
      let month = [
        { id: 1, label: 'Enero'},
        { id: 2, label: 'Febrero'},
        { id: 3, label: 'Marzo'},
        { id: 4, label: 'Abril'},
        { id: 5, label: 'Mayo'},
        { id: 6, label: 'Junio'},
        { id: 7,label: 'Julio'},
        { id: 8, label: 'Agosto'},
        { id: 9, label: 'Septiembre'},
        { id: 10, label: 'Octubre'},
        { id: 11, label: 'Noviembre'},
        { id: 12, label: 'Diciembre'}
      ];
      this.monthSelect = month.find(element => { return element.id == (new Date()).getMonth() + 1});
      return month;
    },
    
  },
  watch: {
    monthSelect(val){
      if(val){
        this.changeDay();
        this.$emit('currentDate', `${this.daySelect}/${this.monthSelect.id}/${this.yearSelect}`)
      }
    },
    yearSelect(val){
      if(val){
        this.changeDay();
        this.$emit('currentDate', `${this.daySelect}/${this.monthSelect.id}/${this.yearSelect}`)
      }
    },
    daySelect(val){
      if(val){
        this.$emit('currentDate', `${this.daySelect}/${this.monthSelect.id}/${this.yearSelect}`)
      }
    }
  },
  methods: {
    changeDay(){
      this.optionDay = [];
      let diaMaximo = '';
      switch (parseInt(this.monthSelect.id)) {    
        case 1: diaMaximo = 31;break;        
        case 2: if (Number(this.yearSelect) % 4 == 0) diaMaximo = 29; else diaMaximo = 28;break;        
        case 3:diaMaximo = 31;break;        
        case 4:diaMaximo = 30;break;        
        case 5:diaMaximo = 31;break;        
        case 6:diaMaximo = 30;break;        
        case 7:diaMaximo = 31;break;        
        case 8:diaMaximo = 31;break;        
        case 9:diaMaximo = 30;break;        
        case 10:diaMaximo = 31;break;       
        case 11:diaMaximo = 30;break;      
        case 12:diaMaximo = 31;break;       
      }
      let dia = 0;
      for (let index = 0; index < 45; index++) {
        dia = dia + 1;
        if(diaMaximo >= dia){
          this.optionDay.push(dia);
        }
      }
    }
  }
};
</script>
