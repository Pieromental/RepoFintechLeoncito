<template lang="pug">
  vs-row.mt-3(vs-w="12")
    vs-col(v-if="!view" vs-align="center" vs-lg="5" vs-sm="5" vs-xs="5")
      vue-ads-table-tree.style-tree-table(
        ref="treeTableOrigin"
        @keydown.enter="algo"
        :columns="columnsOrigin" 
        :rows="rowsOrigin" 
        class="table-border" 
        :filter="filterOrigin"
        @filter-change="filterChangedOrigin"
        :call-rows="callRows"
        :call-children  ="callChildren"
        :call-temp-rows="callTempRows"
      )
      
        template(slot="check" slot-scope="props")
          vs-checkbox.font-label(v-if="props.row.final && !props.row.estadoSelect && props.row.estado " v-model="props.row.checked" @input="checkFunctionRef(props.row)")

        template(slot="codigo" slot-scope="props")
          span(:class="[{'color-danger': !props.row.estado}]") {{ props.row.codigo }}

        template(slot="descripcion" slot-scope="props")
          span(:class="[{'color-danger': !props.row.estado}]") {{ props.row.descripcion }}

        template(slot="bottom")
          | {{''}}

    vs-col(v-if="!view" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="2" vs-xs="2")
      .w-full.vs-justify-center.my-3
        vs-button.btn.btn-primary.font-label(@click="assignSelected" size="small") >>
      .w-full.vs-justify-center.my-3
        vs-button.btn.btn-primary.font-label(@click="assignSelectedReverse" size="small") <<

    vs-col(vs-align="center" :vs-lg="view ? 12 : 5" :vs-sm="view ? 12 : 5" :vs-xs="view ? 12 : 5")
      vue-ads-table-tree.style-tree-table.tree-table-destiny( 
        :columns="columnsDestiny" 
        :rows="rowsDestiny" 
        class="table-border" 
        :filter="filterDestiny" 
        :page="page"
        @filter-change="filterChangedDestiny" 
      )
        template(slot="check" slot-scope="props")
          vs-checkbox.font-label(v-if="props.row.final && !view && props.row.estado" v-model="props.row.checked" @input="checkFunctionTable(props.row)")

        template(slot="codigo" slot-scope="props")
          span(:class="['no-wrap',{'color-danger': !props.row.estado}]") {{ props.row.codigo }}

        template(slot="descripcion" slot-scope="props")
          span(:class="[{'color-danger': !props.row.estado}]") {{ props.row.descripcion }}

        template(slot="bottom")
          | {{''}}

</template>

<script>
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../../../node_modules/vue-ads-table-tree/dist/vue-ads-table-tree.css';

import VueAdsTableTree from 'vue-ads-table-tree';
import request from '@/mixins/mixinRequest';

export default {
  name: 'VxTableTreeCC',
  mixins: [request],
  components: {
    VueAdsTableTree
  },
  props: {
    view: {
      type: Boolean,
      default: false
    },
    columnsOrigin: {
      type: Array,
      default: () => []
    },
    rowsOrigin: {
      type: Array,
      default: () => []
    },
    columnsDestiny: {
      type: Array,
      default: () => []
    },
    rowsDestiny: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      page: 0,
      filterOrigin: '',
      filterDestiny: '',
      selectedRef: [],
      selectedTable: [],
      childrentmp: {}
    };
  },
  methods: {
    algo() {
      alert('algo');
    },
    checkFunctionRef(val) {
      if (val.checked && val.final) {
        this.selectedRef.push({
          ...val
        });
      } else {
        this.selectedRef.forEach((el, index) => {
          if (val.codigo.trim() === el.codigo.trim()) this.selectedRef.splice(index, 1);
        });
      }
    },
    checkFunctionTable(val) {
      if (val.checked && val.final) {
        this.selectedTable.push({
          ...val
        });
      } else {
        this.selectedTable.forEach((el, index) => {
          if (val.codigo.trim() === el.codigo.trim()) this.selectedTable.splice(index, 1);
        });
      }
    },
    assignSelected() {
      let tmpRowsDestiny = [...this.rowsDestiny];

      for (const val of this.selectedRef) {
        for (const el of this.rowsOrigin) {
          if (this.recursiveFunction(el, val, false)) break;
        }
      }

      tmpRowsDestiny = [...tmpRowsDestiny, ...this.selectedRef];
      tmpRowsDestiny.map((el) => (el.checked = false));
      tmpRowsDestiny = this.sortData(tmpRowsDestiny);
      this.$emit('assingn', this.selectedRef);
      this.selectedRef = [];

      this.$emit('update:rowsDestiny', tmpRowsDestiny);
    },
    async assignSelectedReverse() {
      if (this.rowsOrigin.length < 1) return;

      this.childrentmp = [];

      for (let val of this.selectedTable) {
        for (let el of this.rowsOrigin) {
          if (this.recursiveFunction(el, val, true)) break;
        }
      }

      this.selectedTable.forEach((e) => {
        this.rowsDestiny.forEach((el, index) => {
          if (e.codigo === el.codigo) {
            this.rowsDestiny.splice(index, 1);
          }
        });
      });
      this.$emit('reverse', this.selectedTable);
      this.selectedTable = [];
      this.$emit('update:rowsDestiny', this.rowsDestiny);

      //this.callChildren({codigo: '10111'})
      //console.log(await this.$refs.treeTableOrigin.$props.callChildren(this.callChildren({codigo: '10111', _showChildren: true})) )
    },

    recursiveFunction(root, node, push) {
      let ref = false;
      const codigo = push ? node.referencia.trim() : node.codigo.trim();
      let profundidad = push ? node._meta.parent - 1 : node._meta.parent;

      if (push) node.checked = false;
      root._showChildren = false;

      if (root.hasOwnProperty('_children') && root._children) {
        for (let [index, el] of root._children.entries()) {
          el._showChildren = false;
          if (el.codigo.trim() === codigo && el._meta.parent === profundidad) {
            if (push) {
              el._hasChildren = true;
              el._meta.visibleChildren.push({
                ...node
              });
              this.childrentmp.push({
                parent: el.codigo,
                data: el._meta.visibleChildren
              });
              this.childrentmp = this.childrentmp.filter((el, index, array) => array.findIndex((e) => e.parent === el.parent) === index);
              el._children = [];
            } else {
              root._children.splice(index, 1);
            }
            return true;
          }
          if (el._children) ref |= this.recursiveFunction(el, node, push); // operador OR Binario
        }
      }
      return ref;
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    filterChangedOrigin(filter) {
      this.filterOrigin = filter;
    },
    filterChangedDestiny(filter) {
      this.filterDestiny = filter;
    },

    async callRows(indexesToLoad) {
      await this.sleep(1000);

      console.log('indexesToLoad', indexesToLoad);

      return indexesToLoad.map(() => {
        return {
          codigo: 'codigo prueba',
          descripcion: 'descripcion prueba'
        };
      });
    },

    async callChildren(parent) {
      console.log('este es el parent', parent);
      //await this.sleep(5000);
      let _childrens = [];
      let index = -1;

      this.childrentmp.forEach((el, i) => {
        if (parent.codigo === el.parent) {
          _childrens = [...this.sortData(this.delMeta(this.filterData(el.data, 'codigo')))];
          index = i;
        }
      });

      this.childrentmp.splice(index, 1);
      //await this.sleep(500);
      return _childrens;
    },

    async callTempRows() {
      await this.sleep(1000);
      console.log('callTempRows');
      return {
        rows: [],
        total: 0
      };
    },
    delMeta(array) {
      array.map((el) => {
        delete el._hasChildren;
        delete el._meta;
        return el;
      });
      return array;
    },
    sortData(array) {
      array.sort((a, b) => {
        if (a.codigo < b.codigo) return -1;
        else return 1;
      });
      return array;
    },
    filterData(array, property) {
      return array.filter((el, index, array) => array.findIndex((e) => e[property] === el[property]) === index);
    }
  },
  mounted() {
    document.getElementsByClassName('focus:vue-ads-shadow-form-focus').forEach((node) =>
      node.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) e.preventDefault();
      })
    );
  }
};
</script>

<style lang="scss">
.style-tree-table .vue-ads-w-full thead .vue-ads-border-b .vue-ads-border-r:first-child {
  width: 35px;
  padding-right: 0;
  padding-left: 0;
}

.style-tree-table .vue-ads-w-full tbody .vue-ads-border-b .vue-ads-border-r:first-child {
  width: 35px;
}
</style>
