import Vue from 'vue';
import Router from 'vue-router';
import CryptoJS from 'crypto-js';

Vue.use(Router);

const router = new Router({

  mode: 'history',
  base: process.env.BASE_URL,

  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  },

  routes: [
    {
      path: '/',
      name: '/',
      component: () => import('@/project/views/login/Login.vue'),
      meta: {
        rule: 'admin'
      }
    },
    {
      path: '/recuperar-contrasena',
      name: 'recuperar-contrasena',
      component: () => import('@/project/views/recuperar_contrasena/RecuperarContrasena.vue'),
      meta: {
        rule: 'admin'
      }
    },
    {
      path: '/reestablecer-contrasena',
      name: 'reestablecer-contrasena',
      component: () => import('@/project/views/recuperar_contrasena/ReestablecerContrasena.vue'),
      meta: {
        rule: 'admin'
      }
    },
    {
      path: '/modificar-contrasena-pendiente',
      name: 'modificar-contrasena-pendiente',
      component: () => import('@/project/views/modificar_contrasena/ModificarContrasenaPendiente.vue'),
      meta: {
        auth: true,
        rule: 'admin'
      }
    },
    {
      path: '/establecer-contrasena',
      name: 'establecer-contrasena',
      component: () => import('@/project/views/establecer_contrasena/EstablecerContrasena.vue'),
      meta: {
        auth: true,
        rule: 'admin'
      }
    },
    {
      path: '/',
      name: '',
      component: () => import('./layouts/main/Main.vue'),
      meta: {
        rule: 'admin'
      },
      children: [
        {
          path: '/',
          redirect: '/inicio'
        },
        {
          path: '/inicio',
          name: 'inicio',
          component: () => import('@/project/views/inicio/Inicio.vue'),
          meta: {
            auth: true,
            rule: 'admin',
          }
        },
        {
          path: '/ejemplo',
          name: 'ejemplo',
          component: () => import('@/project/views/ejemplo/Ejemplo.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Ejemplo', active: true
              }
            ],
            rule: 'admin'
          }
        },
        
        // =============================================================================
        // MAIN ROUTES
        // =============================================================================
        
        {
          path: '/configuracion-principal',
          name: 'configuracion-principal',
          component: () => import('@/project/views/configuracion_principal/ConfiguracionPrincipal.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Configuración Principal', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/usuario-sistema',
          name: 'usuario-sistema',
          component: () => import('@/project/views/usuario_sistema/UsuarioSistema.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Usuarios del Sistema', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/usuario-sistema/asignar/:id',
          name: 'usuario-sistema-asignar',
          component: () => import('@/project/views/usuario_sistema/AsignarRol.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Usuarios del Sistema'
              },
              {
                title: 'Asignar Rol(es)', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/rol',
          name: 'rol',
          component: () => import('@/project/views/rol/Rol.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Roles', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/rol/asignar/:id',
          name: 'rol-asignar',
          component: () => import('@/project/views/rol/AsignarUsuario.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Roles'
              },
              {
                title: 'Asignar Usuario(s)', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/tabla-master',
          name: 'tabla-master',
          component: () => import('@/project/views/tabla_master/TablaMaster.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Tabla Master', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/tabla-master/nuevo',
          name: 'tabla-master-agregar',
          component: () => import('@/project/views/tabla_master/FormularioTablaMaster.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Tablas Master'
              },
              {
                title: 'Nueva Tabla Master', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/tabla-master/editar/:id',
          name: 'tabla-master-modificar',
          component: () => import('@/project/views/tabla_master/FormularioTablaMaster.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Tablas Master'
              },
              {
                title: 'Modificar Tabla Master', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/tabla-master/ver/:id',
          name: 'tabla-master-ver',
          component: () => import('@/project/views/tabla_master/FormularioTablaMaster.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Tablas Master'
              },
              {
                title: 'Ver Tabla Master', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/parametro-monto',
          name: 'parametro-monto',
          component: () => import('@/project/views/parametro/monto/Monto.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Parámetros'
              },
              {
                title: 'Montos', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/parametro-tea-riesgo',
          name: 'parametro-tea-riesgo',
          component: () => import('@/project/views/parametro/tea_riesgo/TeaRiesgo.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Parámetros'
              },
              {
                title: 'TEA/Riesgo', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/parametro-tasa',
          name: 'parametro-tasa',
          component: () => import('@/project/views/parametro/tasa/Tasas.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Parámetros'
              },
              {
                title: 'Tasas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/ubicacion-geografica',
          name: 'ubicacion-geografica',
          component: () => import('@/project/views/ubicacion_geografica/UbicacionGeografica.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Ubicaciones Geográficas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-empresa-listar',
          name: 'empresa-empresa-listar',
          component: () => import('@/project/views/empresa/empresa/Empresa.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-empresa-revisar',
          name: 'empresa-empresa-revisar',
          component: () => import('@/project/views/empresa/empresa/revisar_empresa/ListadoRevisarEmpresa.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-empresa-revisar-registro/:id',
          name: 'empresa-empresa-revisar-registro',
          component: () => import('@/project/views/empresa/empresa/FormularioEmpresa.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas'
              },
              {
                title: 'Revisar un Registro de Usuario', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-empresa-ver-registro/:id',
          name: 'empresa-empresa-ver-registro',
          component: () => import('@/project/views/empresa/empresa/FormularioEmpresa.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas'
              },
              {
                title: 'Revisar un Registro de Usuario', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-empresa-ver-historial/:id',
          name: 'empresa-empresa-ver-historial',
          component: () => import('@/project/views/empresa/empresa/VerHistorialEmpresa.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas'
              },
              {
                title: 'Revisar un Registro de Usuario', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-subasta',
          name: 'empresa-subasta',
          component: () => import('@/project/views/empresa/subasta/Subasta.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Subastas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-subasta-ver-subasta/:id/:nombres',
          name: 'empresa-subasta-ver-subasta',
          component: () => import('@/project/views/empresa/subasta/Subasta.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversiones', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-subasta/revisar/:codigo',          
          name: 'empresa-subasta-revisar',
          component: () => import('@/project/views/empresa/subasta/MostrarSubasta.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas'
              },
              {
                title: 'Revisar una subasta', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-subasta/ver/:codigo',
          name: 'empresa-subasta-ver',
          component: () => import('@/project/views/empresa/subasta/MostrarSubasta.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas'
              },
              {
                title: 'Revisar una subasta', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/empresa-subasta/avance/:codigo',
          name: 'empresa-subasta-avance',
          component: () => import('@/project/views/empresa/subasta/MostrarSubasta.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Empresa'
              },
              {
                title: 'Empresas'
              },
              {
                title: 'Revisar una subasta', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-inversionista-listar',
          name: 'inversionista-inversionista-listar',
          component: () => import('@/project/views/inversionista/inversionista/Inversionista.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversionistas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-inversionista-revisar',
          name: 'inversionista-inversionista-revisar',
          component: () => import('@/project/views/inversionista/inversionista/ListadoRevisarInversionista.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversionistas', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-inversionista-revisar-registro/:id',
          name: 'inversionista-inversionista-revisar-registro',
          component: () => import('@/project/views/inversionista/inversionista/RevisarInversionistas.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversionistas'
              },
              {
                title: 'Revisar un Inversionista', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-inversionista-ver/:id',
          name: 'inversionista-inversionista-ver',
          component: () => import('@/project/views/inversionista/inversionista/RevisarInversionistas.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversionistas'
              },
              {
                title: 'Revisar un Inversionista', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-inversionista-ver-historial/:id',
          name: 'inversionista-inversionista-ver-historial',
          component: () => import('@/project/views/inversionista/inversionista/VerHistorialInversionista.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversionistas'
              },
              {
                title: 'Ver Historial de Inversionista', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-inversion',
          name: 'inversionista-inversion',
          component: () => import('@/project/views/inversionista/inversion/Inversion.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversiones', active: true
              }
            ],
            rule: 'admin'
          }
        },
        /* ACA ->*/
        {
          path: '/inversionista-inversion-ver-subasta/:id',
          name: 'inversionista-inversion-ver-subasta',
          component: () => import('@/project/views/inversionista/inversion/Inversion.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversiones', active: true
              }
            ],
            rule: 'admin'
          }
        },
        /* ACA ->*/
        {
          path: '/inversionista-inversion-ver-inversiones/:id/:nombres',
          name: 'inversionista-inversion-ver-inversiones',
          component: () => import('@/project/views/inversionista/inversion/Inversion.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Inversiones', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-transaccion',
          name: 'inversionista-transaccion',
          component: () => import('@/project/views/inversionista/transaccion/Transaccion.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Transacciones', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-transaccion/revisar/:id',
          name: 'inversionista-transaccion-revisar',
          component: () => import('@/project/views/inversionista/transaccion/FormularioTransaccion.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Transacción'
              },
              {
                title: 'Revisar Transacción', active: true
              }
            ],
            rule: 'admin'
          }
        },
        {
          path: '/inversionista-transaccion/ver/:id',
          name: 'inversionista-transaccion-ver',
          component: () => import('@/project/views/inversionista/transaccion/FormularioTransaccion.vue'),
          meta: {
            auth: true,
            breadcrumb: [
              {
                title: 'Inicio', url: '/'
              },
              {
                title: 'Inversionista'
              },
              {
                title: 'Transacción'
              },
              {
                title: 'Ver Transacción', active: true
              }
            ],
            rule: 'admin'
          }
        },

        // ==================================================================================
        // -------------------------------- CONFIGURACIONES --------------------------------
        // ==================================================================================
        
        {
          path: '/modificar-contrasena',
          name: 'modificar-contrasena',
          component: () => import('@/project/views/modificar_contrasena/ModificarContrasena.vue'),
          meta: {
            auth: true,
            rule: 'admin'
          }
        }

      ]
    }
  ]

})

router.afterEach(to=>{

  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
      appLoading.style.display = "none";
  }

  let currentUser = localStorage.getItem('token') ? true : false;
  if (currentUser) {
    if ( 
      to.name == '/' ||
      to.name == 'recuperar-contrasena' ||
      to.name == 'reestablecer-contrasena' 
      
    ){
      window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}`;
    }
  } else {
    if (
      !(
        to.name == '/' ||
        to.name == 'recuperar-contrasena' ||
        to.name == 'reestablecer-contrasena' ||
        to.name == 'establecer-contrasena' ||
        to.name == 'modificar-contrasena-pendiente'
      )
    ){
      window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}`;
    }  
  }
  
});

router.beforeEach((to,from, next)=>{

  if (localStorage.getItem('rutas') != null) {
    let rutas = localStorage.getItem('rutas');
    let encrypted_json = JSON.parse(atob(rutas.toString()));
    let decrypted = CryptoJS.AES.decrypt( 
      encrypted_json.value, 
      CryptoJS.enc.Base64.parse(process.env.VUE_APP_ENCRYPT_KEY.toString()), 
      { iv: CryptoJS.enc.Base64.parse(encrypted_json.iv) }
    );
    let decrypt = decrypted.toString(CryptoJS.enc.Utf8);
    let arrRutas = JSON.parse(decrypt) ? JSON.parse(decrypt) : [];
    arrRutas.push('ejemplo');
    arrRutas.push('establecer-contrasena');
    arrRutas.push('modificar-contrasena');
    arrRutas.push('modificar-contrasena-pendiente');
    arrRutas.push('inicio');
    if(arrRutas.indexOf('usuario-sistema') != -1) arrRutas.push('usuario-sistema-asignar')
    if(arrRutas.indexOf('rol') != -1) arrRutas.push('rol-asignar')
    if(arrRutas.indexOf('empresa-subasta') != -1) arrRutas.push('empresa-subasta-revisar','empresa-subasta-ver','empresa-subasta-avance')
    if(arrRutas.indexOf('tabla-master') != -1) arrRutas.push('tabla-master-agregar','tabla-master-modificar','tabla-master-ver')
    if(arrRutas.indexOf('empresa-empresa-listar') != -1) arrRutas.push('empresa-empresa-revisar-registro','empresa-empresa-ver-registro','empresa-empresa-ver-historial')
    if(arrRutas.indexOf('inversionista-inversionista-listar') != -1) arrRutas.push('inversionista-inversionista-revisar-registro','inversionista-inversionista-ver','inversionista-inversionista-ver-historial')
    if(arrRutas.indexOf('inversionista-inversion') != -1) arrRutas.push('inversionista-inversion-ver-inversiones', 'inversionista-inversion-ver-subasta')
    if(arrRutas.indexOf('empresa-subasta') != -1) arrRutas.push('empresa-subasta-ver-subasta')
    if(arrRutas.indexOf('inversionista-transaccion') != -1) arrRutas.push('inversionista-transaccion-revisar','inversionista-transaccion-ver')
    if(arrRutas.indexOf(to.name) == -1) window.location.href = `${process.env.VUE_APP_ENCRYPT_PUBLICPATH}${'inicio'}`;
  }
  
  let currentUser = localStorage.getItem('token') && localStorage.getItem('userName') && localStorage.getItem('userLastName') ? true : false;
  let auth = to.meta.auth;
  
  if (currentUser) {
    if( localStorage.getItem('keyEarring') == 'true' ){
      if(to.name == 'modificar-contrasena-pendiente') next();
      else next('/modificar-contrasena-pendiente');
    }else{
      if (auth) next();
      else next('/inicio');
    }
  } else {
    if (!isPageAccess(to)) next('/');
    else localStorage.clear();
  }
  
  next();
  
});

const isPageAccess = (to) => {
  return (
    to.name == '/' ||
    to.name == 'recuperar-contrasena' ||
    to.name == 'reestablecer-contrasena' ||
    to.name == 'establecer-contrasena' ||
    to.name == 'modificar-contrasena-pendiente'
  );
};

export default router;