<!-- =========================================================================================
    File Name: ChangeTimeDurationDropdown.vue
    Description: Change duration dropdown component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <vs-dropdown vs-trigger-click class="cursor-pointer">
    <small class="flex cursor-pointer">{{ header }}<feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" class="ml-1"></feather-icon></small>
    <vs-dropdown-menu class="w-32">
      <vs-dropdown-item
        @click="
          $emit('timeDurationChanged', '7');
          siete();
        "
        >Últimos 7 dias</vs-dropdown-item
      >
      <vs-dropdown-item
        @click="
          $emit('timeDurationChanged', '30');
          treinta();
        "
        >Últimos 30 dias</vs-dropdown-item
      >
      <vs-dropdown-item
        @click="
          $emit('timeDurationChanged', '365');
          anio();
        "
        >Último año</vs-dropdown-item
      >
      <vs-dropdown-item
        @click="
          $emit('timeDurationChanged', '0');
          all();
        "
        >Todo</vs-dropdown-item
      >
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  data() {
    return {
      header: 'Últimos 7 dias'
    };
  },
  methods: {
    siete() {
      this.header = 'Últimos 7 dias';
    },
    treinta() {
      this.header = 'Últimos 30 dias';
    },
    anio() {
      this.header = 'Último año';
    },
    all() {
      this.header = 'Todo';
    }
  }
};
</script>
