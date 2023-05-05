<template>
  <div class="con-upload">
    <view-upload v-if="viewActive" :src="viewSrc" />

    <div class="con-img-upload">
      <!-- -->
      <div v-if="actualizar" class="img-upload">
        <button v-if="!isImage" class="btn-x btn-download" type="button" @click="downloadFile"> <i class="material-icons">file_download</i></button>
        <button class="btn-x" type="button" @click="removeFileActualizar"><i class="material-icons">clear</i></button>
        <!-- v-if="img.src || source" -->
        <img v-if="isImage" class="img" :src="source" @touchend="viewImage(source, $event)" @click="viewImage(source, $event)" />
        <h4 v-else class="text-archive">
          <i translate="no" class="material-icons notranslate">description</i>
          <span> {{archivoNombre ? archivoNombre:'File.pdf' }}</span>
        </h4>
      </div>
      <!-- ********************************************************************* -->
      <div
        v-show="!actualizar"
        v-for="(img, index) in getFilesFilter"
        :class="{
          fileError: img.error,
          removeItem: itemRemove.includes(index)
        }"
        :key="index"
        class="img-upload"
      >
        <button v-if="!isImage" class="btn-x btn-download" type="button" @click="downloadFile"> <i class="material-icons">file_download</i></button>
        <button class="btn-x" type="button" @click="removeFile(index)">
          <!--
          <i
            translate="no"
            class="material-icons notranslate"
          >
          -->
          <i class="material-icons">clear</i>
        </button>
        <button
          v-if="showUploadButton"
          :class="{
            'on-progress': img.percent,
            'ready-progress': img.percent >= 100
          }"
          :style="{
            height: `${img.percent}%`
          }"
          class="btn-upload-file"
          @click="upload(index)"
        >
          <i translate="no" class="material-icons notranslate">{{ img.percent >= 100 ? (img.error ? 'report_problem' : 'cloud_done') : 'cloud_upload' }}</i>
          <span>{{ img.percent }} %</span>
        </button>
        <!-- v-if="img.src || source" -->
        <img class="img" :style="{  maxWidth: img.orientation == 'h' ? '100%' : 'none', maxHeight: img.orientation == 'w' ? '100%' : 'none'}" :key="index" :src="img.src" @touchend="viewImage(img.src, $event)" @click="viewImage(img.src, $event)"/>
        <h4 v-if="!img.src" class="text-archive">
          <i translate="no" class="material-icons notranslate">description</i>
          <span>{{ img.name }}</span>
        </h4>
      </div>
      <!-- </transition-group > -->

      <div
        v-if="!actualizar"
        :class="{
          'on-progress-all-upload': percent != 0,
          'is-ready-all-upload': percent >= 100,
          'disabled-upload': $attrs.hasOwnProperty('disabled') || limit ? srcs.length - itemRemove.length >= Number(limit) : false
        }"
        class="con-input-upload"
      >
        <input
          ref="fileInput"
          v-bind="$attrs"
          :disabled="$attrs.disabled || limit ? srcs.length - itemRemove.length >= Number(limit) : false"
          type="file"
          name="file"
          @change="getFiles"
        />
        <span class="feather icon-upload-cloud iconSubirArchivo"></span>
        <span class="text-input">{{ text }}</span>
        <span :style="{ width: `${percent}%`}" class="input-progress"></span>
        <span class="text-input btnSubirArchivo"> Subir Archivo </span>
        <button v-if="showUploadButton" :disabled="filesx.length == 0" type="button" title="Upload" class="btn-upload-all vs-upload--button-upload" @click="upload('all')">
          <i translate="no" class="material-icons notranslate">cloud_upload</i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import viewUpload from './ViewUpload';
//import axios from "axios";
var lastTap = 0;
export default {
  name: 'VxUpload',
  components: {
    viewUpload
  },
  inheritAttrs: false,
  props: {
    isActualizar: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: ''
    },
    fileName: {
      default: null,
      type: String
    },
    text: {
      default: 'Upload File',
      type: String
    },
    textMax: {
      default: 'Maximum of files reached',
      type: String
    },
    limit: {
      default: null,
      type: [Number, String]
    },
    size: {
      default: 2000000,
      type: [Number, String]
    },
    action: {
      default: null,
      type: String
    },
    headers: {
      default: null,
      type: Object
    },
    data: {
      default: null,
      type: Object
    },
    automatic: {
      default: false,
      type: Boolean
    },
    showUploadButton: {
      default: true,
      type: Boolean
    },
    singleUpload: {
      default: false,
      type: Boolean
    },
    maxHeight: {
      type: [Number, String],
      default: null
    },
    maxWidth: {
      type: [Number, String],
      default: null
    },
    formato: {
      type: String,
      default: null
    },
    archivoNombre: {
      default: null,
      type: String
    },
  },
  data: () => ({
    error: false,
    actualizar: false,
    inputValue: null,
    type: null,
    srcs: [],
    filesx: [],
    itemRemove: [],
    percent: 0,
    viewActive: false,
    viewSrc: null
  }),
  computed: {
    isImage(){
      if(this.source){
        let split = this.source.split('/')[0];
        split = split.split(':')[1] == 'image' ? true : false;
        return split;
      }
      return true;
    },
    getFilesFilter() {
      let files = this.srcs.filter((item) => {
        return !item.remove;
      });
      return files;
    },
    postFiles() {
      let postFiles = Array.prototype.slice.call(this.filesx);
      postFiles = postFiles.filter((item) => {
        return !item.hasOwnProperty('remove');
      });
      return postFiles.length;
    }
  },
  watch: {
    percent() {
      if (this.percent >= 100) {
        this.srcs.forEach((file) => {
          file.percent = 100;
        });
        setTimeout(() => {
          this.percent = 0;
        }, 1000);
      }
    },
    automatic(val) {
      if (val) this.upload('all');
    },
    isActualizar(val) {
      this.actualizar = val;
    }
  },
  methods: {
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
    removeFileActualizar() {
      this.actualizar = false;
      this.$emit('on-delete');
    },
    removeFile(index) {
      this.itemRemove.push(index);
      this.$emit('on-delete', this.filesx[index]);
      setTimeout(() => {
        this.filesx[index].remove = true;
      }, 301);
    },
    downloadFile(){
      let downloadLink = document.createElement("a");
      downloadLink.href = this.source;
      downloadLink.download = `file-${(new Date(Date.now())).getTime()}.pdf`;
      downloadLink.click();
    },
    limpiar(){
      var tmpInput = this.$refs.fileInput;
      tmpInput.value = '';
      this.$refs.fileInput.replaceWith(tmpInput);
    },
    getFiles(e) {
      this.error = false;
      this.$emit('update:vsFile', e.target.value);
      let _this = this;
      function uploadImage(e) {
        let orientation = 'h';
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          if (this.width > this.height) {
            orientation = 'w';
          }
          switchImage(this, orientation);
        };
      }
      function switchImage(image, orientation) {
        _this.srcs.push({
          src: image.src,
          orientation: orientation,
          type: _this.typex,
          percent: null,
          error: false,
          remove: null
          //--------------------------------
          //width: image.width,
          //height: image.height,
          //--------------------------------
        });

        if ((_this.maxHeight != '' || _this.maxHeight != null) && (_this.maxWidth != '' || _this.maxWidth != null)) {
          if (image.width > parseInt(_this.maxWidth) || image.height > parseInt(_this.maxHeight)) {
            _this.error = true;
            _this.$vs.notify({
              color: 'danger',
              title: 'Error!',
              text: `El tamaño de alto y ancho no es el indicado, debe ser H: ${_this.maxHeight}px y W: ${_this.maxWidth}px`
            });

            _this.srcs = [];
            _this.filesx = [];
            _this.itemRemove = [];
            _this.$emit('change', {
              path: e.target.value,
              files: _this.filesx
            });
            this.limpiar();
            return;
          }
        }
      }

      var files = e.target.files;

      if (this.formato) {
        let extensions = this.formato.split('|');
        let valid = false;
        if(files[0].name){
          let array = files[0].name.split('.');
          let tmp = array[array.length-1] ? array[array.length-1]:'';
          tmp = tmp.toLowerCase();
          extensions.forEach(element=>{
            if(tmp==element) valid = true;
          });
          let mensaje = '';
          for(let i=0; i< extensions.length;i++){
            if(i==0) mensaje = "."+extensions[i];
            else if(i==extensions.length-1) mensaje = mensaje+" o ."+extensions[i]+".";
            else mensaje = mensaje+", ."+extensions[i];
          }
          if(!valid){
            this.$vs.notify({
              color: 'danger',
              title: 'Error!',
              text: `Los formatos permitidos son: ${mensaje}`
            });
            this.srcs = [];
            this.filesx = [];
            this.itemRemove = [];
            this.limpiar();
            return;
          }
        }
      }

      if (files[0].size > parseInt(this.size)) {
        let tmp = Number(this.size);
        tmp = tmp/1000000;
        this.$vs.notify({
          color: 'danger',
          title: 'Error!',
          text: `El tamaño máximo del archivo es de ${tmp} mb.`
        });
        this.srcs = [];
        this.filesx = [];
        this.itemRemove = [];
        this.limpiar();
        return;
      }

      let count = this.srcs.length - this.itemRemove.length;
      for (const file in files) {
        if (files.hasOwnProperty(file)) {
          if (this.limit) {
            count++;
            if (count > Number(this.limit)) {
              break;
            }
          }
          var reader = new FileReader();
          const filex = files[file];

          if (/image.*/.test(filex.type)) {
            this.typex = 'image';
            this.filesx.push(filex);
            reader.onload = uploadImage;
            reader.readAsDataURL(filex);
          } else if (/video.*/.test(filex.type)) {
            this.typex = 'video';
            this.filesx.push(filex);
            _this.srcs.push({
              src: null,
              name: filex.name,
              type: 'video',
              percent: null,
              error: false,
              remove: null
            });
          } else {
            this.filesx.push(filex);
            _this.srcs.push({
              src: null,
              name: filex.name,
              percent: null,
              error: false,
              remove: null
            });
          }
          this.$emit('change', {
            path: e.target.value,
            files: this.filesx
          });
        }
      }
      const input = this.$refs.fileInput;
      input.type = 'text';
      input.type = 'file';
      if (this.automatic) {
        this.upload('all');
      }
    },

    upload(index) {
      const formData = new FormData();
      formData.append('compania', { persona: 'jajajajaja' });

      let postFiles = Array.prototype.slice.call(this.filesx);

      if (typeof index == 'number') {
        postFiles = [postFiles[index]];
      } else if (index == 'all') {
        postFiles = postFiles.filter((item) => {
          return !item.hasOwnProperty('remove');
        });
      }
      const data = this.data || {};

      for (var key in data) {
        formData.append(key, data[key]);
      }

      if (this.singleUpload) {
        postFiles.forEach((filex) => {
          const formData = new FormData();
          for (var key in data) {
            formData.append(key, data[key]);
          }
          formData.append(this.fileName, filex, filex.name);
          this.uploadx(index, formData);
        });
      } else {
        postFiles.forEach((filex) => {
          formData.append(this.fileName, filex, filex.name);
        });
        this.uploadx(index, formData);
      }
    },
    uploadx(index, formData) {
      let self = this;
      const xhr = new XMLHttpRequest();
      xhr.onerror = function error(e) {
        self.$emit('on-error', e);
        if (typeof index == 'number') {
          self.srcs[index].error = true;
        }
      };
      xhr.onload = function onload(e) {
        if (xhr.status < 200 || xhr.status >= 300) {
          self.$emit('on-error', e);
          if (typeof index == 'number') {
            self.srcs[index].error = true;
          }
        } else {
          self.$emit('on-success', e);
        }
      };
      if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
          if (e.total > 0) {
            let percent = (e.loaded / e.total) * 100;
            if (typeof index == 'number') {
              self.srcs[index].percent = Math.trunc(percent);
            } else {
              self.percent = Math.trunc(percent);
            }
          }
        };
      }
      //xhr.withCredentials = true;
      xhr.withCredentials = false;

      xhr.open('POST', this.action);
      const headers = this.headers || {};
      for (let head in headers) {
        if (headers.hasOwnProperty(head) && headers[head] !== null) {
          xhr.setRequestHeader(head, headers[head]);
        }
      }
      xhr.send(formData);
    }
  },
  mounted() {
    this.actualizar = this.isActualizar;
  }
};
</script>

<style  lang="scss">

/* Estilo Original*/

.con-img-upload .img-upload .btn-x {
  display: block;
  position: absolute;
  top: 5px;
  padding: 0;
  right: 5px;
  margin: 0;
  -webkit-transform: translate(20%, -20%);
  transform: translate(20%, -20%);
  background: transparent;
  z-index: 300;
  opacity: 0;
  border: 0;
  cursor: pointer;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  border-radius: 10px;
}
.con-img-upload .img-upload img {
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border-radius: 50%;
  max-width: none;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.con-img-upload .img-upload .btn-x {
  opacity: 1;
}
.con-img-upload .img-upload:hover {
  -webkit-transform: none;
  transform: none;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
}
.con-img-upload .img-upload .btn-x i {
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  position: relative;
  padding: 4px;
  font-size: 1.4rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}
.con-img-upload .img-upload .btn-x:hover i {
  border-radius: 50%;
  background: rgba(var(--vs-danger), 1);
}
.con-img-upload .img-upload:hover {
  -webkit-transform: scale(0.99);
  transform: none;
  -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
}
.btn-x {
  opacity: 1;
  -webkit-transform: translate(0);
  transform: translate(0);
}

/* Globalizar Estilo*/

.con-upload .con-img-upload .img-upload img {
  border-radius: 0%;
}
.con-upload .con-img-upload {
  padding: 0;
  margin: 0;
}
.con-upload .con-img-upload .img-upload .btn-x i {
  top: 5px;
  right: 5px;
}
.con-upload .con-img-upload .img-upload .btn-x:hover {
  top: 5px;
  right: 5px;
}
.con-upload .img-upload {
  height: 15rem;
  width: 100%;
  margin: 0;
}
.con-upload .con-input-upload {
  height: 15rem;
  width: 100%;
  margin: 0;
  background-color: #ffffff;
  
  border: 1.5px solid rgba(0,0,0,.1);
}
.con-upload .img {
  height: 15rem;
  width: 100%;
}
.con-upload.con-upload {
  overflow: hidden !important;
}

/* Nuevo Diseño  */

.con-input-upload .text-input{
  min-width: auto;
  font-weight: inherit;
  font-size: 0.8em;
  color: darkgray;
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  padding-top: 0.4rem !important;
  padding-bottom: 0.4rem !important;
  margin-bottom: 0.6rem !important;
}
.iconSubirArchivo{
  font-size: x-large;
  color: darkgray;
  padding: 0.5rem;
}
.btnSubirArchivo{
  border: 1px solid;
  border-radius: 5px;
  width: 60% !important;
}
.con-upload .con-input-upload:hover {
  .iconSubirArchivo{
    color: rgba(var(--vs-primary), 1);
  }
  .btnSubirArchivo{
    color: rgba(var(--vs-primary), 1);
  }
}
.con-img-upload .img-upload .btn-download{
  left: 5px;
}
.con-img-upload .img-upload .btn-download:hover i{
  background: rgba(var(--vs-primary), 1);
}
</style>
