<template lang="pug">
  vx-sidebar-form( id='formTasa' v-model='value' parentx='#parentx-tasa')
    template(slot="header")
      span {{ title }}
    template(slot="body")
      div.vx-col.mb-6
        span.bold.font-label {{$t('Tasa')}}
        span.bold.font-label(style='color:#F74F51' v-if="nuevo") *
        combo-box(ref ="tasa" name="tasa" :clearable="true" :filterBy="filterByIdLabel" :placeholder="`${$t('Seleccione una Tasa')}`" :options="optionsTasa" v-model="tasaSeleccionada" :disabled="editar||ver" @change="vigente()")
          template(slot="selected-option" slot-scope="option")
            span {{option.label}}
          template(slot="option" slot-scope="option")
            span {{option.codigo}} - {{option.label}} 
          template(slot="no-options")
            small {{ $t("No se encontraron registros.") }}
        span.text-danger.font-error(v-if="mensajeExisteTasa") {{ $t(mensajeExisteTasa) }}
      div.vx-col.mb-3
        span.bold.font-label {{$t('Valor')}}
        span.font-label(v-if="nuevo") (11)
        texts-box.pt-1.w-full(size="small"  ref="valor" name="valor" v-model='tasa.valor' data-vv-validate-on="blur|input" v-mask="{mask:funcionMascara(6,'D'),tokens:{'D': {pattern: /[0-9.]/}}}" @input="formatoLetra($event,3,2)" @blur="completaDecimal(2,tasa.valor)" @keyup.enter.prevent="completaDecimal(2,tasa.valor)" @keyup="tamanioPorcentaje" autocomplete="off" :disabled="editar||ver")
        span.text-danger.font-error(v-if="mensajeExisteValor") {{ $t(mensajeExisteValor) }}
      div.vx-col.mb-5
        span.bold.font-label {{$t('Vigente')}}
        check-box(v-model="tasa.vigente_flag" @change="mostrarValidacion" :disabled="ver||flagEditar" size="small")     
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
export default {
  name: 'FormularioTasa',
  mixins: [request],

  components: {
    VxSidebarForm,
    TextsBox,
    ComboBox,
    CheckBox,
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
    mensajeExisteTasa() {
      setTimeout(() => {
        this.mensajeExisteTasa = '';
      }, 2000);
    },
    mensajeExisteValor() {
      setTimeout(() => {
        this.mensajeExisteValor = '';
      }, 2000);
    }
  },

  methods: {
    getDefaultData() {
      return {
        title: '',
        tasa: {
          id: '',
          codigo_tasa: '',
          valor: '',
          vigente_flag: false,
          ip: ''
        },
        tasaSeleccionada: '',
        nuevo: false,
        editar: false,
        ver: false,
        flagEditar: false,
        mensajeExisteTasa: '',
        mensajeExisteValor: '',
        optionsTasa: [],
        isMounted: false,
        footer: {}
      };
    },

    validarInterfaz() {
      switch (this.parametro.accion) {
        case 'nuevo':
          this.nuevo = true;
          this.title = 'NUEVO TASA';
          break;
        case 'editar':
          this.editar = true;
          this.title = 'MODIFICAR TASA';
          break;
        case 'ver':
          this.ver = true;
          this.title = 'TASA [MODO VISTA]';
          break;
      }
    },
    async inicio() {
      try {
        this.$vs.loading({ type: 'point' });
        if (this.parametro.hasOwnProperty('accion')) this.validarInterfaz();
        await this.cargarTasa();
        if (this.ver || this.editar) await this.cargarDatos(this.parametro.id);
        if (this.nuevo) this.activarFoco();
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    tamanioPorcentaje() {
      if (parseFloat(this.tasa.valor) > 100) {
        this.tasa.valor = '';
        this.mensajeExisteValor = this.$t('El valor no debe ser mayor a 100.00');
      }
    },
    completaDecimal(lmax, val) {
      if (val.length) {
        let temp = val.indexOf('.');
        let num = 0;
        if (temp == -1) {
          if (lmax == 2) this.tasa.valor = this.tasa.valor + '.00';
        } else {
          num = val.length - (temp + 1);
          let add = '';
          while (num != lmax) {
            add = add + '0';
            num++;
          }
          if (lmax == 2) this.tasa.valor = this.tasa.valor + add;
        }
      }
    },
    funcionMascara(numero, token) {
      return helperFunctions.longitudMaskNumero(numero, token);
    },
    formatoLetra(val, lEnt, lDec) {
      if (val.length) {
        this.tasa.valor = val.length == 1 && val == '.' ? '0.' : val;
        let split = val.split('.');
        switch (split.length) {
          case 1:
            if (split[0].length > lEnt) {
              this.tasa.valor = this.tasa.valor.substring(0, lEnt);
            }
            break;
          case 2:
            if (split[1].length > lDec) {
              split[1] = split[1].substring(0, lDec);
              this.tasa.valor = split.join('.');
            }
            break;
          default:
            split.pop();
            this.tasa.valor = split.join('.');
            break;
        }
      }
    },
    async cargarTasa() {
      try {
        let { data } = await this.requestApi(`cargar_tasa_activo`);
        let response = data.data || [];
        if (response.estado) {
          this.optionsTasa = response.data.map((e) => {
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
          let { data } = await this.requestApi(`ver_tasa?id=${id}`);
          let response = data.data;
          if (response.estado) {
            this.tasa.id = response.data[0].id;
            this.tasa.vigente_flag = response.data[0].vigente_flag;
            this.tasa.valor = response.data[0].t_valor;
            this.footer = [
              { icon: 'ClockIcon', key:this.$t('Fecha de Registro'), value: response.data[0].fecha_registro },
              { icon: 'ColumnsIcon', key: this.$t('IP de Registro'), value: response.data[0].ip_registro },
              { icon: 'UserIcon', key: this.$t('Usuario de Registro'), value: response.data[0].usuariobo_registro }
            ];
            if (this.ver) {
              this.footer.push(
                { icon: 'ClockIcon', key: this.$t('Última Fecha de Modificación'), value: response.data[0].fecha_modificacion },
                { icon: 'ColumnsIcon', key: this.$t('Última IP de Modificación'), value: response.data[0].ip_modificacion },
                { icon: 'UserIcon', key: this.$t('Último Usuario de Modificación'), value: response.data[0].usuario_modificacion }
              );
            }
            this.tasaSeleccionada = this.optionsTasa.find((element) => {
              return element.id == response.data[0].id_masterdetalle_tasa;
            });
            if (this.editar) {
              if (response.data[0].vigente_flag) {
                this.flagEditar = true;
              }
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    async mostrarValidacion() {
      if (this.tasaSeleccionada != '') {
        let flagMensaje = this.validacionDatos.editable_flag;
        let mensaje = this.$t(this.validacionDatos.mensaje);
        if (flagMensaje) {
          let status = await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: mensaje,
            showCancelButton: true,
            confirmButtonText: this.$t('Aceptar'),
            cancelButtonText: this.$t('Cancelar')
          });
          this.tasa.vigente_flag = status.value ? true : false;
        } else {
          await swal.fire({
            title: this.$t('Mensaje de Sistema'),
            text: mensaje,
            confirmButtonText: this.$t('Aceptar')
          });
          this.tasa.vigente_flag = this.validacionDatos.marcar_flag;
        }
      }
    },
    async validate() {
      let valid = this.showErrors();
      if (valid) {
        let mensaje = this.nuevo ? this.$t('¿Desea guardar el registro?') : this.$t('¿Desea actualizar el registro?');
        let status = await swal.fire({
          title: this.$t('Mensaje de Sistema'),
          text: mensaje,
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
      } else {
        let data = {
          estado: false,
          mensaje: this.$t('Existen campos obligatorios que están vacíos. Por favor complete los datos.'),
          tipoMEnsaje: 'TMSGADV'
        };
        this.responseRequest(data);
      }
    },
    async vigente() {
      try {
        if (this.tasaSeleccionada != '') {
          if (this.isMounted) this.$vs.loading({ type: 'point' });
          let { data } = await this.requestApi(`validar_vigente_tasa?id=${this.tasaSeleccionada.id}`);
          let response = data.data;
          if (response.estado) {
            if (this.nuevo) {
              this.tasa.vigente_flag = response.data[0].marcar_flag;
            }
            this.validacionDatos = response.data[0];
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
        this.tasa.codigo_tasa = this.tasaSeleccionada.id;
        let post = this.tasa;
        post.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('insertar_tasa', post, 'POST');
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
        this.tasa.codigo_tasa = this.tasaSeleccionada.id;
        let put = this.tasa;
        put.ip = await require('public-ip').v4();
        let { data } = await this.requestApi('actualizar_tasa', put, 'PUT');
        return data;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.$vs.loading.close();
      }
    },
    showErrors() {
      if (this.tasaSeleccionada == '') {
        this.mensajeExisteTasa = this.$t('Debe seleccionar un tipo de tasa');
        return false;
      }
      if (!this.tasa.valor) {
        let input = document.getElementById('valor');
        setTimeout(() => {
          input.focus();
        }, 500);
        this.mensajeExisteValor = this.$t('El valor es requerido');
        return false;
      }
      return true;
    },
    cancel() {
      this.$emit('cancel');
      this.errors.clear('registrarTasa');
      this.limpiar();
    },
    limpiar() {
      Object.assign(this.$data, this.getDefaultData());
    },
    activarFoco() {
      if (this.nuevo) {
        let input = document.getElementById('valor');
        setTimeout(() => {
          input.focus();
        }, 500);
      }
    }
  }
};
</script>
