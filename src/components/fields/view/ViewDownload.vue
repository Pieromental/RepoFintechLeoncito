
<template>
  <div class="view-download" >
    <view-upload v-if="viewActive" :src="viewSrc" />
    <div class="container-view-download" >
      <feather-icon v-if="btnDescargar && src" class="icon-view-download" icon='DownloadIcon' @click="descargar" :title="$t(titleDescargar)" />
      <img v-if="!isPDF" class="img-view-download" :src="src" @touchend="viewImage(src, $event)" @click="viewImage(src, $event)" />
      <img v-else class="img-pdf-view-download" src="@/assets/proyect/img/extras/pdf-icon.png" @touchend="viewImagePDF" @click="viewImagePDF" />
        <!-- <span class="span-view-download" > {{ namePDF }} </span> -->
        <!-- <span > {{ "Hola" }} </span> -->
    </div>
  </div>
</template>

<script>

import request from '@/mixins/mixinRequest';
import viewUpload from '@/components/ViewUpload';

export default {

  name: 'ViewDownload',
  mixins: [request],
  components: {
    viewUpload
  },
  props: {
    src: {
      default: null,
      type: String
    },
    btnDescargar: {
      default: true,
      type: Boolean
    },
    titleDescargar: {
      default: 'Descargar',
      type: String
    }
  },
  data() {
    return {
      viewActive: false,
      viewSrc: null,
      namePDF: ''
    }
  },
  computed: {
    isPDF(){
      if(this.src && this.src.length>4){
        if(this.src.substr(this.src.length-4,this.src.length)=='.pdf') return true
      }
      return false
    }
  },
  methods: {
    viewImagePDF(){
      window.open(this.src);
    },
    viewImage(src, evt) {
      var timeout;
      var eventx = 'ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch) ? 'touchstart' : 'click';
      if (eventx == 'click') {
        this.viewActive = true;
        this.viewSrc = src;
      } else {
        if (evt.type == 'touchend') {
          var currentTime = new Date().getTime();
          var tapLength = currentTime - lastTap;
          clearTimeout(timeout);
          if (tapLength < 500 && tapLength > 0) {
            this.viewActive = true;
            this.viewSrc = src;
            event.preventDefault();
          }
          lastTap = currentTime;
        }
      }
    },
    descargar(){
      this.$emit('descargar');
    }
  }
};
</script>

<style lang="scss">
.view-download{
  padding-top: 0.3rem;
}
.container-view-download{
  min-height: 8rem;
  max-height: 15rem;
  min-width: 8rem;
  max-width: 15rem;
  width: auto;
  height: auto;
  display: flex;
  position: relative;
  background-color: #ffffff;
  border: 1.5px solid rgba(0,0,0,.1);
}
.img-view-download{
  width: -webkit-fill-available;
  height: auto;
}
.span-view-download{
  padding: .8rem;
  font-size: .8rem;
  width: -webkit-fill-available;
  height: auto;
}
.icon-view-download{
  width: 1.9rem;
  height: 1.9rem;
  padding: 0.5rem;
  border-radius: 50%;
  position: absolute !important;
  right: 0.5rem;
  bottom: 0.5rem;
  color: white !important;
  background-color: rgba(var(--vs-primary), 1) !important;
  border: 1px solid white;
  //z-index: 2;
}
.icon-view-download:hover{
  width: 2rem;
  height: 2rem;
}
.img-pdf-view-download{
  margin-left: auto;
  margin-right: auto;
  width: 10rem;
  //width: -webkit-fill-available;
  height: auto;
  align-self: center;
  //opacity: 0.8;
  //z-index: 1;
}
</style>