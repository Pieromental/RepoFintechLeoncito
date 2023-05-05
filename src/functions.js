/*=========================================================================================
  File Name: functions.js
  Description: Vuex Store - functios
  ----------------------------------------------------------------------------------------
  Author: Team Leoncito

==========================================================================================*/
import { requestApi, host } from '@/api';
import 'vuesax/dist/vuesax.css'; // Vuesax
//const host = "http://192.168.0.7:8000/v1/";

//const host = host;

const icons = [
  'ActivityIcon',
  'AirplayIcon',
  'AlertCircleIcon',
  'AlertOctagonIcon',
  'AlertTriangleIcon',
  'AlignCenterIcon',
  'AlignJustifyIcon',
  'AlignLeftIcon',
  'AlignRightIcon',
  'AnchorIcon',
  'ApertureIcon',
  'ArchiveIcon',
  'ArrowDownCircleIcon',
  'ArrowDownIcon',
  'ArrowDownLeftIcon',
  'ArrowDownRightIcon',
  'ArrowLeftCircleIcon',
  'ArrowLeftIcon',
  'ArrowRightCircleIcon',
  'ArrowRightIcon',
  'ArrowUpCircleIcon',
  'ArrowUpIcon',
  'ArrowUpLeftIcon',
  'ArrowUpRightIcon',
  'AtSignIcon',
  'AwardIcon',
  'BarChart2Icon',
  'BarChartIcon',
  'BatteryChargingIcon',
  'BatteryIcon',
  'BellIcon',
  'BellOffIcon',
  'BluetoothIcon',
  'BoldIcon',
  'BookIcon',
  'BookOpenIcon',
  'BookmarkIcon',
  'BoxIcon',
  'BriefcaseIcon',
  'CalendarIcon',
  'CameraIcon',
  'CameraOffIcon',
  'CastIcon',
  'CheckCircleIcon',
  'CheckIcon',
  'CheckSquareIcon',
  'ChevronDownIcon',
  'ChevronLeftIcon',
  'ChevronRightIcon',
  'ChevronUpIcon',
  'ChevronsDownIcon',
  'ChevronsLeftIcon',
  'ChevronsRightIcon',
  'ChevronsUpIcon',
  'ChromeIcon',
  'CircleIcon',
  'ClipboardIcon',
  'ClockIcon',
  'CloudDrizzleIcon',
  'CloudIcon',
  'CloudLightningIcon',
  'CloudOffIcon',
  'CloudRainIcon',
  'CloudSnowIcon',
  'CodeIcon',
  'CodepenIcon',
  'CodesandboxIcon',
  'CoffeeIcon',
  'ColumnsIcon',
  'CommandIcon',
  'CompassIcon',
  'CopyIcon',
  'CornerDownLeftIcon',
  'CornerDownRightIcon',
  'CornerLeftDownIcon',
  'CornerLeftUpIcon',
  'CornerRightDownIcon',
  'CornerRightUpIcon',
  'CornerUpLeftIcon',
  'CornerUpRightIcon',
  'CpuIcon',
  'CreditCardIcon',
  'CropIcon',
  'CrosshairIcon',
  'DatabaseIcon',
  'DeleteIcon',
  'DiscIcon',
  'DollarSignIcon',
  'DownloadCloudIcon',
  'DownloadIcon',
  'DropletIcon',
  'Edit2Icon',
  'Edit3Icon',
  'EditIcon',
  'ExternalLinkIcon',
  'EyeIcon',
  'EyeOffIcon',
  'FacebookIcon',
  'FastForwardIcon',
  'FeatherIcon',
  'FigmaIcon',
  'FileIcon',
  'FileMinusIcon',
  'FilePlusIcon',
  'FileTextIcon',
  'FilmIcon',
  'FilterIcon',
  'FlagIcon',
  'FolderIcon',
  'FolderMinusIcon',
  'FolderPlusIcon',
  'FramerIcon',
  'FrownIcon',
  'GiftIcon',
  'GitBranchIcon',
  'GitCommitIcon',
  'GitMergeIcon',
  'GitPullRequestIcon',
  'GithubIcon',
  'GitlabIcon',
  'GlobeIcon',
  'GridIcon',
  'HardDriveIcon',
  'HashIcon',
  'HeadphonesIcon',
  'HeartIcon',
  'HelpCircleIcon',
  'HexagonIcon',
  'HomeIcon',
  'ImageIcon',
  'InboxIcon',
  'InfoIcon',
  'InstagramIcon',
  'ItalicIcon',
  'KeyIcon',
  'LayersIcon',
  'LayoutIcon',
  'LifeBuoyIcon',
  'Link2Icon',
  'LinkIcon',
  'LinkedinIcon',
  'ListIcon',
  'LoaderIcon',
  'LockIcon',
  'LogInIcon',
  'LogOutIcon',
  'MailIcon',
  'MapIcon',
  'MapPinIcon',
  'Maximize2Icon',
  'MaximizeIcon',
  'MehIcon',
  'MenuIcon',
  'MessageCircleIcon',
  'MessageSquareIcon',
  'MicIcon',
  'MicOffIcon',
  'Minimize2Icon',
  'MinimizeIcon',
  'MinusCircleIcon',
  'MinusIcon',
  'MinusSquareIcon',
  'MonitorIcon',
  'MoonIcon',
  'MoreHorizontalIcon',
  'MoreVerticalIcon',
  'MousePointerIcon',
  'MoveIcon',
  'MusicIcon',
  'Navigation2Icon',
  'NavigationIcon',
  'OctagonIcon',
  'PackageIcon',
  'PaperclipIcon',
  'PauseCircleIcon',
  'PauseIcon',
  'PenToolIcon',
  'PercentIcon',
  'PhoneCallIcon',
  'PhoneForwardedIcon',
  'PhoneIcon',
  'PhoneIncomingIcon',
  'PhoneMissedIcon',
  'PhoneOffIcon',
  'PhoneOutgoingIcon',
  'PieChartIcon',
  'PlayCircleIcon',
  'PlayIcon',
  'PlusCircleIcon',
  'PlusIcon',
  'PlusSquareIcon',
  'PocketIcon',
  'PowerIcon',
  'PrinterIcon',
  'RadioIcon',
  'RefreshCcwIcon',
  'RefreshCwIcon',
  'RepeatIcon',
  'RewindIcon',
  'RotateCcwIcon',
  'RotateCwIcon',
  'RssIcon',
  'SaveIcon',
  'ScissorsIcon',
  'SearchIcon',
  'SendIcon',
  'ServerIcon',
  'SettingsIcon',
  'Share2Icon',
  'ShareIcon',
  'ShieldIcon',
  'ShieldOffIcon',
  'ShoppingBagIcon',
  'ShoppingCartIcon',
  'ShuffleIcon',
  'SidebarIcon',
  'SkipBackIcon',
  'SkipForwardIcon',
  'SlackIcon',
  'SlashIcon',
  'SlidersIcon',
  'SmartphoneIcon',
  'SmileIcon',
  'SpeakerIcon',
  'SquareIcon',
  'StarIcon',
  'StopCircleIcon',
  'SunIcon',
  'SunriseIcon',
  'SunsetIcon',
  'TabletIcon',
  'TagIcon',
  'TargetIcon',
  'TerminalIcon',
  'ThermometerIcon',
  'ThumbsDownIcon',
  'ThumbsUpIcon',
  'ToggleLeftIcon',
  'ToggleRightIcon',
  'Trash2Icon',
  'TrashIcon',
  'TrelloIcon',
  'TrendingDownIcon',
  'TrendingUpIcon',
  'TriangleIcon',
  'TruckIcon',
  'TvIcon',
  'TwitterIcon',
  'TypeIcon',
  'UmbrellaIcon',
  'UnderlineIcon',
  'UnlockIcon',
  'UploadCloudIcon',
  'UploadIcon',
  'UserCheckIcon',
  'UserIcon',
  'UserMinusIcon',
  'UserPlusIcon',
  'UserXIcon',
  'UsersIcon',
  'VideoIcon',
  'VideoOffIcon',
  'VoicemailIcon',
  'Volume1Icon',
  'Volume2Icon',
  'VolumeIcon',
  'VolumeXIcon',
  'WatchIcon',
  'WifiIcon',
  'WifiOffIcon',
  'WindIcon',
  'XCircleIcon',
  'XIcon',
  'XOctagonIcon',
  'XSquareIcon',
  'YoutubeIcon',
  'ZapIcon',
  'ZapOffIcon',
  'ZoomInIcon',
  'ZoomOutIcon',
  'IconAsignarPosicionUsuario'
];

export default {
  cambiarTextoTablaSinDatos(mensaje) {
    if (document.querySelector('.vs-table--not-data') != null) document.querySelector('.vs-table--not-data').innerHTML = mensaje;
  },
  longitudMaskNumero(valor, token) {
    let mask = '';
    for (let i = 0; i < valor; i++) {
      mask += token;
    }
    return mask;
  },

  //CONSULTAR COMBOS
  //opcion=cbotontipo&estado=false&idcompania=000&paltaaplicacion=SE

  async cargarCombos(opcion, codigoTabla, estado) {
    let opciones = [];
    let response = null;
    try {
      const { data } = await requestApi('cargar_datos?opcion=' + opcion + '&codigoTabla=' + codigoTabla + '&estado=' + estado);
      response = data.data.data;
      response.forEach((element) => {
        opciones.push({
          id: element.id,
          label: element.descripcion
        });
      });
    } catch (error) {
      console.error(error);
    }
    return opciones;
  },

  async cargarCombosToken(opcion, estado) {
    let opciones = [];
    let response = null;
    let compania = localStorage.getItem('compania-actual');
    let altaAplicacion = 'SE';
    try {
      const { data } = await requestApi('cargar_datos?opcion=' + opcion + '&estado=' + estado + '&idcompania=' + compania + '&paltaaplicacion=' + altaAplicacion);
      response = data.data.data;
      response.forEach((element) => {
        opciones.push({
          id: element.idBotonTipo,
          label: element.descripcionBotonTipo
        });
      });
    } catch (error) {
      console.error(error);
    }
    return opciones;
  },

  // CONSULTAR CODIGOS
  async consultarCodigo(opcion, codigo) {
    try {
      const { data } = await requestApi('verificar_codigo?opcion=' + opcion + '&codigo=' + codigo);
      const response = data.data;

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async consultarCodigoLS(opcion, idVersion, codigo, grupoFuncion) {
    try {
      const { data } = await requestApi('verificar_codigo?opcion=' + opcion + '&idVersion=' + idVersion + '&idFuncionGrupo=' + grupoFuncion + '&grupo=' + codigo);
      const response = data.data.data;

      return response;
    } catch (error) {
      console.error(error);
    }
  },
  async consultarOrdenPresentacionGrupo(opcion, idVersion, orden, nivel, idFuncionGrupo) {
    try {
      const { data } = await requestApi(
        'verificar_codigo?opcion=' + opcion + '&pidversion=' + idVersion + '&pordenpresentacion=' + orden + '&pidfunciongrupo=' + idFuncionGrupo + '&pnivel=' + nivel
      );

      const response = data.data;

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  async validarCodigo(pidfunciongrupo, pfuncion) {
    try {
      const { data } = await requestApi('valida_funcion?&pidfunciongrupo=' + pidfunciongrupo + '&pfuncion=' + pfuncion);
      const response = data.data;

      return response;
    } catch (error) {
      console.error(error);
    }
  },

  // EXPORTAR EXCEL
  exportarExcel(opcion = '', estado = '', id = '') {
    try {
      window.location.href = `${host}exportar?opcion=${opcion}&id=${id}&estado=${estado}`;
    } catch (error) {
      console.error(error);
    }
  },

  // CONVERTIR STRING DEL FORMATO dd-MM-yyyy a OBJETO DATE
  obtenerFecha(valor, divisor = '/', formato = 'dd-MM-yyyy') {
    let array_partes = valor.split(divisor);
    if (formato == 'yyyy-MM-dd') {
      return new Date(Number(array_partes[0]), Number(array_partes[1] - 1), Number(array_partes[2]));
    }
    if (formato == 'dd-MM-yyyy') {
      return new Date(Number(array_partes[2]), Number(array_partes[1] - 1), Number(array_partes[0]));
    }
    if (formato == 'dd/MM/yyyy') {
      return new Date(Number(array_partes[2]), Number(array_partes[1] - 1), Number(array_partes[0]));
    }
  },
  // CAMBIAR FORMATO STRING A dd/MM/yyyy
  cambiarFormatoFecha(valor, divisor1 = '-', formato = 'yyyy-MM-dd') {
    let array_partes = valor.split(divisor1);
    let divisor2 = '/';
    let d = array_partes[0];
    let m = array_partes[1];
    let y = array_partes[2];
    if (formato == 'dd-MM-yyyy') {
      return `${d}${divisor2}${m}${divisor2}${y}`;
    }
    if (formato == 'yyyy-MM-dd') {
      return `${y}${divisor2}${m}${divisor2}${d}`;
    }
  },

  // CONVERTIR OBJETO DATE A STRING EN FORMATO dd-MM-yyyy
  convertirFecha(valor, divisor = '/', formato = 'dd-MM-yyyy') {
    let d = ('0' + valor.getDate()).slice(-2);
    let m = ('0' + (valor.getMonth() + 1)).slice(-2);
    let y = valor.getFullYear();

    if (formato == 'dd-MM-yyyy') {
      return `${d}${divisor}${m}${divisor}${y}`;
    }
    if (formato == 'yyyy-MM-dd') {
      return `${y}${divisor}${m}${divisor}${d}`;
    }
  },

  // VALIDAR SI UN VALOR ES UN OBJETO DATE
  esFecha(input) {
    if (Object.prototype.toString.call(input) === '[object Date]') return true;
    return false;
  },

  existePos(lista, elemento) {
    let existe = false;
    lista.forEach((elementoLista) => {
      if (elementoLista.filtro == elemento.filtro) {
        existe = true;
      }
    });

    return existe;
  },

  // ACTUALIZAR LISTA FILTROS SELECCIONADOS
  actualizarListaFiltrosSeleccionados(state, obj) {
    if (obj.objeto !== undefined && !this.existePos(state, obj)) {
      state.push({
        objeto: obj.objeto,
        filtro: obj.filtro,
        closable: obj.closable
      });
    } else if (obj.objeto !== undefined && obj.closable) {
      let pos = 0;

      state = state.forEach((elemento) => {
        if (elemento.filtro == obj.filtro) {
          state[pos].objeto = obj.objeto;
        }
        pos++;
      });
    }
    return state;
  },

  // VERIFICAR LISTA FILTROS SELECCIONADOS
  verificarListaFiltrosSeleccionados(state, obj) {
    let pos = 0;

    state.forEach((elemento) => {
      if (elemento.filtro == obj.filtro) {
        state.splice(pos, 1);
      }
      pos++;
    });

    return state;
  },

  // REMOVER ELEMENTO LISTA FILTROS SELECCIONADOS
  removerElementoListaFiltrosSeleccionados(state, index) {
    state.splice(index, 1);
    return state;
  },

  // VACIAR LISTA FILTROS SELECCIONADOS
  vaciarListaFiltrosSeleccionados(state) {
    state = [];
    return state;
  },

  // OBTENER FILTROS DE SELECCIONADOS POR TIPO
  obtenerFiltrosSeleccionadosPorTipo: (state, filtro) => {
    let filtrosSeleccionados = [];

    state.forEach((elemento) => {
      if (elemento.filtro == filtro) filtrosSeleccionados.push(elemento.objeto);
    });

    return filtrosSeleccionados;
  },

  // VERIFICAR EXISTENCIA DE FILTRO POR TIPO
  verificarExistenciaDeFiltroPorTipo: (filtro, state) => {
    let encontrado = state.find((elemento) => {
      return elemento.filtro == filtro;
    });
    if (!encontrado) return false;
    return true;
  },

  // OBTENER EL ARREGLO DE ICONOS

  obtenerIconos() {
    let tmpIcons = [];

    icons.forEach((element, index) => {
      tmpIcons.push({
        id: index + 1,
        titulo: element,
        icono: element
      });
    });

    return tmpIcons;
  },

  // Funciones reutilizables en el chip y el sidebar del filtro
  async filterClean(filters, obj) {
    let childsActions = [];

    filters.forEach((element) => {
      if (obj.type == 'select' && obj.title == element.title) {
        if (element.action) childsActions = element.change ? element.change.slice() : [];
      }
      if (obj.type == 'text' && obj.title == element.title) {
        if (element.action) childsActions = element.change ? element.change.slice() : [];
      }
      if (obj.type == 'check' && obj.title == element.title) {
        if (element.action) childsActions = element.change ? element.change.slice() : [];
      }
      if (obj.type == 'criterio' && obj.title == element.title) {
        if (element.action) childsActions = element.change ? element.change.slice() : [];
      }

      if (obj.type == 'radio' && obj.title == element.title) {
        if (element.action) childsActions = element.change ? element.change.slice() : [];
      }

      if (obj.type == 'singleCheck' && obj.title == element.title) {
        if (element.action) childsActions = element.change ? element.change.slice() : [];
      }
    });

    filters.forEach((element) => {
      if (obj.type == 'select' && obj.title == element.title) {
        element.options.model = '';
      }
      if (obj.type == 'select' && obj.multiple && obj.title == element.title) {
        element.options.model = '';
        element.options.values = [];
      }
      if (obj.type == 'popUp' && obj.title == element.title) {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
          if(el.tipo=='texto') el.values = '';
        });
      }
      if (obj.type == 'treePopUp' && obj.title == element.title) {
        if(obj.clear == true) return
        element.options.model = '';
        element.options.value = null;
        element.options.aux = [];
        element.options.optionsPopUp.map((el) => {
          el.model = '';
          if(el.tipo=='texto') el.values = '';
        });
      }
      if (obj.type == 'selectGroup' && obj.title == element.title) {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
          el.values = el.multiple ? [] : '';
        });
      }
      if (obj.type == 'tree' && obj.title == element.title) {
        if(obj.clear == true) return
        element.options.model = '';
        element.options.value = null;
        element.options.aux = [];
      }
      if (obj.type == 'date' && obj.title == element.title) {
        element.options.model = '';
        element.options.value = null;
      }
      if (obj.type == 'dateRange' && obj.title == element.title) {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
          el.value = null;
          if(el.disabledDate){ 
            el.disabledDate.to = '';
            el.disabledDate.from = '';
          }
          if(el.valueHora) el.valueHora = '';
        });
      }
      if (obj.type == 'number' && obj.title == element.title) {
        element.options.model = '';
      }
      if (obj.type == 'numberRange' && obj.title == element.title) {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
        });
      }
      if (obj.type == 'text' && obj.title == element.title) {
        element.options.model = '';
      }
      if (obj.type == 'check' && obj.title == element.title) {
        element.options.model = '';
        element.options.count.forEach((check) => {
          check.model = false;
        });
      }
      if (obj.type == 'criterio' && obj.title == element.title) {
        element.options.input = '';
        element.options.select = '';
        element.options.model = '';

        element.options.criterio_multiple.forEach((cmultiple) => {
          cmultiple.visible = cmultiple.index == 0 ? true : false;
          cmultiple.add = cmultiple.index == 0 ? true : false;
          cmultiple.modelChild = '';
          cmultiple.selectChild = '';
          cmultiple.inputChild = '';
          cmultiple.radio = cmultiple.radio_and;
        });
      }
      if (obj.type == 'radio' && obj.title == element.title) {
        element.options.model = '';
        element.options.value = '';
      }
      if (obj.type == 'singleCheck' && obj.title == element.title) {
        element.options.model = '';
        element.options.value = false;
      }
    });

    if (childsActions.length > 0) {
      childsActions.forEach((child) => {
        filters.forEach((element) => {
          if (child.type == 'select' && child.child == element.title) {
            element.options.model = '';
            element.options.options = [];
          }
          if (child.type == 'select' && child.multiple && child.child == element.title) {
            element.options.model = '';
            element.options.values = [];
          }
          if (child.type == 'date' && child.child == element.title) {
            element.options.model = '';
            element.options.value = null;
          }
          if (child.type == 'dateRange' && child.child == element.title) {
            element.options.model = '';
            element.options.options.map((el) => {
              el.model = '';
              el.value = null;
              if(el.disabledDate){ 
                el.disabledDate.to = '';
                el.disabledDate.from = '';
              }
              if(el.valueHora) el.valueHora = '';
            });
          }
          if (child.type == 'number' && child.child == element.title) {
            element.options.model = '';
          }
          if (child.type == 'numberRange' && child.child == element.title) {
            element.options.model = '';
            element.options.options.map((el) => {
              el.model = '';
            });
          }
          if (child.type == 'text' && child.child == element.title) {
            element.options.model = '';
          }
          if (child.type == 'check' && child.child == element.title) {
            element.options.model = '';
            element.options.count.forEach((check) => {
              check.model = false;
            });
          }
          if (child.type == 'criterio' && child.child == element.title) {
            element.options.input = '';
            element.options.select = '';
            element.options.model = '';
          }
          if (child.type == 'radio' && child.child == element.title) {
            element.options.model = '';
            element.options.value = '';
          }
          if (child.type == 'singleCheck' && child.child == element.title) {
            element.options.model = '';
            element.options.value = false;
          }
        });
      });
    }

    return filters;
  },
  filterCleanAll(filters) {
    filters.forEach((element) => {
      if (element.type == 'select' && !element.disabledSection) {
        element.options.model = '';
      }
      if (element.type == 'select' && element.multiple && !element.disabledSection) {
        element.options.model = '';
        element.options.values = [];
      }
      if (element.type == 'popUp') {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
          if(el.tipo=='texto') el.values = '';
        });
      }
      if (element.type == 'treePopUp') {
        element.options.model = '';
        element.model = '';
        if(element.clear == true) return
        element.options.model = '';
        element.options.value = null;
        element.options.aux = [];
        element.options.optionsPopUp.map((el) => {
          el.model = '';
          if(el.tipo=='texto') el.values = '';
        });
      }
      if (element.type == 'selectGroup') {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
          el.values = el.multiple ? [] : '';
        });
      }
      if (element.type == 'date') {
        element.options.model = '';
        element.options.value = null;
      }
      if (element.type == 'dateRange') {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
          el.value = null;
          if(el.disabledDate){ 
            el.disabledDate.to = '';
            el.disabledDate.from = '';
          }
          if(el.valueHora) el.valueHora = '';
        });
      }
      if (element.type == 'tree') {
        if(element.clear == true) return
        element.options.model = '';
        element.options.value = null;
        element.options.aux = [];
      }
      if (element.type == 'number' && !element.disabledSection) {
        element.options.model = '';
      }
      if (element.type == 'numberRange' && !element.disabledSection) {
        element.options.model = '';
        element.options.options.map((el) => {
          el.model = '';
        });
      }
      if (element.type == 'text' && !element.disabledSection ) {
        element.options.model = '';
      }
      if (element.type == 'check') {
        element.options.model = '';
        element.options.value = '';
        element.options.count.forEach((check) => {
          check.model = false;
        });
      }
      if (element.type == 'criterio' && !element.disabledSection) {
        element.options.input = '';
        element.options.select = '';
        element.options.model = '';

        element.options.criterio_multiple.forEach((cmultiple) => {
          cmultiple.visible = cmultiple.index == 0 ? true : false;
          cmultiple.add = cmultiple.index == 0 ? true : false;
          cmultiple.modelChild = '';
          cmultiple.selectChild = '';
          cmultiple.inputChild = '';
          cmultiple.radio = cmultiple.radio_and;
        });
      }
      if (element.type == 'radio') {
        element.options.model = '';
        element.options.value = '';
      }
      if (element.type == 'singleCheck') {
        element.options.model = '';
        element.options.value = false;
      }
    });

    return filters;
  },
  filterMapChips(filters) {
    let tmpFilters = [];
    filters.forEach((element) => {
      if (element.type == 'select') {
        if (element.multiple) {
          tmpFilters.push({
            title: element.title,
            model: element.options.model ? element.options.model : '',
            closable: element.closable
          });
        } else {
          tmpFilters.push({
            title: element.title,
            model: element.options.model ? element.options.model.label : '',
            closable: element.closable
          });
        }
      }
      if (element.type == 'selectGroup') {
        element.options.options.forEach((el) => {
          tmpFilters.push({
            title: el.abbr,
            model: el.model.split(':').length > 1 ? el.model.split(':')[1].trim() : '',
            closable: false
          });
        });
      }
      if (element.type == 'popUp') {
        element.options.options.forEach((el) => {
          tmpFilters.push({
            title: el.abbr,
            model: el.model,
            closable: false
          });
        });
      }
      if (element.type == 'treePopUp') {
        element.options.optionsPopUp.forEach((el) => {
          tmpFilters.push({
            title: el.abbr,
            model: el.model,
            closable: false
          });
        });
      }
      if (element.type == 'date') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'dateRange') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'tree') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'number') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'numberRange') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'text') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'check') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
      if (element.type == 'criterio') {
        if (element.options.model != null && element.options.model != '') {
          let tmpCriterio = element.options.model ? element.options.model.split(':') : '';
          tmpFilters.push({
            title: tmpCriterio[0].trim(),
            model: tmpCriterio[1].trim(),
            closable: element.closable
          });
        }
      }
      if (element.type == 'radio') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model ? element.options.count.find(elemento =>{return elemento.value == element.options.model}).label : '',
          closable: element.closable
        });
      }
      if (element.type == 'singleCheck') {
        tmpFilters.push({
          title: element.title,
          model: element.options.model,
          closable: element.closable
        });
      }
    });

    return tmpFilters;
  },
  hiddenChipFilter(filters) {
    let temporal = '';

    filters.forEach((element) => {
      if (element.type == 'select') {
        temporal += element.options.model;
      }
      if (element.type == 'select' && element.multiple) {
        temporal += element.options.model;
      }
      if (element.type == 'date') {
        temporal += element.options.model;
      }
      if (element.type == 'dateRange') {
        temporal += element.options.model;
      }
      if (element.type == 'tree') {
        temporal += element.options.model;
      }
      if (element.type == 'number') {
        temporal += element.options.model;
      }
      if (element.type == 'numberRange') {
        temporal += element.options.model;
      }
      if (element.type == 'text') {
        temporal += element.options.model;
      }
      if (element.type == 'check') {
        temporal += element.options.model;
      }
      if (element.type == 'criterio') {
        temporal += element.options.model;
      }
      if (element.type == 'radio') {
        temporal += element.options.model;
      }
      if (element.type == 'singleCheck') {
        temporal += element.options.model;
      }
      if (element.type == 'popUp') {
        element.options.options.forEach((el) => {
          temporal += el.model;
        });
      }
      if (element.type == 'treePopUp') {
        element.options.optionsPopUp.forEach((el) => {
          temporal += el.model;
        });
      }
      if (element.type == 'selectGroup') {
        element.options.options.forEach((el) => {
          temporal += el.model;
        });
      }
    });

    return temporal == '';
  },
  mapFilters(filters) {
    let body = {};

    filters.forEach((element) => {
      if (element.type == 'select') {
        body[element.alias] = element.options.model.id ? element.options.model.id : '';
      }
      if (element.type == 'select' && element.multiple) {
        let arrayTmpId = [];
        let arrayTmpDescripcion = [];

        if (element.options.values.length < 1) {
          body[element.alias] = {
            id: '',
            descripcion: ''
          };
          return;
        }
        element.options.values.forEach((select) => {
          arrayTmpId.push(select.id);
          arrayTmpDescripcion.push(select.label);
        });

        body[element.alias] = {
          id: arrayTmpId.length > 0 ? arrayTmpId.join(',') : '',
          descripcion: arrayTmpDescripcion.length > 0 ? arrayTmpDescripcion.join(',') : ''
        };
      }
      if (element.type == 'popUp') {
        element.options.options.forEach((e) => {
          body[e.alias] = e.tipo=='texto' ? e.values ? e.values : '' : e.model ? e.model : '';
        });
      }
      if (element.type == 'treePopUp') {
        element.options.optionsPopUp.forEach((e) => {
          body[e.alias] = e.tipo=='texto' ? e.values ? e.values : '' : e.model ? e.model : '';
        });
      }
      if (element.type == 'selectGroup') {
        element.options.options.forEach((e) => {
          if (e.multiple) {
            let arrayTmpId = [];
            let arrayTmpDescripcion = [];

            if (e.values.length < 1) {
              body[e.alias] = {
                id: '',
                descripcion: ''
              };
              return;
            }
            e.values.forEach((select) => {
              arrayTmpId.push(select.id);
              arrayTmpDescripcion.push(select.label);
            });

            body[element.alias] = {
              id: arrayTmpId.length > 0 ? arrayTmpId.join(',') : '',
              descripcion: arrayTmpDescripcion.length > 0 ? arrayTmpDescripcion.join(',') : ''
            };
          } else {
            body[e.alias] = e.values != '' && e.values != null ? e.values.id : '';
          }
        });
      }
      if (element.type == 'text') {
        body[element.alias] = element.options.model ? element.options.model : '';
      }
      if (element.type == 'tree') {
        body[element.alias] = element.options.value ? element.options.value : '';
      }
      if (element.type == 'number') {
        body[element.alias] = element.options.model ? element.options.model : '';
      }
      if (element.type == 'numberRange') {
        body[element.alias] = {
          desde: element.options.options[0].model ? element.options.options[0].model : '',
          hasta: element.options.options[1].model ? element.options.options[1].model : '',
        };
      }
      if (element.type == 'date') {
        body[element.alias] = element.options.model ? element.options.model : '';
      }
      if (element.type == 'dateRange') {
        if( element.hora ){
          body[element.alias] = {
            desde: element.options.options[0].model ? element.options.options[0].model + (element.options.options[0].valueHora ?  ' '+element.options.options[0].valueHora : ' 00:00:00') : '',
            hasta: element.options.options[1].model ? element.options.options[1].model + (element.options.options[1].valueHora ?  ' '+element.options.options[1].valueHora : ' 23:59:59') : '',
          };
        }else{
          body[element.alias] = {
            desde: element.options.options[0].model ? element.options.options[0].model : '',
            hasta: element.options.options[1].model ? element.options.options[1].model : '',
          };
        }
      }
      if (element.type == 'check') {
        body[element.alias] = element.options.value ? element.options.value : '';
      }
      if (element.type == 'radio') {
        body[element.alias] = element.options.value ? element.options.value : '';
      }
      if (element.type == 'singleCheck') {
        body[element.alias] = element.options.model ? element.options.model : '';
      }
      if (element.type == 'criterio') {
        element.options.criterio_multiple.forEach((cmultiple) => {
          if (cmultiple.index == 0) {
            body[`${element.alias}${cmultiple.index}`] = {};

            cmultiple.options.forEach((option) => {
              if (cmultiple.selectChild.id == option.id) body[`${element.alias}${cmultiple.index}`][`${option.id}`] = cmultiple.inputChild;
              else body[`${element.alias}${cmultiple.index}`][`${option.id}`] = '';
            });
          } else if (cmultiple.index == element.options.size_criterio_multiple - 1) {
            body[`${element.alias}${cmultiple.index}`] = {};

            cmultiple.options.forEach((option) => {
              if (cmultiple.selectChild.id == option.id) body[`${element.alias}${cmultiple.index}`][`${option.id}`] = cmultiple.inputChild;
              else body[`${element.alias}${cmultiple.index}`][`${option.id}`] = '';
            });
          } else {
            body[`${element.alias}${cmultiple.index}`] = {};

            cmultiple.options.forEach((option) => {
              if (cmultiple.selectChild.id == option.id) body[`${element.alias}${cmultiple.index}`][`${option.id}`] = cmultiple.inputChild;
              else body[`${element.alias}${cmultiple.index}`][`${option.id}`] = '';
            });
          }
        });
      }
    });

    return body;
  },
  loaderFilters(filters) {
    filters.forEach((element) => {
      if (element.type == 'criterio') {
        // DESDE AQUI ESTA EL CRITERIO MULTIPLE PERO SE E PENSADO PASAR ESO A UNA FUNCION INDEPENDIENTE

        for (let index = 0; index < element.options.size_criterio_multiple; index++) {
          element.options.criterio_multiple.push({
            index: index,

            options: [...element.options.options],

            showInput: false, // esto es el input de cada criterio
            visible: index == 0 ? true : false, // esto es toda la seccion de criterio
            add: index == 0 ? true : false, // esto es lo del boton

            modelChild: '',
            selectChild: '',
            inputChild: '',
            radio: `and-${index}`,
            radio_and: `and-${index}`,
            radio_or: `or-${index}`,
            
            placeholder: element.options.placeholder
          });
        }
      }
    });

    return filters;
  },

  loaderActions(filters) {
    //console.log(filters);
    /*
    filters.forEach((element) => {
      if (element.type == 'select' && element.action) {
      }
      if (element.type == 'date' && element.action) {
      }
      if (element.type == 'number' && element.action) {
      }
      if (element.type == 'text' && element.action) {
      }
      if (element.type == 'check' && element.action) {
      }
      if (element.type == 'criterio' && element.action) {
      }
      if (element.type == 'radio' && element.action) {
      }
      if (element.type == 'singleCheck' && element.action) {
      }
    })
    return filters
    */
  },

  countFiltersValues(filters) {
    let count = 0;

    filters.forEach((element) => {
      if (element.type == 'select') {
        if (element.options.model != '') count++;
      }
      if (element.type == 'text') {
        if (element.options.model != '') count++;
      }
      if (element.type == 'check') {
        if (element.options.model != '') count++;
      }
      if (element.type == 'criterio') {
        if (element.options.input != '' && element.options.select != '' && element.options.model != '') count++;
      }
    });
    return count;
  },
  // PARA LA COMPARACION DEL LOS VALORES DEL POPUP SE REALIZA UN FILTER
  filterValuesPopUp(values, valuePopup, property) {
    let arrTmp = [];

    let arrValues = valuePopup.split(',').filter((e) => e != '');

    arrValues.forEach((e) => {
      let val = values.filter((val) => val[property] === e);

      if (val.length > 0) arrTmp.push(val[0]);
    });

    return arrTmp;
  },

  insertDataSelectFilter(filter, alias, options, model = '') {
    filter.map((e) => {
      if (e.alias === alias) {
        if (e.multiple) {
          e.options.model = model == '' ? '' : [model].map((e) => e.label).join(',');
          e.options.values = model == '' ? [] : [model];
          e.options.options = options;
        } else {
          e.options.values = model;
          e.options.options = options;
        }
        return e;
      }
    });
    return filter;
  },

  insertNumberRangeFilter(filter, alias, modelInicio = '', modelFin = ''){
    filter.map((e) => {
      if (e.alias === alias) {
        e.options.options[0].model = modelInicio;
        e.options.options[1].model = modelFin;
        let NumeroInicio = modelInicio ? modelInicio : '...';
        let NumeroFin = modelFin ? modelFin : '...';
        let total = `${e.options.options[0].title} ${NumeroInicio} - ${e.options.options[1].title} ${NumeroFin}`
        e.options.model = (modelInicio || modelFin) ? total : '';
        return e;
      }
    });
    return filter;
  },

  insertDateRangeFilter(filter, alias, modelInicio = null, modelFin = null) {
    filter.map((e) => {
      if (e.alias === alias) {
        e.options.options[0].model = modelInicio ? this.convertirFecha(modelInicio) : '';
        e.options.options[0].value = modelInicio;
        e.options.options[1].model = modelFin ? this.convertirFecha(modelFin) : '';
        e.options.options[1].value = modelFin;
        let fechaInicio = modelInicio ? this.convertirFecha(modelInicio) : '--/--/--';
        let fechaFin = modelFin ? this.convertirFecha(modelFin) : '--/--/--';
        let total = `${e.options.options[0].title} ${fechaInicio} - ${e.options.options[1].title} ${fechaFin}`
        e.options.model = (modelInicio || modelFin) ? total : '';
        return e;
      }
    });
    return filter;
  },
  
  /* convertDate(date) {
    let tmpDate = new Date(date)
      .toLocaleString()
      .split(' ')[0]
      .split('/');
    for (let index = 0; index < tmpDate.length; index++) {
      tmpDate[index] = tmpDate[index].padStart(2, '0');
    }
    return tmpDate.join('/');
  }, */

  completarFecha(fecha, separador = '/'){
    let array_partes = fecha.split(separador);
    if(array_partes.length == 3){
      let d = array_partes[0];
      let m = array_partes[1];
      let y = array_partes[2];
      if(d.length && d.length==1) d = '0'+d;
      if(m.length && m.length==1) m = '0'+m;
      return `${d}${separador}${m}${separador}${y}`;
    }else{
      console.error('El formato de fecha no es correcto');
    }
  },

  convertirFechaLocal(date){
    if(date){
      let newDate = new Date(date);
      let fecha = this.completarFecha(newDate.toLocaleDateString());
      let hora =  newDate.toLocaleTimeString();
      return fecha+', '+hora
    }else{
      return ''
    }
  },

  // VALIDAR EMAIL Y DIRECCIONES WEB
  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return regex.test(email);
  },

  validateUrl(url) {
    const regex = /(https|http)\:\/\/|([a-z0-9A-Z]+\.[a-z0-9A-Z]+\.[a-zA-Z]{2,4})|([a-z0-9A-Z]+\.[a-zA-Z]{2,4})|\?([a-zA-Z0-9]+[\&\=\#az]+)/i;
    return regex.test(url);
  },
  
  decimalAdjust(type, value, exp) {
    // Si el exp no está definido o es cero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Si el valor no es un número o el exp no es un entero...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  
};
