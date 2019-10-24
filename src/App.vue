<template>
    <div>
        <p>\{{ msg }}</p>
        <filter-component/>
        <div id="gallery">
          <image-component 
            v-for="image in images" 
            :key="image.id"
            v-bind="image"
          />
        </div>
        <div>
          <span>
            page: {{page}} 
          </span>
          <span>
            pages: {{pages}}
          </span>  
        </div>
    </div>
</template>

<script>
import Image from './Image.vue'
import Filter from './Filter.vue'

export default {
  components: {
      "image-component": Image,
      "filter-component": Filter
  },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to demo-gallery',
      images: [],
      page: 1,
      perPage: 10,
      pages: 0,
      totalCount: 0,
    }
  },
  async mounted () {
    /* get first load of images */
    const self = this;
    let api_images_url = `api/images?page=${self.page}&perPage=${self.perPage}`;
    let response = await fetch(api_images_url);
    let response_json = await response.json();
    self.images = response_json.data;
    self.totalCount = response_json.totalCount;
    self.pages = Math.ceil(self.totalCount/self.perPage);
  }
}
</script>

<style lang="css">
#gallery {
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

</style>