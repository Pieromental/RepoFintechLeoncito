export default [
  {
    url: '/configuracion-principal',
    name: 'Configuración Principal',
    slug: 'configuracion-principal',
    i18n: 'Configuración Principal',
    icon: 'AirplayIcon',
    nivel: 3
  },
  {
    url: '/usuario-sistema',
    name: 'Usuarios del Sistema',
    slug: 'usuario-sistema',
    i18n: 'Usuarios del Sistema',
    icon: 'AirplayIcon',
    nivel: 3
  },
  {
    url: '/rol',
    name: 'Roles',
    slug: 'rol',
    i18n: 'Roles',
    icon: 'AirplayIcon',
    nivel: 3
  },
  {
    url: '/tabla-master',
    name: 'Tablas Master',
    slug: 'tabla-master',
    i18n: 'Tablas Master',
    icon: 'AirplayIcon',
    nivel: 3
  },
  {
    url: '/parametro',
    name: 'Parámetros',
    slug: 'parametro',
    i18n: 'Parámetros',
    icon: 'AirplayIcon',
    nivel: 3,
    submenu: [
      {
        url: '/parametro-monto',
        name: 'Montos',
        slug: 'parametro-monto',
        i18n: 'Montos',
        icon: 'CircleIcon',
        nivel: 4
      },
      {
        url: '/parametro-tea-riesgo',
        name: 'TEA/Riesgos',
        slug: 'parametro-tea-riesgo',
        i18n: 'TEA/Riesgos',
        icon: 'CircleIcon',
        nivel: 4
      },
      {
        url: '/parametro-tasa',
        name: 'Tasas',
        slug: 'parametro-tasa',
        i18n: 'Tasas',
        icon: 'CircleIcon',
        nivel: 4
      }
    ]
  },
  {
    url: '/ubicacion-geografica',
    name: 'Ubicaciones Geográficas',
    slug: 'ubicacion-geografica',
    i18n: 'Ubicaciones Geográficas',
    icon: 'AirplayIcon',
    nivel: 3
  },
  {
    url: '/empresa',
    name: 'Empresa',
    slug: 'empresa',
    i18n: 'Empresa',
    icon: 'AirplayIcon',
    nivel: 3,
    submenu: [
      {
        url: '/empresa-empresa-listar',
        name: 'Empresas',
        slug: 'empresa-empresa-listar',
        i18n: 'Empresas',
        icon: 'CircleIcon',
        nivel: 4,
        submenu: [
          {
            url: '/empresa-empresa-listar',
            name: 'Lista de Empresas',
            slug: 'empresa-empresa-listar',
            i18n: 'Lista de Empresas',
            icon: 'CircleIcon',
            nivel: 5
          },
          {
            url: '/empresa-empresa-revisar',
            name: 'Revisar Empresas',
            slug: 'empresa-empresa-revisar',
            i18n: 'Revisar Empresas',
            icon: 'CircleIcon',
            nivel: 5
          }
        ]
      },
      {
        url: '/empresa-subasta',
        name: 'Subastas',
        slug: 'empresa-subasta',
        i18n: 'Subastas',
        icon: 'CircleIcon',
        nivel: 4,
        submenu: [
          {
            url: '/empresa-subasta',
            name: 'Subastas',
            slug: 'empresa-subasta',
            i18n: 'Subastas',
            icon: 'CircleIcon',
            nivel: 5
          }
        ]
      }
    ]
  },
  {
    url: '/inversionista',
    name: 'Inversionista',
    slug: 'inversionista',
    i18n: 'Inversionista',
    icon: 'AirplayIcon',
    nivel: 3,
    submenu: [
      {
        url: '/inversionista-inversionista-listar',
        name: 'Inversionistas',
        slug: 'inversionista-inversionista-listar',
        i18n: 'Inversionistas',
        icon: 'CircleIcon',
        nivel: 4,
        submenu: [
          {
            url: '/inversionista-inversionista-listar',
            name: 'Lista de Inversionistas',
            slug: 'inversionista-inversionista-listar',
            i18n: 'Lista de Inversionistas',
            icon: 'CircleIcon',
            nivel: 5
          },
          {
            url: '/inversionista-inversionista-revisar',
            name: 'Revisar Inversionistas',
            slug: 'inversionista-inversionista-revisar',
            i18n: 'Revisar Inversionistas',
            icon: 'CircleIcon',
            nivel: 5
          }
        ]

      },
      {
        url: '/inversionista-inversion',
        name: 'Inversiones',
        slug: 'inversionista-inversion',
        i18n: 'Inversiones',
        icon: 'CircleIcon',
        nivel: 4,
        submenu: [
          {
            url: '/inversionista-inversion',
            name: 'Inversiones',
            slug: 'inversionista-inversion',
            i18n: 'Inversiones',
            icon: 'CircleIcon',
            nivel: 5

          }
        ]
      },
      {
        url: '/inversionista-transaccion',
        name: 'Transacciones',
        slug: 'inversionista-transaccion',
        i18n: 'Transacciones',
        icon: 'CircleIcon',
        nivel: 4,
        submenu: [
          {
            url: '/inversionista-transaccion',
            name: 'Transacciones',
            slug: 'inversionista-transaccion',
            i18n: 'Transacciones',
            icon: 'CircleIcon',
            nivel: 5

          }
        ]
      }
    ]
  }
];