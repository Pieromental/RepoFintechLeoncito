<template>
  <div
    :class="[{ 'vs-sidebar-group-open': openItems }, { 'vs-sidebar-group-active': open }, { 'disabled-item pointer-events-none': group.isDisabled }, { 'marginGrupo': posicionGrupo }, { 'styleSubGrupo': posicionSubGrupo }]"
    class="vs-sidebar-group"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <div @click="clickGroup" class="group-header w-full">
      <span class="flex items-center w-full">
        <feather-icon v-if="group.icon || this.groupIndex > Math.floor(this.groupIndex)" :icon="menuNivel || 'MinusIcon'"/>
        <span v-show="!sidebarItemsMin" class="truncate">{{ $t(group.i18n) || group.name }}</span>
        <vs-chip class="ml-auto mr-4" :color="group.tagColor" v-if="group.tag && !sidebarItemsMin">{{ group.tag }}</vs-chip>
      </span>
      <feather-icon icon="ChevronRightIcon" svg-classes="w-4 h-4" :class="[{ rotate90: openItems }, 'feather-grp-header-arrow']" v-show="!sidebarItemsMin" />
      <span class="vs-sidebar--tooltip">{{ $t(group.i18n) || group.name }}</span>
    </div>
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items" :class="[{'marginOpcion':posicionOpcion},{'marginSubOpcion':posicionSubOpcion}]">
      <li v-for="(groupItem, index) in group.submenu" :key="index"  >
        <vx-sidebar-group v-if="groupItem.submenu" :group="groupItem" :groupIndex="Number(`${groupIndex}.${index}`)" :open="isGroupActive(groupItem)" :openHover="openHover" />
        <vx-sidebar-item v-else :index="groupIndex + '.' + index" :to="groupItem.url" :icon="itemIcon(groupItem)" icon-small :target="groupItem.target" :isDisabled="groupItem.isDisabled" >
          <span class="truncate" :class="[{ 'font-warning': groupItem.estado }]">{{ $t(groupItem.i18n) || groupItem.name }}</span>
          <vs-chip class="ml-auto" :color="groupItem.tagColor" v-if="groupItem.tag">{{ groupItem.tag }}</vs-chip>
        </vx-sidebar-item>
      </li>
    </ul>
  </div>
</template>

<script>

import VxSidebarItem from './VxSidebarItem.vue';

export default {

  name: 'vx-sidebar-group',
  props: {
    openHover: {
      default: false,
      type: Boolean
    },
    open: {
      default: false,
      type: Boolean
    },
    group: {
      type: Object
    },
    groupIndex: {
      type: Number
    }
  },

  data: () => ({
    maxHeight: '0px',
    openItems: false
  }),

  computed: {
    sidebarItemsMin() {
      return this.$store.state.sidebarItemsMin;
    },
    styleItems() {
      return {
        maxHeight: this.maxHeight
      };
    },
    itemIcon() {
      return (groupItem) => {
        let temp=""
        switch (groupItem.nivel) {
          case 3:
            temp = groupItem.icon ? groupItem.icon:'CheckSquareIcon';
            break; 
          case 4:
            temp = groupItem.icon ? groupItem.icon:'CircleIcon';
            break; 
        }
        return temp;
      };
    },
    isGroupActive() {
      return (sidebarItem) => {
        const path = this.$route.fullPath;
        let open = false;
        let func = function(sidebarItem) {
          if (sidebarItem.submenu) {
            sidebarItem.submenu.forEach((item) => {
              if (path == item.url) {
                open = true;
              } else if (item.submenu) {
                func(item);
              }
            });
          }
        };
        func(sidebarItem);
        return open;
      };
    },
    posicionGrupo(){
      let temp = false;
      if(this.group.nivel){
        if(this.group.nivel==3){
          temp = true;
        }
      }
      return temp;
    },
    posicionSubGrupo(){
      let temp = false;
      if(this.group.nivel){
        if(this.group.nivel==4){
          temp = true;
        }
      }
      return temp;
    },
    posicionOpcion(){
      let temp = false;
      if(this.group.posicion){
        if(this.group.posicion==1){
          temp = true;
        }else{
          temp = false;
        }
      }
      return temp;
    },
    posicionSubOpcion(){
      let temp = false;
      if(this.group.posicion){
        if(this.group.posicion==2){
          temp = true;
        }else{
          temp = false;
        }
      }
      return temp;
    },
    menuNivel(){
      let temp = '';
      switch (this.group.nivel) {
        case 3:
          temp = this.group.icon ? this.group.icon:'CheckSquareIcon';
          break; 
        case 4:
          temp = this.group.icon ? this.group.icon:'CircleIcon';
          break; 
      }
      return temp;
    },
  },

  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    $route() {
      if (this.sidebarItemsMin) return;
      let scrollHeight = this.scrollHeight;
      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = `${0}px`;
        }, 50);
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = 'none';
        }, 300);
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight != '0px';
    },
    // OPEN AND CLOSES DROPDOWN MENU ON SIDEBAR COLLAPSE AND DEFAULT VIEW
    '$store.state.sidebarItemsMin'(val) {
      let scrollHeight = this.$refs.items.scrollHeight;
      if (!val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = 'none';
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = '0px';
        }, 50);
      }
      if (val && this.open) {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = '0px';
        }, 250);
      }
    }
  },

  methods: {
    clickGroup() {
      if (!this.openHover) {
        let thisScrollHeight = this.$refs.items.scrollHeight;
        if (this.maxHeight == '0px') {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = 'none';
          }, 300);
        } else {
          this.maxHeight = `${thisScrollHeight}px`;
          setTimeout(() => {
            this.maxHeight = `${0}px`;
          }, 50);
        }

        this.$parent.$children.map((child) => {
          if (child.isGroupActive) {
            if (child !== this && !child.open && child.maxHeight != '0px') {
              setTimeout(() => {
                child.maxHeight = `${0}px`;
              }, 50);
            }
          }
        });
      }
    },
    mouseover() {
      if (this.openHover) {
        let scrollHeight = this.$refs.items.scrollHeight;
        this.maxHeight = `${scrollHeight}px`;
      }
    },
    mouseout() {
      if (this.openHover) {
        let scrollHeight = 0;
        this.maxHeight = `${scrollHeight}px`;
      }
    }
  },
  components: {
    VxSidebarItem
  },
  mounted() {
    this.openItems = this.open;
    if (this.open) {
      this.maxHeight = 'none';
    }
  }
};
</script>

<style lang="scss">

@import '@/assets/scss/vuesax/components/vxSidebarGroup.scss';

.vuesax-app-is-ltr .vs-sidebar-group.vs-sidebar-group-open>ul {
  padding-left: 0px !important;
}

.marginGrupo{
  .group-header{
    .items-center {
      .truncate{
        margin-right: 3rem;
      }
    }
  }
}

.styleSubGrupo {
  .group-header{
    font-family: Montserrat;
    font-size: 11px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: 1.25 !important;
    //height: 2.3rem !important;
    letter-spacing: normal !important;
    text-align: left;
    .feather-grp-header-arrow {
      top: 7px !important;
    }
    .items-center {
      margin-left: 1.5rem !important;
      .feather-icon{
        svg{
          width: 0.6rem !important;
          height: 0.6rem !important;
        }
      }
      .truncate{
        margin-right: 3.8rem !important; 
      }
    }
    .feather-icon{
      margin-right: 20px !important;    
    }
  }
  &:hover{
      >.group-header{
          .feather-icon {
              svg {
                  color: #526474;
                  //color: #fafafa;
              }
          }
      }
  }
  &.vs-sidebar-group-active {
    >.group-header {
      font-size: 11px !important;
      .feather-icon {
        svg {
          color: #526474;
          //color: #fafafa;
        }
      }
    }
  }

}

.marginOpcion{
  .vs-sidebar--item{
    .feather-icon {
      margin-left: 1.5rem !important;
    }
  }
}

.marginSubOpcion{
  .vs-sidebar--item{
    .feather-icon {
      margin-left: 3rem !important;
    }
    .truncate{
      font-size: 8px !important;
      margin-right: 0.9rem !important;
    }
  }
}

</style>