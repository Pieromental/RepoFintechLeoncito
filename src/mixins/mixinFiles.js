export default {
  name: 'Request',
  methods: {
    async convertBase64ToBytes(base64, fileName, type) {
      let sliceSize = 1024;
      let byteCharacters = atob(base64);
      let bytesLength = byteCharacters.length;
      let slicesCount = Math.ceil(bytesLength / sliceSize);
      let byteArrays = new Array(slicesCount);

      for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        let begin = sliceIndex * sliceSize;
        let end = Math.min(begin + sliceSize, bytesLength);

        let bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
      }

      let file = new File(byteArrays, fileName, { type: type });
      return file;
    },

    async convertPath(ruta) {
      const host = `${process.env.VUE_APP_API}images?url=`;
      const convertRuta = ruta.split('/').join('-');
      return `${host}${convertRuta}`;
    },

    async convertImageToFile(ruta) {
      let base64 = await this.convertUrlToBase64(ruta);
      // let type = base64.split(';')[0];
      // type = type.split(':')[1];
      // let fileName = ruta.split('/');
      // fileName = fileName[fileName.length - 1];
      // const file = await this.convertBase64ToBytes(base64, fileName, type);
      return base64;
    },
    
    async convertUrlToBase64(ruta) {
      const host = `${process.env.VUE_APP_API}images?url=${ruta}`;
      const data = await fetch(host);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function() {
          resolve(reader.result);
        }
        reader.readAsDataURL(blob);
      });
  }
  }
};
