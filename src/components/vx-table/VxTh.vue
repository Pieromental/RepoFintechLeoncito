<template>
  <th class="col-0 col" :colspan="colspan" :rowspan="rowspan" :style="compStyle">
    <div class="vs-table-text" :class="[{ center: center }]">
      <span v-if="sortKey" class="sort-vxth">
        <i class="material-icons up-sort" style="font-size: 12px" :class="[{ 'clbg-primary': orderAsc }]" @click="sortValue(false)">expand_less</i>
        <i class="material-icons down-sort" style="font-size: 12px" :class="[{ 'clbg-primary': orderDesc }]" @click="sortValue(true)">expand_more</i>
      </span>
      <span class="vs-table-text" :class="[{ 'color-primary': orderAsc || orderDesc }]">
        <slot></slot>
      </span>
    </div>
  </th>
</template>
<script>
export default {
  name: 'VxTh',
  props: {
    center: {
      type: Boolean,
      default: false
    },
    sortKey: {
      default: null,
      type: String
    },
    minWidth: {
      type: [Number, String],
      default: 'auto'
    },
    colspan: {
      type: [String, Number],
      default: 1
    },
    rowspan: {
      type: [String, Number],
      default: 1
    }
  },
  data: () => ({
    thIndex: 0,
    thwidth: '100%',
    sortActive: false,
    orderAsc: false,
    orderDesc: false
  }),
  computed: {
    styleth() {
      return {
        width: this.thwidth
      };
    },
    compStyle() {
      let width = this.minWidth == 'auto' ? 'auto' : `${this.minWidth}px`;
      return {
        minWidth: width
      };
    }
  },
  methods: {
    sortValue(direction) {
      console.log(direction);

      if (direction) {
        this.orderDesc = true;
        this.orderAsc = false;
      } else {
        this.orderDesc = false;
        this.orderAsc = true;
      }

      this.$parent.sort(this.sortKey, direction);
      this.sortActive = direction;
    }
  }
};
</script>
<style lang="scss">
.sort-vxth {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  //padding-left: 6px;
  padding-right: 6px;
  //-webkit-transform: translateY(2px);
  //transform: translateY(2px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
</style>
