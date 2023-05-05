import axios from 'axios';
import swal from 'sweetalert2';

export const host = process.env.VUE_APP_API;

export const requestApi = async (endPoint, payload = {}, method = 'get', headers = {}, enviarParametros = true) => {
  const token = localStorage.getItem('token');
  endPoint.replace('#', '%23');
  if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (enviarParametros) {
    let paltaaplicacion = null;

    if (endPoint.indexOf('paltaaplicacion=') == -1) {
      paltaaplicacion = 'SE';
    }

    let idcompania = localStorage.getItem('compania-actual');
    if (method.toLowerCase() == 'post' || method.toLowerCase() == 'put') {
      if (idcompania) payload.idcompania = idcompania;
    }

    let tieneParametros = async (endPoint) => {
      if ((await endPoint.indexOf('?')) > -1) return true;
      return false;
    };

    if (method.toLowerCase() == 'get') {
      if (idcompania) endPoint += (await tieneParametros(endPoint)) ? '&' : '?';
      endPoint += `idcompania=${idcompania != null ? idcompania : 0}`;
      if (paltaaplicacion) endPoint += `&paltaaplicacion=${paltaaplicacion}`;
    }
  }

  const res = await axios({ url: `${host}${endPoint}`, method: method, data: payload, headers: headers });

  if (res.data.code != 400 && res.data.code != 401) {
    let refreshToken = res.data.data ? res.data.data.refreshtoken : null;
    //let refreshMenu = true

    if (refreshToken) {
      localStorage.setItem('token', refreshToken);
    }
    /*
    if (refreshMenu) {
      const responseMenu = await axios(`${host}crear_menu?paltaaplicacion=SE&idcompania=000`, { headers: headers })

      if (responseMenu.data.data.estado) {
        console.log('response ->',responseMenu.data.data.data)
        this.$store.commit('CAMBIAR_MENU_PERMISOS', responseMenu.data.data.data)
      }
    }
    */

    return res;
  } else {
    swal
      .fire({
        title: 'Mensaje de Sistema',
        text: 'Su sesión ha expirado, por favor vuelva a loguearse',
        showConfirmButton: true,
        confirmButtonText: this.$t('Aceptar')
      })
      .then((result) => {
        if (result.value) {
          localStorage.clear();
          window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}login`;
        }
      });
  }

  // Verifica si la contraseña del usuario o la licencia de la compañía ha expirado
  let error = res.data.data.error || null;
  if (error) {
    swal
      .fire({
        title: 'Mensaje de Sistema',
        text: 'Su contraseña o licencia de la compañía ha expirado, por favor vuelva a loguearse.',
        showConfirmButton: true,
        confirmButtonText: this.$t('Aceptar')
      })
      .then((result) => {
        if (result.value) {
          localStorage.clear();
          window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}login`;
        }
      });
  }
  return res;
};

export const requestApiMenu = async (endPoint) => {
  const token = localStorage.getItem('token');

  const headers = {};

  if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
  }

  let idcompania = localStorage.getItem('compania-actual');

  endPoint += `&idcompania=${idcompania != null ? idcompania : 0}`;

  const { data } = await axios.get(`${host}${endPoint}`, { headers: headers });

  return data;
};
