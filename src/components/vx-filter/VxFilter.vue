<template lang="pug">
  div
    vx-sidebar-filter(:positionRight="positionRight" :parent="parent" v-model="active" :value="active" ref="VxSidebarFiltro" :color="color")
      
      VuePerfectScrollbar.filter(:settings="configuration")

        div.title-section.vx-row.justify-space-between.py-4
          div
            span.font-title.color-title.uppercase {{ $t(title)}}
          div.header-icon.vs-align-items
            feather-icon.cursor-pointer.style-icon-filter(icon="RotateCcwIcon"  @click="listAll")
            feather-icon.cursor-pointer.style-icon-filter(:icon="expandir ? 'ChevronsUpIcon' : 'ChevronsDownIcon'" @click="openAll")
            feather-icon.cursor-pointer.style-icon-filter(icon="XIcon" @click="closeFilter")
      
        div.body-filter

          vx-filter-section(
            :key="index" v-for="(element, index) in filters"
            :sectionSingle="element.sectionSingle"
            :title="element.title"
            :type="element.type"
            :multiple="element.multiple"
            :seleccionados="(element.type == 'select')? (element.type == 'select' && element.multiple) ? element.options.model : element.options.model.label : (element.type == 'radio') ? element.options.model ? element.options.count.find(elemento =>{return elemento.value == element.options.model}).label : element.options.model : element.options.model"
            :expandir="element.expand"
            @expand="expand"
            @clean="clean"
            :cleanIcon="(element.type == 'select') ? (element.type == 'select' && element.multiple) ? element.options.model : element.options.model.label : element.options.model"
            :disabledSection="element.disabledSection ? element.disabledSection:false"
            :cleanIconCriterio="(element.type == 'criterio')? true : false"
            :single="element.single"
            :singleObject="(element.single) ? element : {}"
            @evntSingleCheck="evntSingleCheck"
            :hidden="element.hidden",
            :clear="element.clear ? element.clear : false"
          )

            .w-full(v-if ="element.type == 'select'")
              div(v-if="element.action")
                v-select.w-full.font-label(v-if="element.multiple" :multiple="element.multiple" v-model="element.options.values" :options="element.options.options" :disabled="element.options.disabled" :searchable="element.options.searchable" :filterable="element.options.filterable" label="label" :placeholder="$t(element.options.placeholder)" @change="convertModelSelectMultiple(element)" @input="changeSelect(element)")
                  template(slot="selected-option" slot-scope="option")
                    | {{option.label}}
                  template(slot="option" slot-scope="option")
                    span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-if="option.object != undefined ? option.object.codigo != undefined ? option.object.descripcion != undefined ? true : false : false : false") {{option.object.codigo}} - {{option.object.descripcion}}
                    span.uppercase(v-else :class="[{'color-danger': !option.object.estado}]") {{option.label}}
                  template(slot="no-options")
                    small {{ $t('No se encontraron resultados') }}

                v-select.w-full.font-label( v-else v-model="element.options.model" :options="element.options.options" :disabled="element.options.disabled" :searchable="element.options.searchable" :filterable="element.options.filterable" label="label" :placeholder="$t(element.options.placeholder)" @change="actionChangeSelect(element.options.model,element.multiple,element.change)" @input="changeSelect(element)")
                  template(slot="selected-option" slot-scope="option")
                    | {{option.label}}
                  template(slot="option" slot-scope="option")
                    span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-if="option.object != undefined ? option.object.codigo != undefined ? option.object.descripcion != undefined ? true : false : false : false") {{option.object.codigo}} - {{option.object.descripcion}}
                    span.uppercase(v-else :class="[{'color-danger': !option.object.estado}]") {{option.label}}
                  template(slot="no-options")
                    small {{ $t('No se encontraron resultados') }}
              div(v-else)
                v-select.w-full.font-label(v-if="element.multiple" :multiple="element.multiple" v-model="element.options.values" :options="element.options.options" :disabled="element.options.disabled" :searchable="element.options.searchable" :filterable="element.options.filterable" label="label" :placeholder="$t(element.options.placeholder)" @change="convertModelSelectMultiple(element)" @input="changeSelect(element)")
                  template(slot="selected-option" slot-scope="option")
                    | {{option.label}}
                  template(slot="option" slot-scope="option")
                    span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-if="option.object != undefined ? option.object.codigo != undefined ? option.object.descripcion != undefined ? true : false : false : false") {{option.object.codigo}} - {{option.object.descripcion}}
                    span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-else) {{option.label}}
                  template(slot="no-options")
                    small {{ $t('No se encontraron resultados') }}

                v-select.w-full.font-label(v-else v-model="element.options.model" :options="element.options.options" :disabled="element.options.disabled" :searchable="element.options.searchable" :filterable="element.options.filterable" label="label" :placeholder="$t(element.options.placeholder)" @change="actionChangeSelect(element.options.model,element.multiple,element.change)" @input="changeSelect(element)")
                  template(slot="selected-option" slot-scope="option")
                    | {{option.label}}
                  template(slot="option" slot-scope="option")
                    span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-if="option.object != undefined ? option.object.codigo != undefined ? option.object.descripcion != undefined ? true : false : false : false") {{option.object.codigo}} - {{option.object.descripcion}}
                    span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-else) {{option.label}}
                  template(slot="no-options")
                    small {{ $t('No se encontraron resultados') }}

            vs-input.font-label.w-full(
              v-else-if="element.type == 'text'"
              size="small"
              v-model="element.options.model"
              :disabled="element.options.disabled"
              :placeholder="$t(element.options.placeholder)"
              v-mask="{ mask: maskGenerate(element.options.hasOwnProperty('characters') ? element.options.characters : 150,'D'), tokens: { 'D': {pattern: element.options.hasOwnProperty('pattern') ? new RegExp(element.options.pattern) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/,transform: v => v.toLocaleUpperCase()}}}"
            )

            .w-full(v-else-if ="element.type == 'popUp'")

              div.vx-row.w-full.my-2(v-show="!data.hidden" :key="key" v-for="(data, key) in element.options.options")
                div.vx-col(:class="['sm:w-5/6']")
                  span.font-label(v-if="data.title != ''" v-text="$t(data.title)")
                  template(v-if="data.tipo && data.tipo=='texto'")
                    vs-input.w-full(size="small" v-model="data.model" :disabled="data.disabled" :placeholder="$t(data.placeholder)" @input="evntWritePopUp(element.type,element.title, data.alias, data.model)"  @blur="evntUniquePopUp(element.type,element.title, data.alias, data.model)" v-mask="{mask: maskGenerate(1500,'E'),tokens:{'E': { pattern: data.hasOwnProperty('pattern') ? new RegExp(data.pattern) : /[0-9a-zA-Z,\\s]/ }}}")
                  template(v-else)
                    vs-input.w-full(size="small" v-model="data.model" :disabled="data.disabled" :placeholder="$t(data.placeholder)" @input="evntWritePopUp(element.type,element.title, data.alias, data.model)" @blur="evntUniquePopUp(element.type,element.title, data.alias, data.model)" v-mask="{mask: maskGenerate(150,'E'),tokens:{'E': { pattern: /[0-9,]/ }}}")
                div.vx-col(class="sm:w-1/6" style="cursor:pointer;display:flex;align-items:flex-end;")
                  vs-button.w-full.btn-add-compania(size="small" color="primary" icon-pack="feather" icon="icon-search" title="popup" @click="evntPopup(data.alias, data.model)")

            .w-full(v-else-if ="element.type == 'selectGroup'")

              div.vx-row.w-full.my-2(v-show="!data.hidden" :key="key" v-for="(data, key) in element.options.options")
                div.vx-col(class="w-full")
                  span.font-label(v-if="data.title != ''" v-text="$t(data.title)")
                  v-select.w-full.font-label.icon-clear(v-if="data.multiple" :multiple="data.multiple" v-model="data.values" :options="data.options" :disabled="data.disabled" :searchable="data.searchable" :filterable="data.filterable" label="id" :placeholder="$t(data.placeholder)" @change="convertModelGroupSelectMultiple(element.type,element.alias,data.alias)" @input="changeSelect(element)")
                    template(slot="selected-option" slot-scope="option")
                      | {{option.label}}
                    template(slot="option" slot-scope="option")
                      span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-if="option.object != undefined ? option.object.codigo != undefined ? true : false : false") {{option.object.codigo}} - {{option.object.descripcion}}
                      span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-else) {{option.label}}
                    template(slot="no-options")
                      small {{ $t('No se encontraron resultados') }}

                  v-select.w-full.font-label.icon-clear(v-else v-model="data.values" :options="data.options" :disabled="data.disabled" :searchable="data.searchable" :filterable="data.filterable" label="id" :placeholder="$t(data.placeholder)" @change="convertModelGroupSelectMultiple(element.type,element.alias,data.alias)" @input="changeSelect(element)")
                    template(slot="selected-option" slot-scope="option")
                      | {{option.label}}
                    template(slot="option" slot-scope="option")
                      span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-if="option.object != undefined ? option.object.codigo != undefined ? true : false : false") {{option.object.codigo}} - {{option.object.descripcion}}
                      span.uppercase(:class="[{'color-danger': !option.object.estado}]" v-else) {{option.label}}
                    template(slot="no-options")
                      small {{ $t('No se encontraron resultados') }}

            datepicker.font-label.w-full(
              v-else-if="element.type == 'date'"
              size="small"
              :language="languages['es']"
              v-model="element.options.value"
              :disabled="element.options.disabled"
              :placeholder="$t(element.options.placeholder)"
              format="dd/MM/yyyy"
              @input="dateFormatSection(element.type,element.title,element.options.value)")
            
            .w-full(v-else-if ="element.type == 'dateRange'")
              div.vx-row.my-2(v-show="!element.hidden")
                template(v-if="element.hora")
                  div.vx-col
                    span.font-label(v-if="element.options.options[0].title != ''" v-text="$t(element.options.options[0].title)")
                  div.vx-col
                    div.vx-row.my-2
                      div.vx-col(:class="['sm:w-3/5']")
                        datepicker.font-label.input-fecha( size="small" :disabledDates="element.options.options[0].disabledDate" clear-button clear-button-icon="fa fa-times" :language="languages['es']" v-model="element.options.options[0].value" :disabled="element.options.options[0].disabled" :placeholder="$t(element.options.options[0].placeholder)" format="dd/MM/yyyy" @input="dateFormatSectionRange(element.type,element.title,element.options.options[0].title,element.options.options[0].value);hourDisabled(element.type,element.title);evntWriteDateRange(element.type,element.title);")
                      div.vx-col(:class="['sm:w-2/5']")
                        vs-input.w-full.input-hora( style="margin-left: -31px;'" size="small" :disabled="element.options.options[0].disabledHora" v-model="element.options.options[0].valueHora" placeholder="hh:mm:ss" v-mask="{mask:maskGenerate(1,'HH:HH:HH'),tokens:{'H': {pattern: /[0-9\\d.\s]/},}}" @input="formatoHora(element.type, element.title, element.options.options[0].title, element.options.options[0].valueHora);evntWriteDateRange(element.type,element.title);")
                  div.vx-col
                    span.font-label(v-if="element.options.options[1].title != ''" v-text="$t(element.options.options[1].title)")
                  div.vx-col
                    div.vx-row.my-2
                      div.vx-col(:class="['sm:w-3/5']")
                        datepicker.font-label(  size="small" :disabledDates="element.options.options[1].disabledDate" clear-button clear-button-icon="fa fa-times" :language="languages['es']" v-model="element.options.options[1].value" :disabled="element.options.options[1].disabled" :placeholder="$t(element.options.options[1].placeholder)" format="dd/MM/yyyy" @input="dateFormatSectionRange(element.type,element.title,element.options.options[1].title,element.options.options[1].value);hourDisabled(element.type,element.title);evntWriteDateRange(element.type,element.title)")
                      div.vx-col(:class="['sm:w-2/5']")
                        vs-input.w-full.input-hora( style="margin-left: -31px;'" size="small" :disabled="element.options.options[1].disabledHora" v-model="element.options.options[1].valueHora" placeholder="hh:mm:ss" v-mask="{mask:maskGenerate(1,'HH:HH:HH'),tokens:{'H': {pattern: /[0-9\\d.\s]/},}}" @input="formatoHora(element.type, element.title, element.options.options[1].title, element.options.options[1].valueHora);evntWriteDateRange(element.type,element.title);")
                template(v-else)
                  div.vx-col(:class="['sm:w-1/2']")
                    span.font-label.pt-1(v-if="element.options.options[0].title != ''" v-text="$t(element.options.options[0].title)")
                    datepicker.font-label.pt-1.font-label.datapicker_input.z_index_datepicker(size="small" :disabledDates="element.options.options[0].disabledDate" clear-button clear-button-icon="fa fa-times" :language="languages['es']" v-model="element.options.options[0].value" :disabled="element.options.options[0].disabled" :placeholder="$t(element.options.options[0].placeholder)" format="dd/MM/yyyy" @input="dateFormatSectionRange(element.type,element.title,element.options.options[0].title,element.options.options[0].value);evntWriteDateRange(element.type,element.title);")
                  div.vx-col(:class="['sm:w-1/2']")
                    span.font-label.pt-1(v-if="element.options.options[1].title != ''" v-text="$t(element.options.options[1].title)")
                    datepicker.font-label.pt-1.font-label.datapicker_input.z_index_datepicker(size="small" :disabledDates="element.options.options[1].disabledDate" clear-button clear-button-icon="fa fa-times" :language="languages['es']" v-model="element.options.options[1].value" :disabled="element.options.options[1].disabled" :placeholder="$t(element.options.options[1].placeholder)" format="dd/MM/yyyy" @input="dateFormatSectionRange(element.type,element.title,element.options.options[1].title,element.options.options[1].value);evntWriteDateRange(element.type,element.title)")

            vs-input.font-label.w-full(
              v-else-if="element.type == 'number'"
              size="small"
              v-model="element.options.model"
              :disabled="element.options.disabled"
              :placeholder="$t(element.options.placeholder)"
              @keyup="changeNumber(element)"
              v-mask="{mask: 'E'+maskGenerate(element.options.hasOwnProperty('characters') ? element.options.characters : 10,'#'),tokens:{'E': { pattern: (element.options.hasOwnProperty('pattern')) ? (element.options.pattern.length > 0) ? new RegExp(element.options.pattern[0]) : /[0-9+]/ : /[0-9+]/},'#': { pattern: (element.options.hasOwnProperty('pattern')) ? (element.options.pattern.length > 1) ? new RegExp(element.options.pattern[1]) : /\\\d/ : /\\\d/ }}}"
            )
            
            .w-full(v-else-if="element.type == 'numberRange'")
              div.vx-row.my-2(v-show="!element.hidden")
                div.vx-col(:class="['sm:w-1/2']")
                  span.font-label(v-if="element.options.options[0].title != ''" v-text="$t(element.options.options[0].title)")
                  vs-input.font-label.w-full(
                    size="small"
                    v-model="element.options.options[0].model"
                    @input="mascaraNumerosReales(element.type, element.title, element.options.options[0].title, element.options.options[0].model, element.options.options[0].hasOwnProperty('characters') ? element.options.options[0].characters : 10,  element.options.options[0].hasOwnProperty('charactersDecimal') ?  element.options.options[0].charactersDecimal : null)"
                    v-mask="{ mask: maskGenerate( 30,element.options.options[0].hasOwnProperty('charactersDecimal') ? 'D':'E' ),  tokens: { 'E':{pattern: /[0-9]/}, 'D':{pattern: /[0-9.]/} } }"
                    @keyup="updateNumberRange(element.type,element.title)")
                  
                div.vx-col(:class="['sm:w-1/2']")
                  span.font-label(v-if="element.options.options[1].title != ''" v-text="$t(element.options.options[1].title)")
                  vs-input.font-label.w-full(
                    size="small"
                    v-model="element.options.options[1].model"
                    @input="mascaraNumerosReales(element.type, element.title, element.options.options[1].title, element.options.options[1].model, element.options.options[1].hasOwnProperty('characters') ? element.options.options[1].characters : 10,  element.options.options[1].hasOwnProperty('charactersDecimal') ?  element.options.options[1].charactersDecimal : null)"
                    v-mask="{ mask: maskGenerate( 30,element.options.options[1].hasOwnProperty('charactersDecimal') ? 'D':'E' ),  tokens: { 'E':{pattern: /[0-9]/}, 'D':{pattern: /[0-9.]/} } }"
                    @keyup="updateNumberRange(element.type,element.title)" )

            .w-full(v-else-if="element.type == 'tree'")
              treeselect.font-label(:options='element.options.options' :disabled="element.options.disabled" :clearable="element.options.clearable" name="id" :disable-branch-nodes="element.options.branchDisabled" :flat="element.options.flat" :default-expand-level="1" :search-nested="true" :show-count="true" v-model="element.options.value" :multiple="element.multiple" :searchable="element.options.searchable" :noResultsText="$t('No se encontraron datos.')" :placeholder="$t(element.options.placeholder)" @input="changeTreeSelected(element.type,element.title, element.options.value); changeTreeSelect(element);" @select="selectTree($event, element.type, element.title)" @deselect="deselectTree($event, element.type, element.title)")
                pre.result {{ element.options.value }}

                template(slot="value-label" slot-scope="{ node }")
                  | {{ node.raw.hasOwnProperty('descripcion') ? node.raw.descripcion : node.raw.label }}

                template(slot="option-label" slot-scope="{ node }")
                  span(v-if="node.raw.hasOwnProperty('codigo') && (node.raw.codigo != null && node.raw.codigo != '')" :class="[{'color-danger': !node.raw.estado}]") {{ node.raw.codigo }}  - {{ node.raw.label }}
                  span(v-else :class="[{'color-danger': !node.raw.estado}]") {{ node.raw.label }}

            .w-full(v-else-if ="element.type == 'treePopUp'")

              treeselect.font-label(:options='element.options.options' :disabled="element.options.disabled" :clearable="element.options.clearable" name="id" :disable-branch-nodes="element.options.branchDisabled" :flat="element.options.flat" :default-expand-level="1" :search-nested="true" :show-count="true" v-model="element.options.value" :multiple="element.multiple" :searchable="element.options.searchable" :noResultsText="$t('No se encontraron datos.')" :placeholder="$t(element.options.placeholder)" @input="changeTreeSelect(element);")
                pre.result {{ element.options.value }}

                template(slot="value-label" slot-scope="{ node }")
                  | {{ node.raw.hasOwnProperty('descripcion') ? node.raw.descripcion : node.raw.label }}

                template(slot="option-label" slot-scope="{ node }")
                  span(v-if="node.raw.hasOwnProperty('codigo') && (node.raw.codigo != null && node.raw.codigo != '')" :class="[{'color-danger': !node.raw.estado}]") {{ node.raw.codigo }}  - {{ node.raw.label }}
                  span(v-else :class="[{'color-danger': !node.raw.estado}]") {{ node.raw.label }}

              div.vx-row.w-full.mt-3.my-2(v-show="!data.hidden" :key="key" v-for="(data, key) in element.options.optionsPopUp")
                div.vx-col(:class="['sm:w-5/6']")
                  span.font-label(v-if="data.title != ''" v-text="$t(data.title)")
                  template(v-if="data.tipo && data.tipo=='texto'")
                    vs-input.w-full(size="small" v-model="data.model" :disabled="data.disabled" :placeholder="$t(data.placeholder)" v-mask="{mask: maskGenerate(1500,'E'),tokens:{'E': { pattern: /[a-zA-Z,\\s]/ }}}")
                  template(v-else)
                    vs-input.w-full(size="small" v-model="data.model" :disabled="data.disabled" :placeholder="$t(data.placeholder)" v-mask="{mask: maskGenerate(150,'E'),tokens:{'E': { pattern: /[0-9,]/ }}}")
                div.vx-col(class="sm:w-1/6" style="cursor:pointer;display:flex;align-items:flex-end;")
                  vs-button.w-full.btn-add-compania(size="small" color="primary" icon-pack="feather" icon="icon-search" title="popup" @click="evntTreePopup(data.alias, data.model)")

            div( v-else-if="element.type == 'check'")
              div(:key="index" v-for="(check, index) in element.options.count")
                vs-checkbox.font-label.pb-3( v-if="element.multiple" v-model="element.options.count[index].model" :vs-value="element.options.count.model" @input="multipleCheck(element.title)" @change="changeCheck(element)") {{ $t(check.label) }}
                vs-checkbox.font-label.pb-3( v-else v-model="element.options.count[index].model" :vs-value="element.options.count.model" @input="singleCheck(index,element.title)" @change="changeCheck(element)") {{ $t(check.label) }}

            div( v-else-if="element.type == 'radio'")
              div(:key="index" v-for="(radio, index) in element.options.count")
                vs-radio.font-label.pb-3( v-model="element.options.model" :vs-value="radio.value"  :vs-name="element.options.model" @change="changeValueRadio(element,radio.value);changeRadio(element)") {{ $t(radio.label)}}

            div( v-else-if="element.type == 'criterio'")
              div( v-show="cmultiple.visible" :key="index" v-for="(cmultiple, index) in element.options.criterio_multiple" )
                ul.filter_and_or.mt-3.mb-3(v-show="cmultiple.index != 0")
                  vs-radio(v-model="cmultiple.radio" :vs-value="cmultiple.radio_and" @change="updateModelCMultiple(element.type,element.title,cmultiple)") AND
                v-select.w-full.font-label( v-model="cmultiple.selectChild" :options="cmultiple.options" @change="changeSelectCMultiple(element.type,element.title,cmultiple)" label="label" :placeholder="$t(cmultiple.placeholder)" :disabled="element.options.disabled" :searchable="false" :filterable="false" @input="inputSelectMultiple(cmultiple)")
                  template(slot="option" slot-scope="option")
                    span {{ $t(option.label) }}
                  template(slot="selected-option" slot-scope="option")
                    span {{ $t(option.label) }}
                template(v-if="!cmultiple.selectChild.multiple")
                  .centerx.default-input(v-show='cmultiple.showInput')
                    vs-input.font-label.w-full.mt-3.inputx(
                      v-if="cmultiple.selectChild.type == 'text'"
                      ref="inputCriterio"
                      size="small"
                      :disabled="element.options.disabled"
                      v-model="cmultiple.inputChild"
                      @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                      v-mask="{ mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 150,'D'), tokens: { 'D': {pattern: cmultiple.selectChild.hasOwnProperty('patternDinamico') ? obtenerPaterrnDinamico(cmultiple.selectChild.patternDinamico) : (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/ : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/,transform: v => v.toLocaleUpperCase()}}}")
                    vs-input.font-label.w-full.mt-3.inputx(
                      v-if="cmultiple.selectChild.type == 'comentario'"
                      ref="inputCriterio"
                      size="small"
                      :disabled="element.options.disabled"
                      v-model="cmultiple.inputChild"
                      @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                      v-mask="{ mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 150,'D'), tokens: { 'D': {pattern: cmultiple.selectChild.hasOwnProperty('patternDinamico') ? obtenerPaterrnDinamico(cmultiple.selectChild.patternDinamico) : (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/ : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/}}}")
                    vs-input.font-label.w-full.mt-3.inputx(
                      v-else-if="cmultiple.selectChild.type == 'numberMultiple'"
                      ref="inputCriterio"
                      size="small"
                      :disabled="element.options.disabled"
                      v-model="cmultiple.inputChild"
                      v-mask="{mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 100,'#'),tokens:{'#': { pattern: new RegExp(cmultiple.selectChild.pattern), transform: v => v.toLocaleUpperCase() }}}"
                      @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                      @keyup.enter="validateNumberMultiple(element.type,element.title,cmultiple)"
                      @keyup.tab="validateNumberMultiple(element.type,element.title,cmultiple)"
                      @blur="validateNumberMultiple(element.type,element.title,cmultiple)" )
                    datepicker.w-full.mt-3.inputx(
                      v-else-if="cmultiple.selectChild.type == 'date'"
                      ref="inputCriterio"
                      :language="languages['es']"
                      v-model="cmultiple.inputChild"
                      :disabled="element.options.disabled"
                      format="dd/MM/yyyy"
                      @input="dateFormat(element.type,element.title,cmultiple)")
                    vs-input.font-label.w-full.mt-3.inputx(
                      v-else-if="cmultiple.selectChild.type == 'number'"
                      ref="inputCriterio"
                      size="small"
                      :disabled="element.options.disabled"
                      v-model="cmultiple.inputChild"
                      v-mask="{mask: 'E'+maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 10,'#'),tokens:{'E': { pattern: (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[0-9+]/ : /[0-9+]/},'#': { pattern: (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 1) ? new RegExp(cmultiple.selectChild.pattern[1]) : /\\\d/ : /\\\d/ }}}" @keyup="updateModelCMultiple(element.type,element.title,cmultiple)" )
                template(v-else)
                  template(v-if="cmultiple.selectChild.options.length")
                    .centerx.default-input(v-show='cmultiple.showInput' v-for="item in cmultiple.selectChild.options")
                      div.vs-align-items
                        span.font-label.style-criterio-span.mt-3( class="sm:w-1/3" ) {{ item.key }} :
                        vs-input.font-label.w-full.mt-3.inputx(  
                          class="sm:w-2/3"
                          v-if="cmultiple.selectChild.type == 'text'"
                          ref="inputCriterio"
                          size="small"
                          v-model="item.value"
                          @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                          v-mask="{ mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 150,'D'), tokens: { 'D': {pattern: cmultiple.selectChild.hasOwnProperty('patternDinamico') ? obtenerPaterrnDinamico(cmultiple.selectChild.patternDinamico) : (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/ : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/,transform: v => v.toLocaleUpperCase()}}}")
                        vs-input.font-label.w-full.mt-3.inputx( 
                          class="sm:w-2/3"
                          v-if="cmultiple.selectChild.type == 'comentario'"
                          ref="inputCriterio"
                          size="small"
                          v-model="item.value"
                          @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                          v-mask="{ mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 150,'D'), tokens: { 'D': {pattern: cmultiple.selectChild.hasOwnProperty('patternDinamico') ? obtenerPaterrnDinamico(cmultiple.selectChild.patternDinamico) : (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/ : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/}}}")
                        vs-input.font-label.w-full.mt-3.inputx( 
                          class="sm:w-2/3"
                          v-else-if="cmultiple.selectChild.type == 'numberMultiple'"
                          ref="inputCriterio"
                          size="small"
                          v-model="item.value"
                          v-mask="{mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 100,'#'),tokens:{'#': { pattern: new RegExp(cmultiple.selectChild.pattern), transform: v => v.toLocaleUpperCase() }}}"
                          @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                          @keyup.enter="validateNumberMultiple(element.type,element.title,cmultiple)"
                          @keyup.tab="validateNumberMultiple(element.type,element.title,cmultiple)"
                          @blur="validateNumberMultiple(element.type,element.title,cmultiple)" )
                        datepicker.w-full.mt-3.inputx( 
                          class="sm:w-2/3"
                          v-else-if="cmultiple.selectChild.type == 'date'"
                          ref="inputCriterio"
                          :language="languages['es']"
                          v-model="item.value"
                          format="dd/MM/yyyy"
                          @input="dateFormat(element.type,element.title,cmultiple)")
                        vs-input.font-label.w-full.mt-3.inputx( 
                          class="sm:w-2/3"
                          v-else-if="cmultiple.selectChild.type == 'number'"
                          ref="inputCriterio"
                          size="small"
                          v-model="item.value"
                          v-mask="{mask: 'E'+maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 10,'#'),tokens:{'E': { pattern: (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[0-9+]/ : /[0-9+]/},'#': { pattern: (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 1) ? new RegExp(cmultiple.selectChild.pattern[1]) : /\\\d/ : /\\\d/ }}}" @keyup="updateModelCMultiple(element.type,element.title,cmultiple)" )
                  template(v-else)
                    .centerx.default-input(v-show='cmultiple.showInput')
                      vs-input.font-label.w-full.mt-3.inputx(
                        v-if="cmultiple.selectChild.type == 'text'"
                        ref="inputCriterio"
                        size="small"
                        v-model="cmultiple.inputChild"
                        @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                        v-mask="{ mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 150,'D'), tokens: { 'D': {pattern: cmultiple.selectChild.hasOwnProperty('patternDinamico') ? obtenerPaterrnDinamico(cmultiple.selectChild.patternDinamico) : (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/ : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/,transform: v => v.toLocaleUpperCase()}}}")
                      vs-input.font-label.w-full.mt-3.inputx(
                        v-if="cmultiple.selectChild.type == 'comentario'"
                        ref="inputCriterio"
                        size="small"
                        v-model="cmultiple.inputChild"
                        @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                        v-mask="{ mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 150,'D'), tokens: { 'D': {pattern: cmultiple.selectChild.hasOwnProperty('patternDinamico') ? obtenerPaterrnDinamico(cmultiple.selectChild.patternDinamico) : (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/ : /[-,_:()áéíóúñÁÉÍÓÚÜÑa-zA-Z0-9\\\d.\\\s]/}}}")
                      vs-input.font-label.w-full.mt-3.inputx(
                        v-else-if="cmultiple.selectChild.type == 'numberMultiple'"
                        ref="inputCriterio"
                        size="small"
                        v-model="cmultiple.inputChild"
                        v-mask="{mask: maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 100,'#'),tokens:{'#': { pattern: new RegExp(cmultiple.selectChild.pattern), transform: v => v.toLocaleUpperCase() }}}"
                        @keyup="updateModelCMultiple(element.type,element.title,cmultiple)"
                        @keyup.enter="validateNumberMultiple(element.type,element.title,cmultiple)"
                        @keyup.tab="validateNumberMultiple(element.type,element.title,cmultiple)"
                        @blur="validateNumberMultiple(element.type,element.title,cmultiple)" )
                      datepicker.w-full.mt-3.inputx(
                        v-else-if="cmultiple.selectChild.type == 'date'"
                        ref="inputCriterio"
                        :language="languages['es']"
                        v-model="cmultiple.inputChild"
                        format="dd/MM/yyyy"
                        @input="dateFormat(element.type,element.title,cmultiple)")
                      vs-input.font-label.w-full.mt-3.inputx(
                        v-else-if="cmultiple.selectChild.type == 'number'"
                        ref="inputCriterio"
                        size="small"
                        v-model="cmultiple.inputChild"
                        v-mask="{mask: 'E'+maskGenerate(cmultiple.selectChild.characters ? cmultiple.selectChild.characters : 10,'#'),tokens:{'E': { pattern: (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 0) ? new RegExp(cmultiple.selectChild.pattern[0]) : /[0-9+]/ : /[0-9+]/},'#': { pattern: (cmultiple.selectChild.hasOwnProperty('pattern')) ? (cmultiple.selectChild.pattern.length > 1) ? new RegExp(cmultiple.selectChild.pattern[1]) : /\\\d/ : /\\\d/ }}}" @keyup="updateModelCMultiple(element.type,element.title,cmultiple)" )

                vs-button.w-full.mt-3.z_index_auto(v-show="cmultiple.add && (index != element.options.size_criterio_multiple-1) " color="primary" type="border" icon-pack="feather" icon="icon-plus" @click="criterioBtnAdd(element,cmultiple)")

        //-estas son las acciones de los botones
        div.footer-section.vx-row.justify-space-between
          vs-button.font-label.py-3(color="dark" size="small" v-shortkey="['alt', 'c']" @shortkey="cancelFilter" @click="cancelFilter" icon-pack="feather" icon="icon-chevron-left" type="flat")
            span.underline {{ ($t('Cancelar')).charAt(0) }}
            span {{ ($t('Cancelar')).substring(1, ($t('Cancelar')).length) }}
          vs-button.font-label.py-3( id="filter-btn-confirmar" color="dark" size="small" v-shortkey="['alt', 'a']" @shortkey="confirmFilter" @click="confirmFilter" type="filled")
            span.underline {{ ($t('Aplicar')).charAt(0) }}
            span {{ ($t('Aplicar')).substring(1, ($t('Aplicar')).length) }}


</template>

<script>
import request from '@/mixins/mixinRequest';
import helperFunctions from '@/functions';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import * as lang from 'vuejs-datepicker/src/locale';
export default {
  name: 'VxFilter',
  mixins: [request],
  props: {
    filtersParent: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: 'Title'
    },
    positionRight: {
      type: Boolean,
      default: true
    },
    parent: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  components: {
    VuePerfectScrollbar: () => import('vue-perfect-scrollbar'),
    vSelect: () => import('vue-select'),
    Datepicker: () => import('vuejs-datepicker'),
    Treeselect: () => import('@riophae/vue-treeselect')
  },
  data: () => ({
    expandir: false,
    parentx: '',
    configuration: {
      maxScrollbarLength: 90,
      whellSpeed: 0.6
    },
    filters: [],
    languages: lang,
    treeSelect: [],
    longSelectMultiple: 10
  }),
  watch: {
    active: async function(val) {
      if (val) {
        await this.copyFilter(this.filtersParent);
        //this.criterioBtnAdd('CRITERIO', true)
        //this.loadCriterioMultiple()
        await this.loadDate();
        await this.loadSingleCheck();
        await this.loadMultipleCheck();
        await this.loadEvents();
      } else {
        this.filters = [];
      }
    },
    filtersParent: function(val) {
      this.filtersParent = val;
    }
  },
  methods: {
    obtenerPaterrnDinamico(val){
      let pattern= '[a-zA-Z0-9]';
      this.filters.forEach((element) => {
        if (element.type == val[0] && element.alias ==  val[1]) {
          if(element.options.value == val[2]){
            pattern = '[a-zA-Z0-9]';
          }else{
            pattern = '[a-zA-Z0-9,]';
          }
        }
      }); 
      return  new RegExp(pattern)
    },
    maskGenerate(number, token) {
      return helperFunctions.longitudMaskNumero(number, token);
    },
    mascaraNumerosReales(type,title,optionTitle,valor,entero,decimal){
      let tmpFinal = '';
      if (valor) {
        if(decimal){
          let split = valor.split(',');
          if(split.length>1){
            let tmpEntero = '';
            let tmpDecimal = '';
            if(split[0]!=''){
              if(split[0].length> entero ) tmpEntero = split[0].substring(0, entero);
              else tmpEntero = split[0];
            }else tmpEntero = '0';
            if(split[1].length> decimal ) tmpDecimal = split[1].substring(0, decimal);
            else tmpDecimal = split[1];
            tmpFinal = tmpEntero+","+tmpDecimal;
          }else{
            if( valor.length > entero ){
              tmpFinal = valor.substring(0, entero);
            }else{
              tmpFinal = valor;
            }
          }
        }else{
          if( valor.length > entero ){
            tmpFinal = valor.substring(0, entero);
          }else{
            tmpFinal = valor;
          }
        }
      }
      this.filters.forEach((element) => {
        if (element.type == type && element.title ==  title) {
          element.options.options.forEach( (ele) => {
            if(ele.title == optionTitle){
              ele.model = tmpFinal;
            }
          });
        }
      });
    },
    dateFormatSection(type, title, value) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.model = value != null ? helperFunctions.convertirFecha(value) : '';
        }
      });
    },
    dateFormatSectionRange(type, title,subtitle, value) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.options.forEach((ele) =>{
            if(ele.title == subtitle){
              ele.model = value != null ? helperFunctions.convertirFecha(value) : '';

            }
          });
          element.options.options[0].disabledDate.from = element.options.options[1].model ? element.options.options[1].value : '';
          element.options.options[1].disabledDate.to = element.options.options[0].model ? element.options.options[0].value : '';
        }
      });
    },
    formatoHora(type, title, subtitle, value){
      if(value){
        let split = value.split(':');
        if(split.length == 1){
          if(Number(split[0] > 23)){
            value = value.substring(0, 1);
          }
        }else if(split.length == 2){
          if(Number(split[1]) > 60){
            value = value.substring(0, 4);
          }
        }else if(split.length == 3){
          if(Number(split[2]) > 60){
            value = value.substring(0, 6);
          }
        }
        this.filters.forEach((element) => {
          if (element.type == type && element.title == title) {
            element.options.options.forEach( child => {
              if( child.title == subtitle ){
                child.valueHora = value;
              }
            });
          }
        });
      }
    },

    async updateNumberRange( type, title ){
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          let NumeroInicio = element.options.options[0].model ? element.options.options[0].model : '...';
          let NumeroFin = element.options.options[1].model ? element.options.options[1].model : '...';
          let total = `${this.$t(element.options.options[0].title)} ${NumeroInicio} - ${this.$t(element.options.options[1].title)} ${NumeroFin}`
          element.options.model = (element.options.options[0].model || element.options.options[1].model) ? total : '';
        }
      });
    },

    evntWriteDateRange(type, title) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          let fechaInicio = element.options.options[0].model ? element.options.options[0].model : '--/--/--';
          let fechaFin = element.options.options[1].model ? element.options.options[1].model : '--/--/--';
          if( element.hora ){
            let horaInicio = element.options.options[0].valueHora ? element.options.options[0].valueHora:'--:--:--';
            let horaFin = element.options.options[1].valueHora ? element.options.options[1].valueHora:'--:--:--';
            let desde = element.options.options[0].model ? `${this.$t('DESDE')} ${fechaInicio} ${horaInicio}`:'';
            let fin = element.options.options[1].model ? `${this.$t('HASTA')} ${fechaFin} ${horaFin}`:'';
            if( desde!='' || fin!='' ){
              if(desde=='' && fin!=''){
                element.options.model = `${this.$t(fin)}`;
              }
              if(desde!='' && fin==''){
                element.options.model = `${this.$t(desde)}`;
              }
              if(desde!='' && fin!=''){
                element.options.model = `${this.$t(desde)} - ${this.$t(fin)}`;
              }
            }else{
              element.options.model = '';
            }
          }else{
            let total = `${this.$t('DESDE')} ${fechaInicio} - ${this.$t('HASTA')} ${fechaFin}`
            element.options.model = (element.options.options[0].model || element.options.options[1].model) ? total : '';
          }
        }
      });
    },
    hourDisabled(type, title){
      this.filters.forEach( element => {
        if(element.type == type && element.title == title && element.hora){
          if( element.options.options[0].model && element.options.options[0].disabledHora) element.options.options[0].valueHora = '00:00:00';
          if( element.options.options[1].model && element.options.options[1].disabledHora) element.options.options[1].valueHora = '23:59:59';
        }
      });
    },

    evntPopup(alias, model) {
      let element = {
        type: 'popUp',
        alias,
        value: model
      };
      this.$emit('evntPopUp', element);
    },

    evntTreePopup(alias, model) {
      let element = {
        type: 'treePopUp',
        alias,
        value: model
      };
      this.$emit('evntTreePopup', element);
    },

    evntWritePopUp(type, title) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          let value = '';
          element.options.options.forEach((child) => {
            if (child.model.length > 0) {
              //value += `[ ${child.alias} : ${child.model} ] - `
              value += `${child.title ? child.title + ' : ' : ''} ${child.model} | `;
            }
          });
          element.options.model = value.slice(0, -3);
          //if(value){
            const object = {
              type: element.type,
              title: element.title,
              alias: element.alias,
              value: element.options.model
            };
            this.$emit('changePopup', object);
          //}
        }
      });
    },
    
    evntWriteTreePopUp(type, title) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          let value = '';
          element.options.optionsPopUp.forEach((child) => {
            if (child.model.length > 0) {
              //value += `[ ${child.alias} : ${child.model} ] - `
              value += `${child.title ? child.title + ' : ' : ''} ${child.model} | `;
            }
          });
          element.options.model = value.slice(0, -3);
          //if(value){
            const object = {
              type: element.type,
              title: element.title,
              alias: element.alias,
              value: element.options.model
            };
            this.$emit('changePopup', object);
          //}
        }
      });
    },

    evntUniquePopUp(type, title, alias) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.options.forEach((child) => {
            if (child.alias == alias && child.model != '') {
              child.model = child.model
                .split(',')
                .filter((e) => e != '')
                .filter((item, index, array) => array.indexOf(item) === index)
                .join(',');
            }
          });
        }
      });
      this.evntWritePopUp(type, title);
    },
    evntSingleCheck(check) {
      this.filters.forEach((element) => {
        if (check.type == element.type && check.title == element.title) {
          if (check.options.value) {
            this.changeSingleCheck(element);
            element.options.value = true;
            element.options.model = 'SI';
          } else {
            this.changeSingleCheck(element);
            element.options.value = false;
            element.options.model = '';
          }
        }
      });
    },
    async clean(obj) {
      this.filters = await helperFunctions.filterClean(this.filters, obj);
      this.$emit('cleanSection',obj);
      //await this.dispatchEvents(obj);
    },
    async listAll() {
      this.$emit('filterCleanAll');
      this.filters = helperFunctions.filterCleanAll(this.filters);
    },
    openAll() {
      this.expandir = !this.expandir;
      if (this.expandir)
        this.filters.forEach((element) => {
          element.expand = true;
        });
      else
        this.filters.forEach((element) => {
          element.expand = false;
        });
    },
    expand(obj) {
      this.filters.forEach((element) => {
        if (element.type == obj.type && element.title == obj.title) element.expand = obj.expand;
      });
    },
    closeFilter() {
      this.$emit('closeFilter');
    },
    cancelFilter() {
      setTimeout(() => { this.$emit('closeFilter') }, 1);
    },
    confirmFilter() {
      //this.$emit("update:filters", this.filters);
      let bool = helperFunctions.hiddenChipFilter(this.filters);
      setTimeout(() => { this.$emit('confirmFilter', this.filters, bool); }, 1);
    },
    async loadDate() {
      this.filters.forEach((element) => {
        if (element.type == 'date') {
          element.options.model = '';
          if (element.options.value != null && element.options.value != '') {
            element.options.model = helperFunctions.convertirFecha(element.options.value);
          }
        }
        if (element.type == 'dateRange') {
          element.options.options.map((el) => {
          if (el.value != null && el.value != '') {
            el.model = helperFunctions.convertirFecha(el.value);
          }
        });
          
        }
      });
    },
    selectTree(node, type, title) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          if (element.multiple) element.options.aux.push(node);
          else element.options.aux = [node];
        }
      });
    },
    deselectTree(node, type, title) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.aux = element.options.aux.filter((e) => e.id != node.id);
        }
      });
    },
    inserDataTree(type,title,data){
      this.filters.forEach(element=>{
        if(element.type == type && element.title == title){
          if(data) element.options.options = data;
          else element.options.options = [];
        }
      });
    },
    changeTreeSelected(type, title, retorno) {
      if (retorno == undefined || retorno == null || retorno.length <= 0) {
        this.filters.forEach((element) => {
          if (element.type == type && element.title == title) {
            element.options.model = '';
            element.options.aux = [];
          }
        });
        return;
      }
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          let description = element.options.aux.hasOwnProperty('descripcion');
          element.options.model = element.options.aux.map((e) => (e[e.hasOwnProperty('descripcion') ? 'descripcion' : 'label'].split('|').length > 1 ? e[e.hasOwnProperty('descripcion') ? 'descripcion' : 'label'].split('|')[1].trim() : e[e.hasOwnProperty('descripcion') ? 'descripcion' : 'label'].split('|')[0].trim())).join(', ');
        }
        
      });
    },
    convertModelSelectMultiple(obj) {
      this.filters.forEach((element) => {
        if (element.type == obj.type && element.multiple && element.title == obj.title) {
          let text = '';

          element.options.values.forEach((values) => {
            text += `${values.label}, `;
          });
          element.options.model = text.slice(0, -2);
        }
      });
    },
    async actionChangeSelect(model, multiple, change) {
      try {
        if (!multiple) return;

        if (model == '' || model == null) return;

        this.$vs.loading({ type: 'point' });
        // se necesita hacer una refactorización a las API para los Select (la mejora debe ser adaptada a las necesidades)
        await change.forEach(async (change) => {
          let params = '';

          params += `${change.params.id ? change.params.id + model.id.slice(0, 3) : ''}`;
          params += `${change.params.idCompaniaSociedad ? change.params.idCompaniaSociedad + model.id : ''}`;
          params += `${change.params.label ? change.params.label + model.label : ''}`;

          const url = `${change.uri}${params}`;
          const { data } = await this.requestApi(url);
          const response = data.data;

          if (response.estado == true) {
            await this.actions(response, change);
          }
        });

        this.$vs.loading.close();
      } catch (error) {
        console.error(error);
      }
    },
    async convertModelGroupSelectMultiple(type, alias, aliasOption) {
      let text = '';

      this.filters.forEach((element) => {
        if (element.type == type && element.alias == alias) {
          element.options.options.forEach((options) => {
            if (options.alias === aliasOption) {
              if (options.multiple) {
                if (options.values.length > 0) {
                  text = `${options.title}: `;

                  options.values.forEach((values) => {
                    text += `${values.label}, `;
                  });
                } else {
                  text = '';
                }
              } else {
                if (options.values != '' && options.values != null) {
                  text = `${options.title}: ${options.values.label}, `;
                } else {
                  text = '';
                }
              }
              options.model = text.slice(0, -2);
            }
          });
        }
      });

      await this.concatModelGroupSelectMultiple(type, alias);
    },
    async concatModelGroupSelectMultiple(type, alias) {
      let text = '';

      this.filters.forEach((element) => {
        if (element.type == type && element.alias == alias) {
          element.options.options.forEach((options) => {
            if (options.model != '') {
              text += `${options.model} | `;
            }
          });
          element.options.model = text.slice(0, -3);
        }
      });
      
    },
    singleCheck(index, title) {
      this.filters.forEach((element) => {
        if (element.type == 'check' && !element.multiple && element.title == title) {
          if (element.options.count[index].model == true) {
            element.options.count.forEach((check) => {
              check.model = false;
            });
            element.options.count[index].model = true;
            element.options.model = element.options.count[index].label;
            element.options.value = element.options.count[index].value;
          } else {
            element.options.count.forEach((check) => {
              check.model = false;
            });
            element.options.model = '';
            element.options.value = '';
          }
        }
      });
    },
    multipleCheck(title) {
      let text = '';
      let textValue = '';

      this.filters.forEach((element) => {
        if (element.type == 'check' && element.multiple && element.title == title) {
          element.options.count.forEach((check) => {
            if (check.model) {
              text += `${check.label}, `;
              textValue += `${check.value},`;
            }
          });

          if (text) {
            element.options.model = text.slice(0, -2);
            element.options.value = textValue.slice(0, -1);
          } else {
            element.options.model = '';
            element.options.value = '';
          }
        }
      });
    },
    loadSingleCheck() {
      this.filters.forEach((element) => {
        if (element.type == 'check' && !element.multiple) {
          element.options.count.forEach((check) => {
            if (check.model == true) {
              element.options.model = check.label;
              element.options.value = check.value;
              return;
            }
          });
        }
      });
    },
    loadMultipleCheck() {
      let text = '';
      let textValue = '';
      this.filtersParent.forEach((element) => {
        if (element.type == 'check' && element.multiple) {
          element.options.count.forEach((check) => {
            if (check.model) {
              text += `${check.label}, `;
              textValue += `${check.value},`;
            }
          });

          if (text) {
            element.options.model = text.slice(0, -2);
            element.options.value = textValue.slice(0, -1);
          } else {
            element.options.model = '';
            element.options.value = '';
          }
        }
      });
    },
    criterioBtnAdd(obj, cmultiple) {
      this.filters.forEach((element) => {
        if (obj.type == 'criterio' && obj.title == element.title) {
          element.options.criterio_multiple.forEach((criterio, index) => {
            if (cmultiple.index == criterio.index) {
              criterio.add = false;
              element.options.criterio_multiple[index + 1].visible = true;
              element.options.criterio_multiple[index + 1].add = true;
            }
          });
        }
      });
    },
    async changeSelectCMultiple(type, title, cmultiple) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.criterio_multiple.forEach((criterio) => {
            if (cmultiple.index == criterio.index) {
              if (cmultiple.selectChild == null || cmultiple.selectChild == '') {
                cmultiple.showInput = false;
              } else {
                cmultiple.showInput = true;
              }
            }
          });
        }
      });

      await this.updateModelCMultiple(type, title, cmultiple);

      if (cmultiple.showInput) {
        if (this.$refs.inputCriterio != undefined) {
          this.$refs.inputCriterio[0].focusInput();
        }
      }
    },

    async inputSelectMultiple(cmultiple){
      if(cmultiple.showInput){
        cmultiple.inputChild = '';
        cmultiple.model = '';
      }
    },
    async validateNumberMultiple(type, title, cmultiple) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.criterio_multiple.forEach((object) => {
            if (cmultiple.index == object.index) {
              if (object.inputChild == null || object.inputChild == '') {
                object.model = '';
              } else {
                let arrayTmp = object.inputChild.split(',').filter((element) => element != '');
                arrayTmp = arrayTmp.filter((item, index, array) => array.indexOf(item) === index);
                object.inputChild = arrayTmp.join(',');
              }
            }
          });
        }
      });

      await this.updateModelCMultiple(type, title, cmultiple);
    },

    async updateModelCMultiple(type, title, cmultiple) {
      let text = '';
      let arrayText = [];

      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.criterio_multiple.forEach((object) => {
            if (cmultiple.index == object.index) {
              if (object.inputChild == null || object.inputChild == '') {
                object.model = '';
              } else {
                if (object.selectChild.type === 'numberMultiple') {
                  let lastChar = object.inputChild;
                  if (lastChar.charAt(0) === ',') {
                    object.inputChild = '';
                  } else {
                    if (lastChar.length > 1 && lastChar.charAt(lastChar.length - 1) === ',' && lastChar.charAt(lastChar.length - 2) === ',') {
                      object.inputChild = lastChar.substring(0, object.inputChild.length - 1);
                    }
                  }
                }

                object.model = `${cmultiple.index == 0 ? '' : '-' + object.radio.split('-')[0] + '-'} ${object.selectChild.label}: ${object.inputChild}`;
                // SE LE COLOCA EL PIPE CUANDO ES MULTIPLE PERO AUN NO SE APLICA
              }
            }
          });

          element.options.criterio_multiple.forEach((object) => {
            text += object.model;
          });

          arrayText = text.split('-');
          text = '';

          arrayText.forEach((val) => {
            text += `${val} `;
          });

          element.options.model = text.trim().toUpperCase();
        }
      });
    },
    changeValueRadio(obj, value) {
      this.filters.forEach((element) => {
        if (element.type == obj.type && element.title == obj.title) {
          element.options.value = value;
        }
      });
    },
    dateFormat(type, title, cmultiple) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.criterio_multiple.forEach((criterio) => {
            if (cmultiple.index == criterio.index) {
              criterio.inputChild = helperFunctions.convertirFecha(criterio.inputChild);
            }
          });
        }
      });

      this.updateModelCMultiple(type, title, cmultiple);
    },
    async copyFilter(filtersParent) {
      filtersParent.forEach((filter) => {
        this.filters.push(JSON.parse(JSON.stringify(filter)));
      });
      this.filters.forEach(element =>{
        if(element.type == 'dateRange'){
          element.options.options.map((el) => {
            el.model = el.value ? el.value : '';
            el.value = el.value ? new Date(el.value) : null;
            el.disabledDate.from = el.disabledDate.from ? new Date(el.disabledDate.from) : '';
            el.disabledDate.to = el.disabledDate.to ? new Date(el.disabledDate.to) : '';
          });
        }
      })
    },

    // ESTAS FUNCIONES ES PARA ASIGNAR A DATA DE LAS ACCIONES A LOS DIFERENTES TIPOS DE SECCIONES QUE PUEDE HABER
    async actions(response, change) {
      if (change.type == 'select') {
        await this.seccionSelect(response, change);
      }
    },
    async seccionSelect(response, change) {
      let tmpData = [];
      response.data.forEach((element) => {
        tmpData.push({
          id: element.unidadNegocioId,
          label: element.unidadNegocioDescripcion
        });
      });
      this.filters.forEach((element) => {
        if (element.type == change.type && element.title == change.child) {
          element.options.options = tmpData;
          element.options.model = tmpData[0];
        }
      });
    },

    async loadEvents() {
      this.filters.forEach(async (element) => {
        if (element.type == 'select' && element.action) {
          await this.reactSelectHidden(element);
        }
      });
    },

    async reactSelectHidden(select) {
      const object = {
        type: select.type,
        title: select.title,
        alias: select.alias,
        valus: select.options.model
      };

      this.$emit('selectHidden', object);
    },

    async changeSelect(select) {
      let object = {};

      if (select.multiple) {
        if (select.options.values.length > this.longSelectMultiple) select.options.values.pop();
        object = {
          type: select.type,
          title: select.title,
          alias: select.alias,
          value: select.options.values
        };
      } else {
        object = {
          type: select.type,
          title: select.title,
          alias: select.alias,
          value: select.options.model
        };
      }
      this.$emit('changeSelect', object);
    },

    changeTreeSelect(select) {
      let object = {};
      //if(!select.multiple){
        object = {
          type: select.type,
          title: select.title,
          alias: select.alias,
          value: select.options.value
        };
      //}
      this.$emit('changeTreeSelect', object);
    },

    async changeSingleCheck(singleCheck) {
      const object = {
        type: singleCheck.type,
        title: singleCheck.title,
        alias: singleCheck.alias,
        value: singleCheck.options.value
      };
      this.$emit('changeSingleCheck', object);
    },

    async changeNumber(number) {
      const object = {
        type: number.type,
        title: number.title,
        alias: number.alias,
        value: number.options.model
      };
      this.$emit('changeNumber', object);
    },

    async changeRadio(radio) {
      const object = {
        type: radio.type,
        title: radio.title,
        alias: radio.alias,
        value: radio.options.value
      };
      this.$emit('changeRadio', object);
    },

    async changeCheck(check) {
      const object = {
        type: check.type,
        title: check.title,
        alias: check.alias,
        value: check.options.model ? check.options.value : ''
      };
      this.$emit('changeCheck', object);
    },

    async reactHidden(type, title, hidden, clean) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.hidden = hidden;

          if (clean) helperFunctions.filterClean(this.filters, element);
          return;
        }
      });
    },

    async reactHiddenPopupTotal(type, alias, hidden, clean=true){
      this.filters.forEach((element) => {
        if(element.type == type && element.alias == alias) {
          element.hidden = hidden;
          element.options.options.forEach( e => {
            e.hidden = hidden;
          });
          if(clean) helperFunctions.filterClean(this.filters, element);
          return;
        }
      });
    },

    async reactHiddenPopup(type, alias, aliasOption, hidden) {
      this.filters.forEach((element) => {
        if (element.type == type && element.alias == alias) {
          element.options.options.map((e) => {
            if (e.alias == aliasOption) {
              e.hidden = hidden;
            }
            return e;
          });
        }
      });
    },

    async reactHiddenTreePopup(type, alias, aliasOption, hidden) {
      this.filters.forEach((element) => {
        if (element.type == type && element.alias == alias) {
          element.options.optionsPopUp.map((e) => {
            if (e.alias == aliasOption) {
              e.hidden = hidden;
            }
            return e;
          });
        }
      });
    },

    async reactChangeCriterio(type, alias, children ,model = []) {
      this.filtersParent.forEach( element => {
      if (element.type == type && element.alias == alias) {
          element.options.options.forEach( option => {
            if(option.id == children ) {
              option.options = model;
              return;
            }
          });
        }
      });
      console.log("filtersParent?=>", this.filtersParent[2].options.options[7].options);
    },

    async reactChangeSelect(type, title, options, model = '') {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.options = options;
          element.options.model = model;
          return;
        }
      });
    },

    async reactChangePopup(type, alias, aliasOption, model, values, open = true) {
      let title = '';
      if(open){
        this.filters.forEach((element) => {
          if (element.type == type && element.alias == alias) {
            title = element.title;
            element.options.options.map((e) => {
              if (e.alias == aliasOption) {
                e.model = model;
                if(e.tipo=='texto') e.values = values
              }
              return e;
            });
          }
        });
      }else{
        this.filtersParent.forEach((element) => {
          if (element.type == type && element.alias == alias) {
            title = element.title;
            element.options.options.map((e) => {
              if (e.alias == aliasOption) {
                e.model = model;
                if(e.tipo=='texto') e.values = values
              }
              return e;
            });
          }
        });
      }
      this.evntWritePopUp(type, title);
    },
    
    async reactChangeTreePopup(type, alias, aliasOption, model, values) {
      let title = '';
      this.filters.forEach((element) => {
        if (element.type == type && element.alias == alias) {
          title = element.title;
          element.options.optionsPopUp.map((e) => {
            if (e.alias == aliasOption) {
              e.model = model;
              if(e.tipo=='texto') e.values = values
            }
            return e;
          });
        }
      });

      this.evntWriteTreePopUp(type, title);
    },

    async reactChangeTree(type, title, options, model = null) {
      this.filters.forEach((element) => {
        if (element.type == type && element.title == title) {
          element.options.options = options;
          element.options.value = model;
          return;
        }
      });
    },
    async reactFilterCleanAll(filters) {
      this.filters = await this.copyFilter(filters);
    },
    async dispatchEvents(obj) {
      this.filters.forEach((element) => {
        if (obj.type == 'select' && obj.title == element.title) {
          //this.changeSelect(element);
        }
        if (obj.type == 'select' && element.multiple && obj.title == element.title) {
          //this.changeSelect(element);
        }
        if (obj.type == 'tree' && obj.title == element.title) {
          //this.changeTree(element)
        }
        if (obj.type == 'date' && obj.title == element.title) {
          //element.options.model = ''
        }
        if (obj.type == 'number' && obj.title == element.title) {
          //this.changeNumber(element);
        }
        if (obj.type == 'text' && obj.title == element.title) {
          //element.options.model = ''
        }
        if (obj.type == 'check' && obj.title == element.title) {
          //this.changeCheck(element);
        }
        if (obj.type == 'criterio' && obj.title == element.title) {
          //
        }
        if (obj.type == 'radio' && obj.title == element.title) {
          //this.changeRadio(element);
        }
        if (obj.type == 'singleCheck' && obj.title == element.title) {
          //this.changeSingleCheck(element);
        }
      });
    }
  },
  async mounted() {}
};
</script>

<style>
.filter_and_or {
  justify-content: space-around;
  display: flex;
}

.z_index_auto .vs-icon {
  z-index: auto;
}

.color-title {
  color: white;
}

.datapicker_input input {
  width: 100%;
}
.z_index_datepicker .vdp-datepicker__calendar {
  width: 190px !important;
}
.style-criterio-span{
  padding: 0.5rem;
  overflow-wrap: break-word;
}
</style>
