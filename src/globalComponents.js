/*=========================================================================================
  File Name: globalComponents.js
  Description: Here you can register components globally
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue';
import VxTooltip from './layouts/components/vx-tooltip/VxTooltip.vue';
import VxBreadcrumb from './layouts/components/VxBreadcrumb.vue';
import VxCard from './components/vx-card/VxCard.vue';
import VxList from './components/vx-list/VxList.vue';
import VxDialog from './components/VxDialog.vue';
import VxChangeCompany from './components/VxChangeCompany.vue';
import VxInputGroup from './components/VxInputGroup.vue';

import VxTableTreeCC from './components/vx-table/VxTableTreeCC.vue';
import VxTable from './components/vx-table/VxTable.vue';
import VxTableInput from './components/vx-table/VxTableInput.vue';
import VxTableSelect from './components/vx-table/VxTableSelect.vue';
import VxTableTreeSelect from './components/vx-table/VxTableTreeSelect.vue';

import VxTd from './components/vx-table/VxTd.vue';
import VxTh from './components/vx-table/VxTh.vue';
import VxTr from './components/vx-table/VxTr.vue';
//import VxTrExpand from "./components/vx-table/VxTrExpand.vue";

// TABS
import VxTabs from './components/vx-tab/VxTabs.vue';
import VxTab from './components/vx-tab/VxTab.vue';

// DROPDOWN
import VxDropDownMenu from './components/vx-dropdown/VxDropDownMenu';
import VxDropDownItem from './components/vx-dropdown/VxDropDownItem';

import VxPagination from './components/vx-pagination/VxPagination.vue';
import VxRowsPage from './components/vx-pagination/VxRowsPage.vue';
import FeatherIcon from './components/FeatherIcon.vue';
import VxSelectDate from './components/VxSelectDate';
import VxSidebarFiltro from './components/VxSidebarFiltro';
import VxPopup from './components/VxPopup';

// filtro Sidebar
import VxSidebarFilter from './components/vx-filter/VxSidebarFilter.vue';
import VxFilterSection from './components/vx-filter/VxFilterSection.vue';
import VxFilter from './components/vx-filter/VxFilter.vue';
import VxFilterChip from './components/vx-filter/VxFilterChip.vue';
import ZkTable from 'vue-table-with-tree-grid';

Vue.component(ZkTable.name, ZkTable);
Vue.component(VxInputGroup.name, VxInputGroup);

//import VxUpload from "./components/VxUpload.vue";

//Vue.component(VxUpload.name, VxUpload);

Vue.component(VxTooltip.name, VxTooltip);
Vue.component(VxCard.name, VxCard);
Vue.component(VxList.name, VxList);

// TABS
Vue.component(VxTabs.name, VxTabs);
Vue.component(VxTab.name, VxTab);

// DROPDOWN
Vue.component(VxDropDownMenu.name, VxDropDownMenu);
Vue.component(VxDropDownItem.name, VxDropDownItem);

Vue.component(VxTableTreeCC.name, VxTableTreeCC);
Vue.component(VxTable.name, VxTable);
Vue.component(VxTableInput.name, VxTableInput);
Vue.component(VxTableSelect.name, VxTableSelect);
Vue.component(VxTableTreeSelect.name, VxTableTreeSelect);
Vue.component(VxTd.name, VxTd);
Vue.component(VxTh.name, VxTh);
Vue.component(VxTr.name, VxTr);
//Vue.component(VxTrExpand.name, VxTrExpand);
Vue.component(VxPagination.name, VxPagination);
Vue.component(VxRowsPage.name, VxRowsPage);

Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(VxSelectDate.name, VxSelectDate); 
Vue.component(VxSidebarFiltro.name, VxSidebarFiltro); 
Vue.component(VxPopup.name, VxPopup);
Vue.component(VxDialog.name, VxDialog);
Vue.component(VxChangeCompany.name, VxChangeCompany);

// filtro Sidebar

Vue.component(VxSidebarFilter.name, VxSidebarFilter);
Vue.component(VxFilterSection.name, VxFilterSection);
Vue.component(VxFilter.name, VxFilter);
Vue.component(VxFilterChip.name, VxFilterChip);
