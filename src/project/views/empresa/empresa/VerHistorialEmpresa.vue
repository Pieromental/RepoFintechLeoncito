<template lang="pug">
  div.styleConfig
    cabecera(:titulo="$t('VER HISTORIAL')" :btnAceptar="false" :btnCancelar="false" :btnNuevo="false" :btnExportar="false" :btnListarTodo="false" :btnFiltrar="false")
    vx-card.card-sticky-floating
      div.vx-row          
        vx-card.card-style-collapse(collapse-action)    
          vx-table.style-vxtable(:title="$t('Historial de Estados')" v-model="seleccion" :data="listadoHistorial" :btnOption="false" :btnAgregar="false" :btnEliminar="false" :btnExportar="!verExportarEstados" @evntExportar="exportarEstados" header-sticky header-table search pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")
            template(slot="thead")
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="secuencia" min-width="50") {{$t('Secuencia')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="estado" min-width="100") {{$t('Estado')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="usuario_backoffice_relacionado" min-width="200") {{$t('Usuario Back Office Relacionado')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="razon_inactivacion" min-width="250") {{$t('Razón de Inactivación')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="fecha_cliente" min-width="100") {{$t('Fecha Cliente')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="ip_cliente" min-width="100") {{$t('IP Cliente')}} 
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="fecha_backoffice" min-width="100") {{$t('Fecha Back Office')}}  
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="ip_backoffice" min-width="100") {{$t('IP Back Office')}}
            template(slot-scope="{data}")
              tbody(class="table-text-sm")
                vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                  vx-td.text-right(:data="tr.secuencia") {{tr.secuencia}}
                  vx-td.text-left(:data="tr.estado") {{tr.estado}}
                  vx-td.text-left(:data="tr.usuario_backoffice_relacionado") {{tr.usuario_backoffice_relacionado}}
                  vx-td.text-left(:data="tr.razon_inactivacion") {{tr.razon_inactivacion}}
                  vx-td.text-center(:data="tr.fecha_cliente") {{tr.fecha_cliente}}
                  vx-td.text-center(:data="tr.ip_cliente") {{tr.ip_cliente}}
                  vx-td.text-center(:data="tr.fecha_backoffice") {{tr.fecha_backoffice}}
                  vx-td.text-center(:data="tr.ip_backoffice") {{tr.ip_backoffice}}
    vx-card.card-sticky-floating
      div.vx-row   
        vx-card.card-style-collapse(collapse-action)
          vx-table.style-vxtable(:title="$t('Historial de Riesgos')" v-model="seleccion" :data="listadoRiesgos" :btnOption="false" :btnAgregar="false" :btnEliminar="false" :btnExportar="!verExportarRiesgos" @evntExportar="exportarRiesgos" header-sticky header-table search pagination rowsPage :arrayRows='[25,50,100]' :no-data-text="`${$t('No se encontraron registros')}`")          
            template(slot="thead")
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="secuencia" min-width="50") {{$t('Secuencia')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="riesgo" min-width="100") {{$t('Riesgo')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="usuario_backoffice_relacionado" min-width="200") {{$t('Usuario Back Office Relacionado')}}
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="fecha_registro_backoffice" min-width="100") {{$t('Fecha Back Office')}}  
              vx-th.uppercase( colspan="1" rowspan="1" sort-key="ip_backoffice" min-width="100") {{$t('IP Back Office')}}
            template(slot-scope="{data}")
              tbody(class="table-text-sm")
                vx-tr(:data="tr" :key="indextr" v-for="(tr,indextr) in data")
                  vx-td.text-right(:data="tr.secuencia") {{tr.secuencia}}
                  vx-td.text-left(:data="tr.riesgo") {{tr.riesgo}}
                  vx-td.text-left(:data="tr.usuario_backoffice_relacionado") {{tr.usuario_backoffice_relacionado}}
                  vx-td.text-center(:data="tr.fecha_registro_backoffice") {{tr.fecha_registro_backoffice}}
                  vx-td.text-center(:data="tr.ip_backoffice") {{tr.ip_backoffice}}
</template>

<script>

import request from '@/mixins/mixinRequest';
import Cabecera from '@/components/header/Header.vue';

export default {

  name: 'VerHistorialEmpresa',
  mixins: [request],
  components: {
    Cabecera
  },

  data() {
    return this.getDefaultData()
  },
  
  computed: {
    listadoHistorial() {
      return this.listarHistorial;
    },
    listadoRiesgos() {
      return this.listarRiesgos;
    }
  },
  
  methods:{

    async exportarEstados(){
      try {
        this.$vs.loading({ type: 'point' });    
        await this.funcExportar(`exportar_historial_estados?id=${this.$route.params.id ? this.$route.params.id : null}&token=${localStorage.getItem('token')}`,false)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    async exportarRiesgos(){
      try {
        this.$vs.loading({ type: 'point' });           
        await this.funcExportar(`exportar_historial_riesgos?id=${this.$route.params.id ? this.$route.params.id : null}&token=${localStorage.getItem('token')}`,false)
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    getDefaultData(){
      return {
        isMounted: false,
        listarHistorial: [],
        listarRiesgos: [],
        verExportarEstados: false,
        verExportarRiesgos: false,
        seleccion:[],
      }
    }, 

    async cargarListarHistorial(id) {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        if(!id) return        
        let { data } = await this.requestApi(`ver_historial_estados_empresa?id=${id}`);        
        let response = data.data;   
        if (response.estado) {
          this.listarHistorial = response.data;
        } else {
          this.listarHistorial = [];
          this.verExportarEstados = true;
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    },


    async cargarListarRiesgos(id) {
      try { 
        if(this.isMounted) this.$vs.loading({ type: 'point' });
        if(!id) return        
        let { data } = await this.requestApi(`ver_historial_riesgos_empresa?id=${id}`);        
        let response = data.data;   
        if (response.estado) {
          this.listarRiesgos = response.data;
        } else {
          this.listarRiesgos = [];
          this.verExportarRiesgos = true;
        }
      } catch (error) {
        throw new Error(error);
      }finally{
        if(this.isMounted) this.$vs.loading.close();
      }
    }
  },

  async mounted() {
    try{
      this.$vs.loading({ type: "point" });
      await this.cargarListarHistorial(this.$route.params.id ? this.$route.params.id : null);
      await this.cargarListarRiesgos(this.$route.params.id ? this.$route.params.id : null);
      this.isMounted = true;
    } catch (error) {
      throw new Error(error);
    } finally{
      this.$vs.loading.close();
    }
  }, 
  
};
</script>