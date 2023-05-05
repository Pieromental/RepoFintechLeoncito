import axios from 'axios';
import swal from 'sweetalert2';

export default {
  methods: {
    async obtenerParametros(parametros, compania = null) {
      const idCompania = compania ? compania : localStorage.getItem('compania-actual');
      const token = localStorage.getItem('token');
      const parametro = parametros.join(',');
      const url = `${process.env.VUE_APP_API}obtener_validar_parametros?pidcompania=${idCompania}&pcodigo=${parametro}`;
      const { data } = await axios({
        url: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = data.data;
      if(data.code != 400 && data.code != 401 ){
        return response.data;
      }
    },

    async validarRoles(rol, estado = false) {
      const token = localStorage.getItem('token');
      const idCompania = localStorage.getItem('compania-actual');
      const url = `${process.env.VUE_APP_API}verificar_usuario_admin_sistema_aplicacion?idAplicacion=${rol}&paltaaplicacion=MG&idcompania=${idCompania}`;
      const { data } = await axios({
        url: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = data.data;
      if (estado) {
        if (!response.estado) {
          this.$vs.loading.close();
          this.$emit('responseParametros', response.estado);
          const result = await swal.fire({
            title: 'Mensaje de Sistema',
            html: `${response.mensaje} <br> Comuniquese con el Administrador del Sistema.`,
            showConfirmButton: true,
            confirmButtonText: this.$t('Aceptar')
          });
          if (result.value || result.hasOwnProperty('dismiss')) {
            window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}inicio`;
          }
        }
      } else {
        return response.estado;
      }
    },

    async validarAdministradorSeguridad() {
      const token = localStorage.getItem('token');
      let idcompania = localStorage.getItem('compania-actual');
      const url = `${process.env.VUE_APP_API}verificar_usuario_adm_seg?idcompania=${idcompania}&paltaaplicacion=SE`;
      const { data } = await axios({
        url: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = data.data;

      if (!response.estado) {
        this.$emit('responseParametros', response.estado);

        const result = await swal.fire({
          title: 'Mensaje de Sistema',
          html: `Comuniquese con el Administrador del Sistema. <br> Código: ${response.codigoError}`,
          showConfirmButton: true,
          confirmButtonText: this.$t('Aceptar')
        });

        if (result.value || result.hasOwnProperty('dismiss')) {
          window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}inicio`;
        }
      }
    },

    async verificarFuncionAsignada(parameter) {
      let token = localStorage.getItem('token');
      let idCompania = localStorage.getItem('compania-actual');
      let url = `${process.env.VUE_APP_API}verificar_usuario_funcionasignada?pcodigofuncion=${parameter}&idcompania=${idCompania}&paltaaplicacion=SE`;
      let { data } = await axios({
        url: url,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let response = data.data;
      return response.estado;
    },

    async formularioParametros(parametros, compania = null) {
      let payload = {};
      let formularioDato = [];
      payload.pidcompania = compania ? compania : localStorage.getItem('compania-actual');;
      if(!parametros) return
      let parametro = parametros.join(',').split(',');
      parametro.forEach(element =>{
        formularioDato.push({
          tipoCampo: element.split('-')[0],
          codigoParametro: element.split('-')[1]
        })
      })
      payload.formularioDato = formularioDato;
      let { data } = await axios({
        url: `${process.env.VUE_APP_API}cargar_formulario`,
        method: 'post',
        data: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(data.code != 400 && data.code != 401 ){
        let response = data.data;
        if(response.data.length > 0){
          let result = await this.templateFormularioParametros(response.data);
          if (result.value || result.hasOwnProperty('dismiss')) {
            if(response.estado){
              this.$vs.loading({ type: 'point' });
              return response.estado;
            }else{
              window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}inicio`;
            }
          }
        }
      }
    },

    async templateFormularioParametros(response){
      this.$vs.loading.close();
      let mensajesRequeridos = '';
      let mensajesOpcionales = '';
      let mensajesInformativos = '';
      response.map((e) => {
        if (e.tipoCampo == 'OB') {
            mensajesRequeridos += `<div class="vs-list--item">
                <div class="vs-list--icon list-icon-parametros">
                  <i class="vs-icon notranslate icon-scale feather ${e.tipoMensaje == 'TMSGERROR' ? 'icon-x color-e-danger' : e.tipoMensaje == 'TMSGADV' ? 'icon-alert-triangle color-w-warning' : 'icon-check color-i-info'}"></i>
                </div>
                <div class="list-titles">
                  <div class="vs-list--subtitle parametro-requerido-mensaje">${this.$t(e.mensaje)}</div>
                </div>
                <div class="vs-list--slot"></div>
              </div>`;
        }else if(e.tipoCampo == 'OP') {
            mensajesOpcionales += `<div class="vs-list--item">
                <div class="vs-list--icon list-icon-parametros">
                  <i class="vs-icon notranslate icon-scale feather ${e.tipoMensaje == 'TMSGERROR' ? 'icon-x color-e-danger' : e.tipoMensaje == 'TMSGADV' ? 'icon-alert-triangle color-w-warning' : 'icon-check color-i-info'}"></i>
                </div>
                <div class="list-titles">
                  <div class="vs-list--subtitle parametro-requerido-mensaje">${this.$t(e.mensaje)}</div>
                </div>
                <div class="vs-list--slot"></div>
              </div>`;
        }else if(e.tipoCampo == ''){
          if(e.tipoMensaje == 'TMSGINF') {
            mensajesInformativos += `<div class="vs-list--item">
                <div class="vs-list--icon list-icon-parametros">
                  <i class="vs-icon notranslate icon-scale feather icon-check color-i-info"></i>
                </div>
                <div class="list-titles">
                  <div class="vs-list--subtitle parametro-requerido-mensaje">${this.$t(e.mensaje)}</div>
                </div>
                <div class="vs-list--slot"></div>
              </div>`;
          }
        }
      });

      let html = '';

      html += mensajesRequeridos.length
            ? `<div class="vs-list">
                  <div class="vs-list--header vs-header-list-primary with-icon">
                    <div class="vs-list--icon">
                      <i class="vs-icon notranslate icon-scale feather"></i>
                    </div>
                    <div class="list-titles">
                      <div class="vs-list--title titulo-lista-parametros-requeridos">
                      `+this.$t('Parámetros Requeridos')+`
                      </div>
                    </div>
                  </div>
                  ${mensajesRequeridos}
                </div>`
        : '';
      html += mensajesOpcionales.length
            ? `<div class="vs-list">
                  <div class="vs-list--header vs-header-list-primary with-icon">
                    <div class="vs-list--icon">
                      <i class="vs-icon notranslate icon-scale feather"></i>
                    </div>
                    <div class="list-titles">
                      <div class="vs-list--title titulo-lista-parametros-opcionales">
                      `+this.$t('Parámetros Opcionales')+`
                      </div>
                    </div>
                  </div>
                  ${mensajesOpcionales}
                </div>`
        : '';
      
      html += mensajesInformativos.length
            ? `<div class="vs-list">
                <div class="vs-list--header vs-header-list-primary with-icon">
                  <div class="vs-list--icon">
                    <i class="vs-icon notranslate icon-scale feather"></i>
                  </div>
                  <div class="list-titles">
                    <div class="vs-list--title titulo-lista-parametros-informativos">
                    `+this.$t('Información')+`
                    </div>
                  </div>
                </div>
                ${mensajesInformativos}
              </div>`
        : '';

      let result = await swal.fire({ title:`<label class="titulo-mensaje-sistema">`+this.$t('Mensaje del Sistema')+`</label>`, html: html, showConfirmButton: true, showCloseButton: true, confirmButtonText: this.$t('Aceptar'), customClass: { container: 'container-parametros-requeridos', popup: 'popup-parametros-requeridos'}});
      return result;
    }
  }
};
