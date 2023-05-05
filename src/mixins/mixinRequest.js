import axios from 'axios';
import swal from 'sweetalert2';
import sidebarItems from '@/layouts/components/vx-sidebar/sidebarItems.js'
import router from '@/router';
import CryptoJS from 'crypto-js';

export default {
  name: 'Request',
  methods: {
    
    async requestApi(endPoint, payload = {}, method = 'get', headers = {}, enviarParametros = true) {

      if (!headers.hasOwnProperty('Content-Type')) headers['Content-Type'] = 'application/json;charset=UTF-8';

      const token = localStorage.getItem('token');
      endPoint.replace('#', '%23');
      if (token !== null) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios({
        url: `${process.env.VUE_APP_API}${endPoint}`,
        method: method,
        data: payload,
        headers: headers,
      });
      
      if(res.data.code){

        if (res.data.code != 400 && res.data.code != 401) {

          const data = res.data.data;
          let refreshToken = data ? data.refreshtoken : null;
  
          // REFRESH TOKEN
          if (refreshToken) {
            localStorage.setItem('token', refreshToken);
          }
          
          // SEGURIDAD DE OBJETO Y CODIGOS DE ERROR
          if (endPoint.indexOf('verificar_codigo') != 0 && endPoint.indexOf('exportar') != 0 && endPoint.indexOf('descargar') != 0) {
            if (!data.estado) {
              if (data.hasOwnProperty('codigoError')) {
                this.$vs.loading.close();
                await swal.fire({
                  type: 'error',
                  title: '¡Error!',
                  html: `Comuniquese con el Administrador del Sistema. <br> Código: ${data.codigoError}`,
                  showConfirmButton: true,
                  confirmButtonText: this.$t('Aceptar')
                });
              } else if (data.hasOwnProperty('mensajeSeguridad') || data.tipoMensaje == 'MSJSEG') {
                this.$vs.loading.close();
                this.$emit('responseParametros', false);
                const result = await swal.fire({
                  type: 'warning',
                  title: this.$t("Mensaje de seguridad"),
                  text: `${data.tipoMensaje == 'MSJSEG' ? data.mensaje : data.mensajeSeguridad}`,
                  showConfirmButton: true,
                  confirmButtonText: this.$t('Aceptar')
                });
                if (result.value || result.hasOwnProperty('dismiss')) {
                  window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}inicio`;
                }
              }
            }
          }
          
          return res;
  
        } else {

          this.$vs.loading.close();
          localStorage.clear();
          window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}login`;
          await swal.fire({ title: 'Mensaje de Sistema', text: 'Su sesión ha expirado, por favor vuelva a loguearse', showConfirmButton: true, confirmButtonText: this.$t('Aceptar')});
        
        }

        // Verifica si la contraseña del usuario o la licencia de la compañía ha expirado
        let error = res.data.data.error || null;
        if (error) {
          let result = await swal.fire({ title: 'Mensaje de Sistema', text: 'Su contraseña o licencia de la compañía ha expirado, por favor vuelva a loguearse.', showConfirmButton: true, confirmButtonText: this.$t('Aceptar')});
            if (result.value) {
              this.$vs.loading.close();
              localStorage.clear();
              window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}login`;
            }
        }

      }
      
      return res;
    },

    async convertirResponse(file) {
      let data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
      let tmpResponse = '';
      if(data){
        let aux = '';
        if(data.length>24) aux = data.slice(9,23);
        if(aux=='"estado":false') tmpResponse = JSON.parse(data); 
      }
      return tmpResponse
    },

    async requestApiAuxiliar(endPoint, payload = {}, method = 'get', headers = {}, enviarParametros = true) {

      const token = localStorage.getItem('token');

      if (!headers.hasOwnProperty('Content-Type')) headers['Content-Type'] = 'application/json;charset=UTF-8';

      endPoint.replace('#', '%23');
      if (token !== null) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await axios({
        url: `${process.env.VUE_APP_API}${endPoint}`,
        method: method,
        data: payload,
        headers: headers,
      });
      
      let tmpResponse = await this.convertirResponse(res.data);
      
      if(tmpResponse){
        if (tmpResponse.data.hasOwnProperty('codigoError')) {
          this.$vs.loading.close();
          await swal.fire({
            type: 'error',
            title: '¡Error!',
            html: `Comuniquese con el Administrador del Sistema. <br> Código: ${tmpResponse.data.codigoError}`,
            showConfirmButton: true,
            confirmButtonText: this.$t('Aceptar')
          });
        } else if (tmpResponse.data.hasOwnProperty('mensajeSeguridad') || tmpResponse.data.tipoMensaje == 'MSJSEG') {
          this.$vs.loading.close();
          this.$emit('responseParametros', false);
          //this.$router.push("/");
          const result = await swal.fire({
            type: 'warning',
            title: this.$t("Mensaje de seguridad"),
            text: `${tmpResponse.data.tipoMensaje == 'MSJSEG' ? tmpResponse.data.mensaje : tmpResponse.data.mensajeSeguridad}`,
            showConfirmButton: true,
            confirmButtonText: this.$t('Aceptar')
          });

          if (result.value || result.hasOwnProperty('dismiss')) {
            window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}inicio`;
          }
        }
      }
      return tmpResponse ? '':res.data;
    },

    async funcExportar(url, showBtn = true) {
      try {
        if(showBtn){
          this.$vs.loading({
            background: 'rgb(244, 244, 244)',
            color: 'rgba(var(--vs-primary), 1)',
            container: '#exportar-con-loading',
            scale: 0.45
          });
        }
        let token = localStorage.getItem('token');
        let complemento = `&token=${token}`;
        let urlCompleta = `${url}${complemento}`;
        
        let data = await this.requestApi(urlCompleta);
        if (data.headers['content-type'] == 'application/json;charset=UTF-8') {
          if (!data.data.data.estado) {
            if (data.data.data.codigoError) {
              swal.fire({
                type: 'error',
                title: '¡Error!',
                html: `Comuniquese con el Administrador del Sistema. <br>  Código: ${data.data.data.codigoError}  `,
                showConfirmButton: true,
                confirmButtonText: this.$t('Aceptar')
              });
            } else {
              this.responseRequest(data.data.data);
              // this.$vs.notify({
              //   color: 'warning',
              //   title: '¡Advertencia!',
              //   text: data.data.data.mensaje
              // });
            }
          }
        } else {
          window.location.href = `${process.env.VUE_APP_API}${urlCompleta}`;
        }
        this.$vs.loading.close('#exportar-con-loading > .con-vs-loading');
      } catch (error) {
        console.error(error);
      }
    },

    async funcDescargar(url){
      try {
        let data = await this.requestApi(url);
        if (data.headers['content-type'] == 'application/json;charset=UTF-8') {
          if (!data.data.data.estado) {
            if (data.data.data.codigoError) {
              swal.fire({
                type: 'error',
                title: '¡Error!',
                html: `Comuniquese con el Administrador del Sistema. <br>  Código: ${data.data.data.codigoError}  `,
                showConfirmButton: true,
                confirmButtonText: this.$t('Aceptar')
              });
            } else {
              this.responseRequest(data.data.data);
            }
          }
        } else {
          window.location.href = `${process.env.VUE_APP_API}${url}`;
        }
        return data.data
      } catch (error) {
        console.error(error);
      }
    },
    
    async funcImprimir(urlCompleta) {
      try {
        let data = null;
        data = await this.requestApiAuxiliar(urlCompleta);
        if(data){
          let blob = new Blob([data], { type: 'application/pdf' } )
          var url = window.URL.createObjectURL(blob)
          window.open(url);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async funcDescargarFormato(url) {
      try {
        let token = localStorage.getItem('token');
        let compania = localStorage.getItem('compania-actual');
        let complemento= `&token=${token}&idcompania=${compania}`;
        console.info('url.indexOf(1',url.indexOf('paltaaplicacion=') == -1)
        if(url.indexOf('paltaaplicacion=') == -1){
          let paltaaplicacion = this.$store.state.paltaaplicacion;
          paltaaplicacion = paltaaplicacion ? paltaaplicacion : 'SE';
          complemento = `${complemento}&paltaaplicacion=${paltaaplicacion}`;
        }
        let urlCompleta = url + complemento;
        let data = null;
        data = await this.requestApi(urlCompleta);
        
        if (data.headers['content-type'] == 'application/json;charset=UTF-8') {
          if (!data.data.data.estado) {
            if (data.data.data.codigoError) {
              await swal.fire({
                type: 'error',
                title: '¡Error!',
                html: `Comuniquese con el Administrador del Sistema. <br>  Código: ${data.data.data.codigoError}  `,
                showConfirmButton: true,
                confirmButtonText: this.$t('Aceptar')
              });
            } else {
              this.responseRequest(data.data.data);
              // this.$vs.notify({
              //   color: 'warning',
              //   title: '¡Advertencia!',
              //   text: data.data.data.mensaje
              // });
            }
          }
        } else {
          window.location.href = `${process.env.VUE_APP_API}${urlCompleta}`;
        }
      } catch (error) {
        console.error(error);
      }
    },
    
    async formatoTelefonico() {
      try {
        const { data } = await this.requestApi(`obtener_formato_telefono?paltaaplicacion=SE`);
        const response = data.data;
        return response.estado ? response.data[0].formatoTelfono.split('E').join(' ') : '';
      } catch (error) {
        console.error(error);
      }
    },

    responseRequest(value) {
      let title = value.tipoMensaje == 'MSJERROR' ? 'Incorrecto' :  value.tipoMensaje == 'MSJADV' ? 'Advertencia' :value.tipoMensaje == 'MSJINF' ? 'Correcto' : '';
      let color = value.tipoMensaje == 'MSJERROR' ? 'danger' :  value.tipoMensaje == 'MSJADV' ? 'warning' :value.tipoMensaje == 'MSJINF' ? 'success' : '';
      let time = value.time ? value.time:3500;
      let icon = value.tipoMensaje == 'MSJERROR' ? 'icon-x-circle' :  value.tipoMensaje == 'MSJADV' ? 'icon-alert-circle' :value.tipoMensaje == 'MSJINF' ? 'icon-check-circle' : '';
      this.notification( this.$t(title), this.$t(value.mensaje), color,time,icon)
    },

    notification(title, text, color,time,icon) {
      this.$vs.notify({
        title,
        text,
        color,
        time,
        icon,
        iconPack: 'feather'
      });
    },

    async sweetAlert(value){
      let status = await swal.fire({type: value.tipoMensaje == 'MSJERROR' ?'error' : value.tipoMensaje == 'MSJADV' ? 'warning' : 'info', title: this.$t("Mensaje del Sistema"), html: `<span>${value.mensaje}</span>` ,showConfirmButton: true, showCancelButton: false, confirmButtonText: this.$t("Aceptar"), cancelButtonText: this.$t("Cancelar") });
      if (status.value || status.hasOwnProperty('dismiss')) {
        return true ;
      }
    },
    
    filterByIdLabel(option, label, search) {
      return (option.codigo || '').toLowerCase().indexOf(search.toLowerCase()) > -1 || (option.label || '').toLowerCase().indexOf(search.toLowerCase()) > -1;
    },
    async obtenerCompaniaSesion() {
      if (this.$route.meta.compania) {
        let compania_nueva = localStorage.getItem(`${this.$route.name}-comp`);
        let headers = {};

        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

        const { data } = await axios(`${process.env.VUE_APP_API}cargar_datos?estado=false&opcion=c_companiasautorizadas&idaplicacion=&paltaaplicacion=SE`, {
          headers: headers
        });

        let response = data.data.data || [];

        response = response.map((e) => {
          return {
            id: e.companiaId,
            label: e.companiaDescripcionCorta,
            object: {
              companiaId: e.companiaId,
              companiaDescripcionCorta: e.companiaDescripcionCorta,
              usuarioDetalleValorCodigoTipoCompania: e.usuarioDetalleValorCodigoTipoCompania,
              companiaPreferida: e.companiaPreferida
            }
          };
        });

        const obj_comp = response.find((e) => {
          return e.id === compania_nueva;
        });

        return obj_comp;
      }
      return '000';
    },
    async descargarFomartoExcel(value) {
        let headers = {};

        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

        const { data } = await axios(`${process.env.VUE_APP_API.replace('v1/','')}${value}`, {
          headers: headers
        });

    },
    async validarCombo(codigo, api) {
      let { data } = await this.requestApi(api);
      if (data.data.estado) {
        let response = data.data.data;
        let seleccionado = response.filter((element) => element.codigo == codigo);
        let opciones = response.filter((element) => element.object.estado == true);
        if (seleccionado.length > 0) {
          if (!seleccionado[0].object.estado) opciones.push(seleccionado[0]);
          return { opciones, seleccionado, mensaje: '' };
        } else {
          return { opciones, seleccionado: null, mensaje: 'El codigo ' + codigo + ' no esta registrado en la compañia seleccionada.' };
        }
      } else {
        return { opciones: [], seleccionado: null, mensaje: 'El codigo ' + codigo + ' no esta registrado en la compañia seleccionada.' };
      }
    }
  },
  created() {
    //this.$emit("responseParametros", true);
  },
  async beforeRouteEnter(to, from, next) {
    if (!from.name) {
      next();
    } else {
      if (to.meta.compania && to.name.includes('ampliar')) {
        let headers = {};

        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

        const { data } = await axios(`${process.env.VUE_APP_API}cargar_datos?estado=false&opcion=c_companiasautorizadas&idaplicacion=&paltaaplicacion=SE`, {
          headers: headers
        });

        const response = data.data;

        if (!response.estado) {
          next('/inicio');
        } else {
          const companiasMuestra = new Map();
          response.data.forEach((e) => companiasMuestra.set(e.companiaId, e.companiaDescripcionCorta));

          const { value: compania } = await swal.fire({
            title: 'Seleccione una compañía',
            input: 'select',
            inputOptions: companiasMuestra,
            inputPlaceholder: 'Seleccione una compañía',
            showCancelButton: false,
            allowOutsideClick: false
          });
          if (await compania) {
            const ruta = router.resolve(to);
            localStorage.setItem(`${to.name}-comp`, compania);
            window.open(ruta.href, '_blank', 'height=600,width=650,menubar=no,scrollbars=on,location=no,toolbar=no,personalbar=no,resizable=no');
            return false;

            // next();
          } else {
            return false;
          }
        }
      }
      next();
    }
  }
};
