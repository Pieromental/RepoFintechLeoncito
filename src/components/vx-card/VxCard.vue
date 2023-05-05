<!-- =========================================================================================
    File Name: VxCard.vue
    Description: Card Component
    Component Name: VxCard
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="vx-card"
    ref="card"
    :class="[{ 'overflow-hidden': tempHidden }, { 'no-shadow': noShadow }, { 'rounded-none': noRadius }, { 'card-border': cardBorder }]"
    :style="cardStyles"
  >
    <div class="vx-card__header" v-if="hasHeader">
      <!-- card title -->
      <div class="vx-card__title">
       <template v-if="this.$props.title"> 
          <h4>{{ title }}</h4>
        </template>
        <template v-else> 
          <slot name="title">
          </slot>
        </template>
        <span v-if="this.$props.subtitle" class="font-error text-grey">{{ subtitle }}</span>
      </div>

      <!-- card actions -->
      <div class="vx-card__actions" v-if="hasAction">
        <slot name="actions">
          <div
            class="vx-card__action-buttons"
            v-if="(actionButtons || collapseAction || refreshContentAction || removeCardAction || closeContentAction || clearCardAction) && !codeToggler"
          >
            <span v-if="actionButtons || clearCardAction" class="iconx icon-escobita" @click="clearCard"></span>
            <feather-icon @click="toggleContent" icon="ChevronUpIcon" :class="{ rotate180: !isContentCollapsed }" class="ml-3" v-if="actionButtons || collapseAction" />
            <feather-icon @click="refreshcard" icon="RotateCwIcon" class="ml-3" v-if="actionButtons || refreshContentAction" />
            <feather-icon @click="removeCard" icon="XIcon" class="ml-3" v-if="actionButtons || removeCardAction" />
            <feather-icon @click="closeCard" icon="XIcon" class="ml-3" v-if="closeContentAction" />
          </div>
          <div class="vx-card__code-toggler sm:block hidden" v-if="codeToggler && !actionButtons">
            <feather-icon icon="CodeIcon" :class="{ 'border border-solid border-primary border-t-0 border-r-0 border-l-0': showCode }" @click="toggleCode"></feather-icon>
          </div>
        </slot>
      </div>
    </div>

    <div
      class="vx-card__collapsible-content vs-con-loading__container"
      ref="content"
      :class="[{ collapsed: isContentCollapsed }, { 'overflow-hidden': tempHidden }]"
      :style="StyleItems"
    >
      <!-- content with no body(no padding) -->
      <slot name="no-body"></slot>

      <!-- content inside body(with padding) -->
      <div class="vx-card__body" v-if="this.$slots.default">
        <slot></slot>
      </div>

      <!-- content with no body(no padding) -->
      <slot name="no-body-bottom"></slot>

      <div class="vx-card__footer" v-if="this.$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>

    <div class="vx-card__code-container" ref="codeContainer" v-show="this.$slots.codeContainer" :style="codeContainerStyles" :class="{ collapsed: !showCode }">
      <div class="code-content">
        <prism :language="codeLanguage">
          <slot name="codeContainer"></slot>
        </prism>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'vue-prism-component';

export default {
  name: 'vx-card',
  props: {
    title: String,
    subtitle: String,
    actionButtons: {
      type: Boolean,
      default: false
    },
    actionButtonsColor: {
      type: String,
      default: 'success'
    },
    codeToggler: {
      type: Boolean,
      default: false
    },
    noShadow: {
      default: false,
      type: Boolean
    },
    noRadius: {
      default: false,
      type: Boolean
    },
    cardBorder: {
      default: false,
      type: Boolean
    },
    codeLanguage: {
      default: 'markup',
      type: String
    },
    collapseAction: {
      default: false,
      type: Boolean
    },
    refreshContentAction: {
      default: false,
      type: Boolean
    },
    removeCardAction: {
      default: false,
      type: Boolean
    },
    closeContentAction: {
      default: false,
      type: Boolean
    },
    clearCardAction: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      isContentCollapsed: false,
      showCode: false,
      maxHeight: null,
      cardMaxHeight: null,
      codeContainerMaxHeight: '0px',
      tempHidden: false
    };
  },
  computed: {
    hasAction() {
      return (
        this.$slots.actions ||
        this.actionButtons ||
        this.collapseAction ||
        this.refreshContentAction ||
        this.removeCardAction ||
        this.clearCardAction ||
        this.closeContentAction ||
        this.codeToggler
      );
    },
    hasHeader() {
      return this.hasAction || this.title || this.subtitle;
    },
    StyleItems() {
      return { maxHeight: this.maxHeight };
    },
    cardStyles() {
      return { maxHeight: this.cardMaxHeight };
    },
    codeContainerStyles() {
      return { maxHeight: this.codeContainerMaxHeight };
    }
  },
  methods: {
    toggleContent() {
      this.$refs.content.style.overflow = 'none';
      let scrollHeight = this.$refs.content.scrollHeight;
      if (this.maxHeight == '1.5rem') {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = 'none';
          this.$refs.content.style.overflow = 'none';
        }, 300);
      } else {
        this.maxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.maxHeight = `1.5rem`;
          this.$refs.content.style.overflow = 'none';
        }, 50);
      }
      this.isContentCollapsed = !this.isContentCollapsed;
    },
    refreshcard() {
      this.tempHidden = true;
      this.$vs.loading({
        container: this.$refs.content,
        scale: 0.5
      });
      setTimeout(() => {
        this.$vs.loading.close(this.$refs.content);
        this.tempHidden = false;
      }, 3000);
    },
    clearCard() {
      this.$emit('clearCard');
    },
    closeCard() {
      this.$emit('closeCard');
    },
    removeCard() {
      console.log("vxCard entraaa=>",this.$refs.content.scrollHeight);
      let scrollHeight = this.$refs.card.scrollHeight;
      this.cardMaxHeight = `${scrollHeight}px`;
      this.$el.style.overflow = 'hidden';
      setTimeout(() => {
        this.cardMaxHeight = `0px`;
      }, 50);
    },
    toggleCode() {
      this.tempHidden = true;
      this.showCode = !this.showCode;
      let scrollHeight = this.$refs.codeContainer.scrollHeight;
      if (this.codeContainerMaxHeight == '0px') {
        this.codeContainerMaxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.codeContainerMaxHeight = 'none';
          this.tempHidden = false;
        }, 300);
      } else {
        this.codeContainerMaxHeight = `${scrollHeight}px`;
        setTimeout(() => {
          this.codeContainerMaxHeight = `0px`;
          this.tempHidden = false;
        }, 150);
      }
    }
  },
  components: {
    Prism
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/vuesax/components/vxCard.scss';
</style>
