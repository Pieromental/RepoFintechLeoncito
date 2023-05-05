<template lang="pug">
  vx-sidebar-form( id='formTeaRiesgo' v-model='value' parentx='#parentx-tea')
    template(slot="header")
      span {{ $t(title) }}
    template(slot="body")
      div.vx-col.mb-6
        span.bold.font-label {{$t('Riesgo')}}
        span.font-label(v-if="nuevo")
          span.bold.font-label(style='color:#F74F51') *
        combo-box(ref ="riesgo" name="riesgo" :filterBy="filterByIdLabel" :clearable="true" :placeholder="`${$t('Seleccione un Riesgo')}`" :options="optionsRiesgo" v-model="riesgoSeleccionado" :disabled="editar||ver")
          template(slot="selected-option" slot-scope="option")
            span {{option.label}}
          template(slot="option" slot-scope="option")
            span {{option.codigo}} - {{option.label}} 
          template(slot="no-options")
            small {{ $t("No se encontraron registros.") }}
        span.text-danger.font-error(v-if="mensajeExisteRiesgo") {{ $t(mensajeExisteRiesgo) }}
      div.vx-col.mb-6
        span.bold.font-label {{$t('Moneda')}}
        span.font-label(v-if="nuevo")
          span.bold.font-label(style='color:#F74F51') *
        combo-box(ref ="moneda" name="moneda" :filterBy="filterByIdLabel" :clearable="true" :placeholder="`${$t('Seleccione una Moneda')}`" :options="optionsMoneda" v-model="monedaSeleccionada" :disabled="editar||ver")
          template(slot="selected-option" slot-scope="option")
            span {{option.label}}
          template(slot="option" slot-scope="option")
            span {{option.label}} ({{option.codigo}}) 
          template(slot="no-options")
            small {{ $t("No se encontraron registros.") }}
        span.text-danger.font-error(v-if="mensajeExisteMoneda") {{ $t(mensajeExisteMoneda) }}
      div.vx-col.mb-3
        span.bold.font-label {{$t('Tasa(TEA)')}}
        span.font-label(v-if="nuevo") (5)
            span.bold.font-label(style='color:#F74F51') *
        texts-box.pt-1.w-full(size="small" ref="tasa" name="tasa" v-model='riesgo.tasa' data-vv-validate-on="blur|input" v-mask="{mask:funcionMascara(6,'D'),tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra($event,3,2)" @blur="completaDecimal(2,riesgo.tasa)" @keyup.enter.prevent="completaDecimal(2,riesgo.tasa)" @keyup="tamanioPorcentaje" autocomplete="off" :disabled="editar||ver")
        span.text-danger.font-error(v-if="mensajeExisteTea") {{ $t(mensajeExisteTea) }}
      div.vx-col.mb-3
          span.bold.font-label.mr-3 {{$t('Uso de la Tasa por Usuario:')}}
          radio-button.ml-3.mr-3( v-model="riesgo.uso_usuario" vs-name="usousuarioflag" :vs-value="true" :disabled="editar||ver" ) {{$t('Usar solo para Empresa')}}
          radio-button.ml-3.mr-3( v-model="riesgo.uso_usuario" vs-name="usousuarioflag" :vs-value="false" :disabled="editar||ver" ) {{$t('Usar solo para Inversionista')}}
      div.vx-col.mb-3(v-if="!riesgo.uso_usuario")
          span.bold.font-label.mr-3 {{$t('Uso de la Tasa por Modelo:')}}
          radio-button.ml-3.mr-3( v-model="riesgo.uso" vs-name="usoflag" :vs-value="true" :disabled="editar||ver" ) {{$t('Usar en Modelo Subasta')}}
          radio-button.ml-3.mr-3( v-model="riesgo.uso" vs-name="usoflag" :vs-value="false" :disabled="editar||ver" ) {{$t('Usar en Modelo Velocidad')}}
      div.vx-col.mb-5
        span.bold.font-label {{$t('Vigente')}}
        check-box(v-model="riesgo.vigente_flag" :disabled="ver" size="small")     
        //- check-box(v-model="riesgo.vigente_flag" @change="mostrarValidacion" :disabled="ver" size="small")     
    template(slot="footer")
      Binnacle( v-if="!nuevo" :items='footer')
      Buttons( @confirm='validate' :btnConfirm='!ver' @cancel='cancel(false)' )
      
</template>

<script>
import helperFunctions from '@/functions';
import request from '@/mixins/mixinRequest';
import swal from 'sweetalert2';
import VxSidebarForm from '@/components/vx-sidebar-form/VxSidebarForm.vue';
import Binnacle from '@/components/vx-sidebar-form/VxSidebarFormBinnacle.vue';
import Buttons from '@/components/vx-sidebar-form/VxSidebarFormButtons.vue';
import TextsBox from '@/components/fields/input/TextsBox.vue';
import ComboBox from '@/components/fields/combo-box/ComboBox.vue';
import CheckBox from '@/components/fields/check-box/CheckBox.vue';
import VxButton from '@/components/buttons/Button.vue';
import RadioButton from '@/components/fields/radio-button/RadioButton.vue';
export default {
  name: 'FormularioTeaRiesgo',
  mixins: [request],

  components: {
    VxSidebarForm,
    TextsBox,
    ComboBox,
    CheckBox,
    RadioButton,
    VxButton,
    Binnacle,
    Buttons
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    parametro: {
      type: Object,
      default: {}
    }
  },

  data() {
    return this.getDefaultData();
  },

  watch: {
    value(val) {
      if (val) {
        this.inicio();
      }
    },
    // 'riesgo.uso'() {
    //   if (this.nuevo) {
    //     this.vigente();
    //   }
    // },
    // 'riesgo.uso_usuario'() {
    //   if (this.nuevo) {
    //     this.vigente();
    //   }
    // },
    mensajeExisteRiesgo() {
      setTimeout(() => {
        this.mensajeExisteRiesgo = '';
      }, 2000);
    },
    mensajeExisteMoneda() {
      setTimeout(() => {
        this.mensajeExisteMoneda = '';
      }, 2000);
    },
    mensajeExisteTea() {
      setTimeout(() => {
        this.mensajeExisteTea = '';
      }, 2000);
    }
  },

  methods: {
    getDefaultData() {
      return {
        title: '',
        riesgo: {
          id: '',
          id_moneda: '',
          codigo_riesgo: '',
          tasa: '',
          uso: true,
          vigente_flag: false,
          uso_modelo_subasta: false,
          uso_modelo_velocidad: false,
          uso_usuario: true,
          usar_empresa: false,
          usar_inversionista: false,
          ip: ''
        },
        riesgoSeleccionado: '',
        monedaSeleccionada: '',
        nuevo: false,
        editar: false,
        ver: false,
        vigenteInicio: false,
        mensajeExisteTea: '',
        mensajeExisteRiesgo: '',
        mensajeExisteMoneda: '',
        validacionDatos: '',
        optionsRiesgo: [],
        optionsMoneda: [],
        isMounted: false,
        footer: []
      };
    },

    validarInterfaz() {
      switch (this.parametro.accion) {
        case 'nuevo':
          this.nuevo = true;
          this.title = 'NUEVO TEA/RIESGO';
          break;
        case 'editar':
          this.editar = true;
          this.title = 'MODIFICAR TEA/RIESGO';
          break;
        case 'ver':
          this.ver = true;
          this.title = 'TEA/RIESGO [MODO VISTA]';
          break;
      }
    },
    async inicio() {
      try {
        this.$vs.loading({ type: 'point' });
        if (this.parametro.hasOwnProperty('accion')) this.validarInterfaz();
        await this.cargarRiesgo();
        await this.cargarMoneda();
        if (this.ver || this.editar) await this.cargarDatos(this.parametro.id);
        if (this.nuevo) this.activarFoco();
        this.isMounted = true;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },

    funcionMascara(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },
    tamanioPorcentaje() {
      if (parseFloat(this.riesgo.tasa) > 100) {
        this.riesgo.tasa = '';
        this.mensajeExisteTea = this.$t('El valor no debe ser mayor a 100.00');
      }
    },
    completaDecimal(lmax, val) {
      if (val.length) {
        let temp = val.indexOf('.');
        let num = 0;
        if (temp == -1) {
          if (lmax == 2) this.riesgo.tasa = this.riesgo.tasa + '.00';
        } else {
          num = val.length - (temp + 1);
          let add = '';
          while (num != lmax) {
            add = add + '0';
            num++;
          }
          if (lmax == 2) this.riesgo.tasa = this.riesgo.tasa + add;
        }
      }
    },
    formatoLetra(val, lEnt, lDec) {
      if (val.length) {
        this.riesgo.tasa = val.length == 1 && val == '.' ? '0.' : val;
        let split = val.split('.');
        switch (split.length) {
          case 1:
            if (split[0].length > lEnt) {
              this.riesgo.tasa = this.riesgo.tasa.substring(0, lEnt);
            }
            break;
          case 2:
            if (split[1].length > lDec) {
              split[1] = split[1].substring(0, lDec);
              this.riesgo.tasa = split.join('.');
            }
            break;
          default:
            split.pop();
            this.riesgo.tasa = split.join('.');
            break;
        }
      }
    },
    async cargarRiesgo() {
      try {
        let { data } = await this.requestApi(`cargar_riesgo_tea_activo`);
        let response = data.data || [];
        if (response.estado) {
          this.optionsRiesgo = response.data.map((e) => {
            return {
              id: e.id,
              label: e.descripcion,
              codigo: e.codigo
            };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async cargarMoneda() {
      try {
        let { data } = await this.requestApi(`cargar_moneda_cuenta_bancaria`);
        let response = data.data || [];
        if (response.estado) {
          this.optionsMoneda = response.data.map((e) => {
            return {
              id: e.id,
              label: e.descripcion,
              codigo: e.codigo
            };
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async cargarDatos(id) {
      if (id != null) {
        try {
          let { data } = await this.requestApi(`ver_riesgo_tea?id=${id}`);
          let response = data.data;
          if (response.estado) {
            this.riesgo.id = response.data[0].id;
            this.riesgo.vigente_flag = response.data[0].vigente_flag;
            this.riesgo.tasa = response.data[0].r_tasa;
            if (response.data[0].usar_para_inversionista) {
              this.riesgo.uso_usuario = false;
              if (response.data[0].usaren_subasta) {
                this.riesgo.uso = true;
              } else {
                this.riesgo.uso = false;
              }
            } else {
              this.riesgo.uso_usuario = true;
            }

            this.footer = [
              { icon: 'ClockIcon', key: 'Fecha de Registro', value: response.data[0].fecha_registro },
              { icon: 'ColumnsIcon', key: 'IP de Registro', value: response.data[0].ip_registro },
              { icon: 'UserIcon', key: 'Usuario de Registro', value: response.data[0].usuariobo_registro }
            ];
            if (this.ver) {
              this.footer.push(
                { icon: 'ClockIcon', key: 'Última Fecha de Modificación', value: response.data[0].ultima_fecha_modificacion },
                { icon: 'ColumnsIcon', key: 'Última IP de Modificación', value: response.data[0].ultimo_ip },
                { icon: 'UserIcon', key: 'Último Usuario de Modificación', value: response.data[0].ultimo_usuario_modificacion }
              );
            }
            this.riesgoSeleccionado = this.optionsRiesgo.find((element) => {
              return element.id == response.data[0].id_master_detalle_riesgo;
            });
            this.monedaSeleccionada = this.optionsMoneda.find((element) => {
              return element.id == response.data[0].moneda_id;
            });
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    async mostrarValidacion() {
      try {
        if (this.riesgoSeleccionado != '' && this.monedaSeleccionada != '') {
          if (this.editar) {
            if (this.isMounted) this.$vs.loading({ type: 'point' });
            let { data } = await this.requestApi(`validar_vigente_editar_riesgo_tea?id=${this.riesgo.id}&vigente_flag=${this.riesgo.vigente_flag}`);
            let response = data.data;
            if (response.estado) {
              if (response.data[0].marcar_flag) {
                this.riesgo.vigente_flag = response.data[0].marcar_flag;
              }
              this.validacionDatos = response.data[0];
            }
          }
          let flagMensaje = this.validacionDatos.editable_flag;
          let mensaje = this.$t(this.validacionDatos.mensaje);
          if (flagMensaje) {
            //MARCAR ACRPTAR(sI) O CANCELAR(NO)
            // SI ES DE TIPO DE VELOCIDAD ENTONCES
            let status = await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: mensaje,
              showCancelButton: true,
              confirmButtonText: this.$t('Aceptar'),
              cancelButtonText: this.$t('Cancelar')
            });

            this.riesgo.vigente_flag = status.value ? true : false;
          } else {
            //MARCAR ACRPTAR(USUARIO ACEPTABA LO QUE BASE LE INDICABA)
            await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: mensaje,
              confirmButtonText: this.$t('Aceptar')
            });
            this.riesgo.vigente_flag = this.validacionDatos.marcar_flag;
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if (this.isMounted) this.$vs.loading.close();
      }
    },
    async validate() {
      try {
        let valid = this.showErrors();
        if (valid) {
          let ruta = this.nuevo
            ? `validar_vigente_riesgo_tea?id=${this.riesgoSeleccionado.id}&uso=${this.riesgo.uso}&uso_tasa_usuario=${this.riesgo.uso_usuario}&id_moneda=${this.monedaSeleccionada.id}&vigente_flag=${this.riesgo.vigente_flag}`
            : `validar_vigente_editar_riesgo_tea?id=${this.riesgo.id}&vigente_flag=${this.riesgo.vigente_flag}`;
          let { data } = await this.requestApi(ruta);
          let response = data.data.data[0];
          console.log(response);
          if (response.estado_flag) {
            if (response.mostrar_pregunta_flag) {
              let status = await swal.fire({
                title: this.$t('Mensaje de Sistema'),
                text: response.mensaje,
                showCancelButton: true,
                confirmButtonText: this.$t('Aceptar'),
                cancelButtonText: this.$t('Cancelar')
              });
              if (status.value) {
                let response = this.nuevo ? await this.registrar() : await this.actualizar();
                if (response.data.estado) {
                  this.responseRequest(response.data);
                  this.cancel();
                } else {
                  this.sweetAlert(response.data);
                }
              }
            }else{
                let respuesta = this.nuevo ? await this.registrar() : await this.actualizar();
                if (respuesta.data.estado) {
                  this.responseRequest(respuesta.data);
                  this.cancel();
                } else {
                  this.sweetAlert(respuesta.data);
                }
            }
          }else{
              await swal.fire({
              title: this.$t('Mensaje de Sistema'),
              text: response.mensaje,
              confirmButtonText: this.$t('Aceptar')
              });
          }

          // let mensaje = this.nuevo ? this.$t('¿Desea guardar el registro?') : this.$t('¿Desea actualizar el registro?');
          // let status = await swal.fire({
          //   title: this.$t('Mensaje de Sistema'),
          //   text: mensaje,
          //   showCancelButton: true,
          //   confirmButtonText: this.$t('Aceptar'),
          //   cancelButtonText: this.$t('Cancelar')
          // });
          // if (status.value) {
          //   let response = this.nuevo ? await this.registrar() : await this.actualizar();
          //   if (response.data.estado) {
          //     this.responseRequest(response.data);
          //     this.cancel();
          //   } else {
          //     this.sweetAlert(response.data);
          //   }
          // }
        
        } else {
          let data = {
            estado: false,
            mensaje: this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos.'),
            tipoMEnsaje: 'TMSGADV'
          };
          this.responseRequest(data);
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if (this.isMounted) this.$vs.loading.close();
      }
    },
    async vigente() {
      try {
        if (!this.ver && !this.editar) {
          if (this.isMounted) this.$vs.loading({ type: 'point' });
          if (this.riesgoSeleccionado != '' && this.monedaSeleccionada != '') {
            let { data } = await this.requestApi(
              `validar_vigente_riesgo_tea?id=${this.riesgoSeleccionado.id}&uso=${this.riesgo.uso}&uso_tasa_usuario=${this.riesgo.uso_usuario}&id_moneda=${this.monedaSeleccionada.id}`
            );
            let response = data.data;
            if (response.estado) {
              this.riesgo.vigente_flag = response.data[0].marcar_flag;
              this.validacionDatos = response.data[0];
            }
          }
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        if (this.isMounted) this.$vs.loading.close();
      }
    },
    async registrar() {
      try {
        this.$vs.loading({ type: 'point' });
        this.riesgo.codigo_riesgo = this.riesgoSeleccionado.id;
        this.riesgo.id_moneda = this.monedaSeleccionada.id;
        if (!this.riesgo.uso_usuario) {
          this.riesgo.usar_inversionista = true;
          if (this.riesgo.uso) {
            this.riesgo.uso_modelo_subasta = true;
          } else {
            this.riesgo.uso_modelo_velocidad = true;
          }
        } else {
          this.riesgo.usar_empresa = true;
        }
        let post = this.riesgo;
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('insertar_riesgo_tea', post, 'POST');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    async actualizar() {
      try {
        this.$vs.loading({ type: 'point' });
        this.riesgo.codigo_riesgo = this.riesgoSeleccionado.id;
        let put = {
          id: this.riesgo.id,
          vigente_flag: this.riesgo.vigente_flag,
          codigo_riesgo: this.riesgo.codigo_riesgo
        };
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('actualizar_riesgo_tea', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    showErrors() {
      if (this.riesgoSeleccionado == '') {
        this.mensajeExisteRiesgo = this.$t('Debe seleccionar un tipo de riesgo');
        return false;
      }
      if (this.monedaSeleccionada == '') {
        this.mensajeExisteMoneda = this.$t('Debe seleccionar un tipo de moneda');
        return false;
      }
      if (!this.riesgo.tasa) {
        let input = document.getElementById('tasa');
        setTimeout(() => {
          input.focus();
        }, 500);
        this.mensajeExisteTea = this.$t('La tasa es requerida.');
        return false;
      }
      return true;
    },
    cancel() {
      this.$emit('cancel');
      this.errors.clear('formTeaRiesgo');
      this.limpiar();
    },
    limpiar() {
      Object.assign(this.$data, this.getDefaultData());
    },
    activarFoco() {
      if (this.nuevo) {
        let input = document.getElementById('tasa');
        setTimeout(() => {
          input.focus();
        }, 500);
      }
    }
  }
};
</script>
