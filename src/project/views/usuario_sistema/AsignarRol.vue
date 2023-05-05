<template lang="pug">
  div
    cabecera(
      :titulo='$t(`Asignar Rol(es)`)',
      @aceptar='validar',
      @cancelar='cancelar',
      :btnAceptar='true',
      :btnCancelar='true',
      :btnNuevo='false',
      :btnExportar='false',
      :btnListarTodo='false',
      :btnFiltrar='false'
    )
    vx-card.card-sticky
      form.w-full(@submit.prevent='validar', method='post', data-vv-scope='formularioTablaMaster', style='height: 100%') 
        
        vx-table.style-vxtable(
          idRef='listaDetalleTablaMaster',
          ref='containerTable',
          :title-container='$t(tituloDetalle)',
          :title='$t("")',
          v-model='seleccionados',
          :data='listado',
          @toggleAgregar='agregarDetalle',
          @closeContent="limpiarDetalle" 
          @swapToggle="swapDetalle"
          @removeRows='eliminarLote',
          :btnOption='false',
          header-sticky,
          multiple,
          header-table,
          search,
          pagination,
          rowsPage,
          :arrayRows='[25, 50, 100]',
          :no-data-text='`${$t("No se encontraron registros")}`'
        )
          template(slot='container')
            formulario-asignar-rol(ref='refDetalleFormulario', :dataDetalle='dataDetalle', :index="index" @cancelarDetalle='cancelarDetalle', :listado="listado" :accion="tituloContainer == 'editar' ? true : false" :actualizarRol="actualizarRol" @actualizarRolAsignado="actualizarRolAsignado")

          template(slot='thead')
            vx-th.uppercase(center, min-width='150') {{ $t("Acciones") }}
            vx-th.uppercase(sort-key='codigo', min-width='220') {{ $t("Código") }}
            vx-th.uppercase(sort-key='descripcion', min-width='420') {{ $t("Descripción") }}
            vx-th.uppercase(sort-key='estado', min-width='150') {{ $t("Estado") }}

          template(slot-scope='{ data }')
            tbody.table-text-sm(disabled="true")
              vx-tr(:data='tr', :key='indextr', v-for='(tr, indextr) in data' :class="activar ? 'bloquear' : ''")
                vx-td.text-center
                  .d-f.vs-justify-center
                    feather-icon.style-icon.p-0(@click.stop='editarDetalle(tr,indextr)', :title='$t("Modificar")', icon='Edit3Icon')
                    feather-icon.style-icon(v-if="tr.id_detalle == null" @click.stop='eliminarDetalle(indextr)', :title='$t("Eliminar")', icon='Trash2Icon')
                vx-td.text-left(:data='tr.codigo') {{ tr.codigo }}
                vx-td.text-left(:data='tr.descripcion') {{ tr.descripcion }}
                vx-td.text-center(:data='tr.estado')
                  span.justify-center(v-if='tr.estado') {{ $t("ACTIVO") }}
                  span.justify-center(v-else) {{ $t("INACTIVO") }}

    //-footer-data(v-if='editar || ver', :datosAlta='!editar', :propDatos='footer', :siderbar='true')
</template>

<script>
import Cabecera from '@/components/header/Header.vue';
import swal from 'sweetalert2';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import request from '@/mixins/mixinRequest';
import FooterData from '@/components/footer/FooterData.vue';
import FormularioAsignarRol from '@/project/views/usuario_sistema/FormularioAsignarRol.vue';


export default {
  mixins: [request],
  components: {
    Cabecera,
    VuePerfectScrollbar,
    FooterData,
    FormularioAsignarRol,
  },

  data() {
    return {
      usuario: '',
      tablaMaster: {
        id: '',
        codigo: '',
        descripcion: '',
        estado: true,
      },
      tempCodigo: '',
      mensajeCodigo: '',
      footer: {},

      listarDetalleMaster: [],

      seleccionados: [],
      dataDetalle: {},
      index : "",
      tituloContainer: '',

      titulo: '',
      nuevo: false,
      editar: false,


      activar : false,

      actualizarRol : false
    };
  },

  computed: {
    tituloDetalle() {
      return this.tituloContainer == 'nuevo' ? 'Agregar Rol' : this.tituloContainer == 'editar' ? 'Modificar Rol' : '';
    },
    listado() {
      return this.listarDetalleMaster;
    },
  },

  methods: {
    agregarDetalle() {
      this.dataDetalle = null;
      this.tituloContainer = 'nuevo';
      this.activar = true;
    },

    async editarDetalle(tr, index) {
      this.dataDetalle = tr;
      this.index = String(index);
      this.tituloContainer = 'editar';
      this.$refs.containerTable.toggleContent();
      this.activar = true;
    },

    eliminarDetalle(posicion) {
      let newArray = this.listarDetalleMaster.filter( (e, index) =>  index != posicion )
      this.listarDetalleMaster = newArray;
    },

    async eliminarLote() {
      let bd = 0;
      let memoria = 0;
      this.seleccionados.map( (e) => {
        if( e.id_detalle != null ){
          bd++;
        }else{
          memoria++;
        }
      });

      if( bd > 0 ){
        this.seleccionados.map( (e) => {
          this.listarDetalleMaster.map( (item,index) =>{
            // BOTA DATOS SELECCIONA QUE ESTAN EN MEMORIA //
            if( item.id_rol == e.id_rol && item.id_detalle == null && memoria > 0){
              this.eliminarDetalle(index)
            }
            // BOTA DATOS SELECCIONA QUE ESTAN EN MEMORIA //

            /* if( item.id_rol == e.id_rol && item.id_detalle != null ){
              item.estado = false;
              return item;
            } */
          })
        });
        this.seleccionados = [];  
        
      }else{
        //SOLO ELIMINAR MEMORIA MAS NO BASE DE DATOS//
        this.seleccionados.map( (e) => {
          this.listarDetalleMaster.map( (item,index) =>{
            if( item.id_rol == e.id_rol ){
              this.eliminarDetalle(index)
            }
          })
        })
        this.seleccionados = [];
      }
    },

    limpiarDetalle(){
      this.dataDetalle = null;
      this.activar = false;
    },

    cancelarDetalle() {
      this.contador = this.contador + 1;
      this.limpiarDetalle();
      this.$refs.containerTable.toggleContent();
    },
    
    swapDetalle(){
      if(this.$refs.containerTable.isContentCollapsed) this.limpiarDetalle();
    },

    async listar() {
      try {
        this.$vs.loading({ type: 'point' });        
        let { data } = await this.requestApi(`listar_roles_usuario_back_office?id=${this.$route.params.id}`);
        let response = data.data;
        if (response.estado) {
          this.listarDetalleMaster = response.data;
        } else {
          this.listarDetalleMaster = [];
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    actualizarRolAsignado(){
      this.actualizarRol = false;
    },

    async validar() {    
      let mensaje = this.$t('¿Desea guardar los cambios?');
      let status = await swal.fire({
        title: this.$t('Mensaje de Sistema'),
        text: mensaje,
        showCancelButton: true,
        confirmButtonText: this.$t('Aceptar'),
        cancelButtonText: this.$t('Cancelar'),
      });
      if (status.value){
        const detalle = this.listarDetalleMaster;
        const newArray = detalle.map( element => {
          return {
            id_detalle : element.id_detalle,
            id_rol : element.id_rol,
            estado : element.estado
          }
        });

        let post = {
          id : this.$route.params.id,
          detalle : newArray
        }
        //post.ip = await require('public-ip').v4();

        let { data } = await this.requestApi("asignar_rol_usuario_back_office", post, "POST");
        const response = data.data;
        if (response.estado) {
          this.responseRequest(response);
          await this.listar();
          this.actualizarRol = true;
        } else {
          this.sweetAlert(response);
        }
      }  
    },

    async cancelar() {
      this.$router.push(`/usuario-sistema`);
    },
  },

  async mounted() {
    try {
      this.$vs.loading({ type: 'point' });
      await this.listar();
    } catch (error) {
      throw new Error(error);
    } finally {
      this.$vs.loading.close();
    }
  },
};
</script>

<style>
.bloquear{
  pointer-events: none;
  opacity: 0.4;
}
</style>
