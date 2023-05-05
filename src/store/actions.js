/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import { requestApi } from '@/api';

const actions = {
  // ////////////////////////////////////////////
  // SIDEBAR & UI UX
  // ////////////////////////////////////////////

  updateSidebarWidth({ commit }, width) {
    commit('UPDATE_SIDEBAR_WIDTH', width);
  },
  updateI18nLocale({ commit }, locale) {
    commit('UPDATE_I18N_LOCALE', locale);
  },
  toggleContentOverlay({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY');
  },
  updateTheme({ commit }, val) {
    commit('UPDATE_THEME', val);
  },
  updateUserRole({ commit }, val) {
    commit('UPDATE_USER_ROLE', val);
  },

  // ////////////////////////////////////////////
  // COMPONENT
  // ////////////////////////////////////////////

  // VxAutoSuggest
  updateStarredPage({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload);
  },

  //  The Navbar
  arrangeStarredPagesLimited({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list);
  },
  arrangeStarredPagesMore({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list);
  },

  async cambiarCompaniaSeleccionada({ commit }, compania) {
    commit('CAMBIAR_COMPANIA_SELECCIONADA', compania);

    let { data } = await requestApi(`obtener_logo?idCompania=${compania}`);
    //localStorage.setItem("logo-empresa", data.data.data.logo)
    //localStorage.setItem("logo-empresa-icono", data.data.data.logoIcono)
    commit('CAMBIAR_LOGO_COMPANIA_SELECCIONADA', data.data.data);
  }
};

export default actions;
