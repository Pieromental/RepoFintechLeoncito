<template lang="html">
  <div :class="[{ stripe: stripe, hoverFlat: hoverFlat }, `vs-table-${color}`]" class="vs-component vs-con-table">
    <!-- header -->
    <div
      v-if="headerTable"
      class="vs-align-items nav-table px-3 py-1"
      :class="[
        { 'vs-justify-space-between': !breakpoint || !showSearchInput },
        { 'vs-justify-flex-end': breakpoint || showSearchInput },
        { 'nav-vxtable-sticky': headerSticky },
        { popup: classPopup }
      ]"
    >
      <div v-if="!breakpoint || !showSearchInput">
        <span v-if="isValueLength" :class="[{ 'font-title': !breakpointFont }, { 'font-label': breakpointFont }]" style="color:white;">
          {{ `${value.length} ${value.length == 1 ? $t('registro seleccionado') : $t('registros seleccionados')} ` }}
        </span>
        <span v-else class="font-title" style="color:white;">
          {{ $t(title) }}
        </span>
      </div>
      <div class="vs-justify-center">
        <div class="vs-justify-center">
          <vs-button
            v-if="btnImportar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-upload-cloud"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="evntImportar"
          >
            <span class="font-label md:block hidden">{{ $t(nameButtonImport) }}</span>
          </vs-button>

          <vs-button
            v-if="btnExportar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-download-cloud"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="evntExportar"
          >
            <span class="font-label md:block hidden">{{ $t(nameButtonExport) }}</span>
          </vs-button>

          <vs-button
            v-if="btnRetirar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-minus"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="evntRetirar"
          >
            <span class="font-label md:block hidden">{{ $t(nameButtonRetirar) }}</span>
          </vs-button>


          <vs-button
            v-if="btnPopup"
            class="button-line-none"
            :class="{ rotate180: !isContentCollapsed }"
            icon-pack="feather"
            icon="icon-plus"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="popup"
            :disabled="disabledButtonAdd"
          >
            <span class="font-label md:block hidden">{{ $t(nameButtonAdd) }}</span>
          </vs-button>

          <vs-button
            v-if="isContentCollapsed && !btnPopup && btnAgregar"
            class="button-line-none"
            :class="{ rotate180: !isContentCollapsed }"
            icon-pack="feather"
            icon="icon-plus"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="toggleContent();toggle();"
            :disabled="disabledButtonAdd"
          >
            <span class="font-label md:block hidden">{{ $t(nameButtonAdd) }}</span>
          </vs-button>

          <vs-button
            v-if="btnInsertar"
            v-shortkey="['alt', 'i']"
            @shortkey="insertRow"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-plus"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="insertRow"
          >
            <div :style="{ display: 'flex' }">
              <span class="font-label md:block hidden underline">{{ $t('Insertar').charAt(0) }}</span>
              <span class="font-label md:block hidden">{{ $t('Insertar').substring(1, $t('Insertar').length) }}</span>
            </div>
          </vs-button>

          <vs-button
            v-if="btnPopupInsertar"
            v-shortkey="['alt', 'i']"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-plus"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('popupInsertar')"
          >
            <div :style="{ display: 'flex' }">
              <span class="font-label md:block hidden underline">{{ $t('Insertar').charAt(0) }}</span>
              <span class="font-label md:block hidden">{{ $t('Insertar').substring(1, $t('Insertar').length) }}</span>
            </div>
          </vs-button>

           <vs-button
            v-if="isValueLength && btnAnular"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-trash"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('cancelRows')"
          >
            <span class="font-label md:block hidden">{{ $t('Anular') }}</span>
          </vs-button>

           <vs-button
            v-if="isValueLength && btnCerrar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-trash"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('closeRows')"
          >
            <span class="font-label md:block hidden">{{ $t('Cerrar') }}</span>
          </vs-button>

           <vs-button
            v-if="isValueLength && btnConfirmar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-trash"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('confirmRows')"
          >
            <span class="font-label md:block hidden">{{ $t('Confirmar') }}</span>
          </vs-button>

           <vs-button
            v-if="isValueLength && btnRechazar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-trash"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('rejectRows')"
          >
            <span class="font-label md:block hidden">{{ $t('Rechazar') }}</span>
          </vs-button>

           <vs-button
            v-if="isValueLength && btnRetornar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-trash"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('returnRows')"
          >
            <span class="font-label md:block hidden">{{ $t('Retornar') }}</span>
          </vs-button>

          <vs-button
            v-if="isValueLength && btnEliminar"
            class="button-line-none"
            icon-pack="feather"
            icon="icon-trash"
            icon-before
            size="small"
            color="white"
            type="line"
            @click="$emit('removeRows')"
          >
            <span class="font-label md:block hidden">{{ $t('Eliminar') }}</span>
          </vs-button>
        </div>
        <div v-if="(!breakpoint || showSearchInput) && searchNavbar" class="vs-align-items">
          <vs-input class="font-label" style="display: contents;" size="small" :placeholder="$t('Buscar')" v-model="searchx" />
        </div>

        <div v-if="breakpoint || isValueLength" class="vs-align-items">
          <vs-dropdown vs-custom-content vs-trigger-click style="top2px;cursor:pointer">
            <!--<a class="flex items-center" href.prevent>-->
            <feather-icon v-if="btnOption" icon="MoreVerticalIcon" :title="$t('Más Opciones')" @click="toggleContent" style="color:white;cursor:pointer"></feather-icon>
            <!--</a>-->
            <vs-dropdown-menu class="dropdown-login">
              <vs-dropdown-item v-if="breakpoint" @click.prevent="searchInput" class="eyebuscar">
                <feather-icon class="style-eyebuscar" :icon="showSearchInput ? 'EyeOffIcon' : 'EyeIcon'"></feather-icon>
                <span> {{ $t('Buscar') }} </span>
              </vs-dropdown-item>
              <vs-dropdown-item v-if="isValueLength" @click.prevent="$emit('activeRows')">
                {{ $t('Activar') }}
              </vs-dropdown-item>
              <vs-dropdown-item v-if="isValueLength" @click.prevent="$emit('deactivateRows')">
                {{ $t('Desactivar') }}
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>
    </div>

    <div
      v-if="headerTable"
      :class="[{ 'nav-vxtable-th-sticky': isContentCollapsed && headerSticky }, { 'nav-vxtable-container-sticky': !isContentCollapsed && headerSticky }, { popup: classPopup }]"
    >
      <div
        class="vx-card__collapsible-content vs-con-loading__container"
        ref="content"
        :class="[{ collapsed: isContentCollapsed }, { 'overflow-hidden': tempHidden }]"
        :style="StyleItems"
        style="background:white"
      >
        <vx-card
          ref="contentCard"
          :style="StyleItems"
          class="card-style-collapse"
          :class="[{ 'py-3': !isContentCollapsed }, { 'px-3': !isContentCollapsed }]"
          :title="titleContainer"
          close-content-action
          @closeCard="closeContent"
        >
          <slot name="container"></slot>
        </vx-card>
      </div>

      <div v-if="headerSticky" :id="idRef" class="vs-con-tbody vs-table--tbody" style="overflow:hidden;">
        <table class="vs-table vs-table--tbody-table" :class="{ 'table-max-content': maxContent, 'table-width ': !cmpWidth }">
          <thead ref="thead" class="vs-table--thead">
            <tr id="theadclone">
              <th v-if="multiple || hasExpadableData" class="td-check row-sticky-th" :style="{ width: '31px' }" :rowspan="2">
                <span v-if="multiple" class="con-td-check">
                  <vs-checkbox :icon="isCheckedLine ? 'remove' : 'check'" :checked="isCheckedMultiple" size="small" @input="changeCheckedMultiple()" @change=""/>
                </span>
              </th>
              <slot name="thead"></slot>
            </tr>
            <slot name="mhead"></slot>
          </thead>
        </table>
      </div>
    </div>

    <div v-else-if="searchSticky" :class="searchSticky ?  searchPosition ? '' : searchPopup ? 'search-popup-vxtable-th-sticky':'search-vxtable-th-sticky' : ''">
      <header class="header-table vs-table--header search-header">
        <slot name="header"></slot>
        <div v-if="search" class="con-input-search vs-table--search">
          <input v-model="searchx" class="input-search vs-table--search-input" type="text" />
          <vs-icon icon="search"></vs-icon>
        </div>
      </header>

      <div :id="idRef" class="vs-con-tbody vs-table--tbody" style="overflow:hidden;">
        <table class="vs-table vs-table--tbody-table" :class="{ 'table-max-content': maxContent, 'table-width ': !cmpWidth }">
          <thead ref="thead" class="vs-table--thead">
            <tr id="theadclone">
              <th v-if="multiple || hasExpadableData" class="td-check row-sticky-th" :style="{ width: '31px' }" :rowspan="'2'">
                <span v-if="multiple" class="con-td-check">
                  <vs-checkbox :icon="isCheckedLine ? 'remove' : 'check'" :checked="isCheckedMultiple" size="small" @input="changeCheckedMultiple()" />
                </span>
              </th>
              <slot name="thead"></slot>
            </tr>
            <slot name="mhead"></slot>
          </thead>
          <slot name="tfooter"></slot>
        </table>
      </div>
    </div>

    <div v-else-if="headerMultiple" :class="[{ 'search-vxtable-th-sticky': headerMultiple }]">
      <header class="header-table vs-table--header search-header">
        <slot name="header"></slot>
        <div v-if="search" class="con-input-search vs-table--search">
          <input v-model="searchx" class="input-search vs-table--search-input" type="text" />
          <vs-icon icon="search"></vs-icon>
        </div>
      </header>

      <div :id="idRef" class="vs-con-tbody vs-table--tbody" style="overflow:hidden;">
        <table class="vs-table vs-table--tbody-table" :class="{ 'table-max-content': maxContent, 'table-width ': !cmpWidth }">
          <thead ref="thead" class="vs-table--thead">
            <tr id="theadclone">
              <th v-if="multiple || hasExpadableData" class="td-check row-sticky-th" :style="{ width: '31px' }" :rowspan="rowspan">
                <span v-if="multiple" class="con-td-check">
                  <vs-checkbox :icon="isCheckedLine ? 'remove' : 'check'" :checked="isCheckedMultiple" size="small" @input="changeCheckedMultiple()" />
                </span>
              </th>
              <slot name="thead"></slot>
            </tr>
            <slot name="mhead"></slot>
          </thead>
          <slot name="tfooter"></slot>
        </table>
      </div>
    </div>

    <div v-if="search && tab">
      <header class="header-table vs-table--header search-header">
        <slot name="header"></slot>
        <div v-if="search" class="con-input-search vs-table--search">
          <input v-model="searchx" class="input-search vs-table--search-input" type="text" />
          <vs-icon icon="search"></vs-icon>
        </div>
      </header>
    </div>

    <div class="con-tablex vs-table--content">
      <div :id="`${idRef}refScroll`" :style="styleConTbody" class="vs-con-tbody vs-table--tbody">
        <table id="tablex" ref="table" class="vs-table vs-table--tbody-table" :class="{ 'table-max-content': maxContent, 'table-width ': !cmpWidth }">
          <thead ref="thead" class="vs-table--thead" :class="[{ 'visibility-collapse': headerSticky || searchSticky || headerMultiple }]">
            <tr id="trHead">
              <th v-if="multiple || hasExpadableData" :class="['td-check', { 'row-sticky-th': thSticky }]" :style="{ width: '31px' }" :rowspan="rowspan">
                <span v-if="multiple" class="con-td-check">
                  <vs-checkbox :icon="isCheckedLine ? 'remove' : 'check'" :checked="isCheckedMultiple" size="small" @input="changeCheckedMultiple()" @change="checkedMultiple()" />
                </span>
              </th>
              <slot name="thead"></slot>
            </tr>
            <slot name="mhead"></slot>
          </thead>
          <!--
          <colgroup ref="colgrouptable">
            <col width="20"/>
            <col
              v-for="(col,index) in 3"
              :key="index"
              :name="`col-${index}`" >
          </colgroup>
          -->
          <!-- <tbody ref="tbody"> -->
          <slot :data="datax"></slot>
          <slot name="tfooter"></slot>
          <!-- </tbody> -->
        </table>
      </div>
      <div v-if="isNoData" class="not-data-table vs-table--not-data">
        {{ noDataText }}
      </div>
      <div class="sm:flex" style="margin-right: 1rem;">
        <slot name="subtotal" :range="{min:min, max:max}"></slot>
      </div>
      <div class="sm:flex">
        <div class="mt-4 w-full sm:w-1/2" :style="{ 'align-items': 'center', display: 'flex' }">
          <vx-rows-page v-if="rowsPage" :rows="arrayRows" @valMaxItems="valMax" :length="data.length" :max="max" :min="min"></vx-rows-page>
        </div>
        <div v-if="pagination" class="w-full sm:w-1/2 vs-table--pagination">
          <vx-pagination :total="searchx ? getTotalPagesSearch : getTotalPages" v-model="currentx"></vx-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VxTable',
  props: {
    structRows: {
      type: Object,
      default: () => {}
    },
    inline: {
      type: Boolean,
      default: false
    },
    searchSticky: {
      type: Boolean,
      default: false
    },
    searchPosition: {
      type: Boolean,
      default: false
    },
    searchPopup: {
      type: Boolean,
      default: false
    },
    idRef: {
      type: String,
      default: 'refThead'
    },
    nameButtonAdd:{
      type: String,
      default: 'Agregar'
    },
    nameButtonExport:{
      type: String,
      default: 'Exportar'
    },
    nameButtonRetirar:{
      type: String,
      default: 'Retirar'
    },
    nameButtonImport:{
      type: String,
      default: 'Importar'
    },
    disabledButtonAdd: {
      type: Boolean,
      default: false
    },
    classPopup: {
      type: Boolean,
      default: false
    },
    headerTable: {
      type: Boolean,
      default: false
    },
    headerMultiple: {
      type: Boolean,
      default: false
    },
    maxContent: {
      type: Boolean,
      default: false
    },
    title: {
      default: 'Title',
      type: String
    },
    titleContainer: {
      default: 'Title Container',
      type: String
    },
    btnPopup: {
      type: Boolean,
      default: false
    },
    btnImportar: {
      type: Boolean,
      default: false
    },
    btnExportar: {
      type: Boolean,
      default: false
    },
    btnRetirar: {
      type: Boolean,
      default: false
    },
    btnEliminar: {
      type: Boolean,
      default: true
    },
    btnAgregar: {
      type: Boolean,
      default: true
    },
    btnInsertar: {
      type: Boolean,
      default: false
    },
    btnPopupInsertar: {
      type: Boolean,
      default: false
    },
    btnAnular: {
      type: Boolean,
      default: false
    },
    btnCerrar: {
      type: Boolean,
      default: false
    },
    btnConfirmar: {
      type: Boolean,
      default: false
    },
    btnRechazar: {
      type: Boolean,
      default: false
    },
    btnRetornar: {
      type: Boolean,
      default: false
    },
    btnOption:{
      type: Boolean,
      default: true
    },
    tab: {
      type: Boolean,
      default: false
    },
    thSticky: {
      type: Boolean,
      default: true
    },
    headerSticky: {
      type: Boolean,
      default: false
    },
    value: {},
    color: {
      default: 'primary',
      type: String
    },
    noDataText: {
      default: 'No data Available',
      type: String
    },
    stripe: {
      default: false,
      type: Boolean
    },
    hoverFlat: {
      default: false,
      type: Boolean
    },
    maxHeight: {
      default: 'auto',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    data: {
      default: null
    },
    notSpacer: {
      default: false,
      type: Boolean
    },
    rowsPage: {
      default: false,
      type: Boolean
    },
    arrayRows: {
      type: Array
    },
    indexArray: {
      type: Number,
      default: 1
    },
    maxItems: {
      type: [Number, String],
      default: 5
    },
    search: {
      default: false,
      type: Boolean
    },
    searchNavbar: {
      default: true,
      type: Boolean
    },
    pagination: {
      default: false,
      type: Boolean
    },
    currentPage: {
      default: 1,
      type: Number | String
    }
  },
  data: () => ({
    showSearchInput: true,
    maxHeightContainer: null,
    tempHidden: false,
    isContentCollapsed: false,
    headerWidth: '100%',
    trs: [],
    datax: [],
    searchx: null,
    currentx: 1,
    hasExpadableData: false,
    maxItemsX: 1,
    max: 0,
    min: 0,
    scroll: null,
    width: false,
    rowspan: 10,
    readonlytd: false,
    tabIndex: 0
  }),
  computed: {
    cmpWidth() {
      this.width = this.maxContent ? true : false;
      return this.maxContent;
    },
    breakpoint() {
      if (this.$store.state.windowWidth < 550) {
        this.showSearchInput = false;
        return true;
      }
      this.showSearchInput = true;
      return false;
    },
    breakpointFont() {
      if (this.$store.state.windowWidth < 700) return true;
      return false;
    },
    isValueLength() {
      console.log('---', this.value);
      return this.value.length > 0;
    },
    StyleItems() {
      return { maxHeight: this.maxHeightContainer };
    },
    getTotalPages() {
      return Math.ceil(this.data.length / this.maxItemsX);
    },
    getTotalPagesSearch() {
      let dataBase = this.data;
      let filterx = dataBase.filter((tr) => {
        let values = this.getValues(tr)
          .toString()
          .toLowerCase();
        return values.indexOf(this.searchx.toLowerCase()) != -1;
      });
      return Math.ceil(filterx.length / this.maxItemsX);
    },
    isNoData() {
      if (typeof this.datax == Object) {
        return this.datax ? Object.keys(this.datax).length == 0 : false && this.search;
      } else {
        return this.datax ? this.datax.length == 0 : false && this.search;
      }
    },
    isCheckedLine() {
      let lengthx = this.data.length;
      let lengthSelected = this.value.length;
      return lengthx !== lengthSelected;
    },
    isCheckedMultiple() {
      return this.value.length > 0;
    },
    styleConTbody() {
      return {
        maxHeight: this.maxHeight,
        overflow: this.maxHeight != 'auto' ? 'auto' : null
      };
    },
    getThs() {
      let ths = this.$slots.thead.filter((item) => item.tag);
      return ths.length;
    },
    tableHeaderStyle() {
      return {
        width: this.headerWidth
      };
    }
  },
  watch: {
    currentPage() {
      this.currentx = this.currentPage;
    },
    currentx() {
      this.loadData();
    },
    maxItemsX() {
      this.loadData();
      this.currentx = 1;
    },
    data() {
      // console.log(this.data)
      this.loadData();
      //this.currentx = 1
      this.$nextTick(() => {
        if (this.datax.length > 0) {
          this.changeTdsWidth();
        }
      });
    },
    searchx() {
      this.loadData();
      this.currentx = 1;
    }
  },
  mounted() {
    if (this.rowsPage)
      if (this.indexArray <= this.arrayRows.length) this.maxItemsX = this.arrayRows[this.indexArray - 1];
      else this.maxItemsX = this.arrayRows[0];
    else this.maxItemsX = this.maxItems;
    window.addEventListener('resize', this.listenerChangeWidth);
    this.loadData();
    if (this.headerTable) this.toggleContent();

    this.scroll = document.getElementById(`${this.idRef}refScroll`);
    this.scroll.addEventListener('scroll', this.refScroll);

    /* ESTA SECCIÓN ES PARA VER LO DE LA CABECERA */
    /*
    let tHeadWidthAux = document.getElementById("trHead")
    tHeadWidthAux.addEventListener("change", this.resizeThHead)
    let tHeadWidthClone = document.getElementById("theadclone")
    console.log(tHeadWidthAux)
    tHeadWidthAux.childNodes.forEach( (elementNode, index) => {
      console.group("tr")
      console.log(index)
      console.log(elementNode)
      console.log(elementNode.style.width, elementNode.offsetHeight)
      console.log('-> ',tHeadWidthClone.childNodes[index])
      //tHeadWidthClone.childNodes[index].style.minWidth = elementNode.offsetWidth
      //tHeadWidthClone.childNodes[index].style.minHeight = elementNode.offsetHeight
      console.log(tHeadWidthClone.childNodes[index].style, tHeadWidthClone.childNodes[index].style)
      console.groupEnd("tr")
    })
    */
    // this.$nextTick(() => {
    //   if(this.datax.length > 0) {
    //     this.changeTdsWidth()
    //   }
    // })
  },
  destroyed() {
    window.removeEventListener('resize', this.listenerChangeWidth);
    this.scroll.removeEventListener('scroll', this.refScroll);
  },
  methods: {
    refScroll(event) {
      const thead = document.getElementById(this.idRef);
      if (thead) {
        thead.scrollLeft = event.srcElement.scrollLeft;
      }
    },
    errorTable(val) {
      this.$emit('errorTable', val);
    },
    popup() {
      this.$emit('popupAgregar');
    },
    evntImportar() {
      this.$emit('eventImportar');
    },
    evntExportar() {
      this.$emit('evntExportar');
    },
    evntRetirar(){
      this.$emit('evntRetirar');
    },
    insertRow() {
      console.log('Se ha insertado la celda');

      const keys = Object.keys(this.structRows),
        object = {};
      let empty = [];

      keys.forEach((el) => {
        object[el] = this.structRows[el].value;
        if (this.structRows[el].hasOwnProperty('empty')) {
          empty.push(el);
        }
      });

      if (this.data.filter((el) => el[empty[0]] == '').length < 1) {
        this.data.push(object);
        this.data.map((el, index) => (el.idx = `t-${index + 1}`));
      } else {
        this.$emit('emptyRow', this.data[this.data.length - 1].idx);
      }

      /*
      if (this.$children[this.$children.length-1].$slots.default.length > 0) {
        this.$children[this.$children.length-1].$slots.default.forEach( ({ componentInstance } ) => {
          //console.log(componentInstance.tooltip)
          //console.log("-", componentInstance.focus)
          console.log("este es el focus", componentInstance)
          if (componentInstance.focus) {
            console.log("este es el focus")
            //componentInstance.focusInputTd()
          }
        })
      }
      */
      //console.log(this.$children[this.$children.length-1].$slots.default[1].componentInstance.$slots.default[0].componentInstance.focusOption())
    },
    searchInput() {
      this.showSearchInput = !this.showSearchInput;
    },
    openContent() {
      let scrollHeight = this.$refs.content.scrollHeight;
      this.maxHeightContainer = `${scrollHeight}px`;
      setTimeout(() => {
        this.maxHeightContainer = 'none';
        this.$refs.content.style.overflow = 'none';
        this.$refs.contentCard.$el.style.overflow = 'none';
        this.isContentCollapsed = false;
      }, 50);
    },
    closeContent() {
      let scrollHeight = this.$refs.content.scrollHeight;
      this.maxHeightContainer = `${scrollHeight}px`;
      setTimeout(() => {
        this.maxHeightContainer = `0rem`;
        this.$refs.content.style.overflow = 'none';
        this.$refs.contentCard.$el.style.overflow = 'hidden';
        this.isContentCollapsed = true;
      }, 50);
      this.$emit('closeContent');
    },
    toggleContent() {
      let scrollHeight = this.$refs.content.scrollHeight;
      if (this.maxHeightContainer == '0rem') {
        this.maxHeightContainer = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeightContainer = 'none';
          this.$refs.content.style.overflow = 'none';
          this.$refs.contentCard.$el.style.overflow = 'none';
        }, 50);
      } else {
        this.maxHeightContainer = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeightContainer = `0rem`;
          this.$refs.content.style.overflow = 'none';
          this.$refs.contentCard.$el.style.overflow = 'hidden';
        }, 50);
      }
      this.isContentCollapsed = !this.isContentCollapsed; 
      //setTimeout(() => { this.isContentCollapsed = !this.isContentCollapsed;  }, 40);
      this.$emit('swapToggle');
    },
    toggle() {
      this.$emit('toggleAgregar');
    },
    valMax(valor) {
      this.maxItemsX = valor;
    },
    loadData() {
      this.max = 0;
      this.min = 0;
      this.max = Math.ceil(this.currentx * this.maxItemsX);
      this.min = this.max - this.maxItemsX;
      if (!this.searchx) {
        this.datax = this.pagination ? this.getItems(this.min, this.max) : this.data || [];
      } else {
        this.datax = this.pagination ? this.getItemsSearch(true, this.min, this.max) : this.getItemsSearch(false, this.min, this.max) || [];
      }
    },
    getItems(min, max) {
      let items = [];
      this.data.forEach((item, index) => {
        if (index >= min && index < max) {
          items.push(item);
        }
      });
      return items;
    },
    getItemsSearch(pagination, min, max) {
      let dataBase = this.data;
      let filterx = dataBase.filter((tr) => {
        let values = this.getValues(tr)
          .toString()
          .toLowerCase();
        return values.indexOf(this.searchx.toLowerCase()) != -1;
      });
      let items = [];
      filterx.forEach((item, index) => {
        if (index >= min && index < max) {
          items.push(item);
        }
      });
      return items;
    },
    sort(key, active) {
      let datax = this.pagination ? this.data : this.datax;
      function compare(a, b) {
        if (a[key] < b[key]) return active ? 1 : -1;
        if (a[key] > b[key]) return active ? -1 : 1;
        return 0;
      }
      this.datax = datax.sort(compare);
    },
    getValues(obj) {
      let valuesx = Object.values(obj);
      let strings = [];
      function getStrings(obj) {
        if (Array.isArray(obj)) {
          strings = [...strings, ...obj];
          obj.forEach((item) => {
            getStrings(item);
          });
        } else if (typeof obj == 'object' && obj != null) {
          let subObj = Object.values(obj);
          strings = [...strings, ...subObj];
          getStrings(subObj);
        }
      }
      getStrings(valuesx);
      strings = strings.filter((item) => typeof item == 'string' || typeof item == 'number');
      return valuesx;
    },
    getStrings(obj, valuesx) {
      let stringsx = Object.values(obj);
      valuesx.forEach((item) => {
        if (item && typeof item == 'object') {
          valuesx = [...valuesx, ...Object.values(item)];
        }
      });
      // return [...valuesx,...Object.values(item)]
      return stringsx;
    },
    changeCheckedMultiple() {
      console.log('Este es el check');
      let lengthx = this.data.length;
      let lengthSelected = this.value.length;
      let selectedx = lengthx - lengthSelected;
      if (selectedx == 0) {
        this.$emit('input', []);
      } else {
        this.$emit('input', this.data);
      }
    },

    checkedMultiple(){
      this.$emit('inputCheckedMultiple', this.value.length == 0 ? true : false);
    },
    clicktr(tr, isTr) {
      if (this.multiple && isTr) {
        let val = this.value.slice(0);
        if (val.includes(tr)) {
          val.splice(val.indexOf(tr), 1);
        } else {
          val.push(tr);
        }
        this.$emit('input', val);
        this.$emit('selected', tr);
      } else if (isTr) {
        this.$emit('input', tr);
        this.$emit('selected', tr);
      }
    },
    dblclicktr(tr, isTr) {
      if (isTr) {
        this.$emit('dblClick', tr);
      }
    },
    listenerChangeWidth() {
      this.headerWidth = `${this.$refs.table.offsetWidth}px`;
      this.changeTdsWidth();
    },
    changeTdsWidth() {
      if (!this.value) return;
      let tbody = this.$refs.table.querySelector('tbody');
      // Adding condition removes querySelector none error - if tbody isnot present
      if (tbody) {
        let trvs = tbody.querySelector('.tr-values');
        let tds = trvs ? trvs.querySelectorAll('.td') : [];
        let tdsx = [];
        tds.forEach((td, index) => {
          tdsx.push({ index: index, widthx: td.offsetWidth });
        });
        let colgrouptable = this.$refs.colgrouptable || null;
        let colsTable = colgrouptable ? colgrouptable.querySelectorAll('.col') : [];
        if (colsTable.length) {
          colsTable.forEach((col, index) => {
            col.setAttribute('width', tdsx[index].widthx);
          });
        }
      }
    }
  }
};
</script>
<style>
.eyebuscar .vs-dropdown--item-link {
  display: flex;
  align-items: center;
}
.style-eyebuscar {
  height: 16px !important;
  width: 16px !important;
  margin: 0px 5px 0px 0px;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  color: gray;
}
.eyebuscar:hover .style-eyebuscar {
  color: rgba(var(--vs-primary), 1) !important;
}
.nav-vxtable-container-sticky-index {
  z-index: 01;
}
.overflow-hidden {
  overflow: hidden;
}
</style>
