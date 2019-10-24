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
          <button v-on:click="getImages()">Load More</button>
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
      page: 0,
      nextPage: 1,
      perPage: 10,
      pages: 0,
      totalCount: 0,
    }
  },
  methods: {
    async getImages(event) {
      console.log("...loading more images");
      let api_images_url = `api/images?page=${this.nextPage}&perPage=${this.perPage}`;
      let response = await fetch(api_images_url);
      let response_json = await response.json();
      let new_images = response_json.data;
      this.images = [...this.images, ...new_images];
      this.totalCount = response_json.totalCount;
      this.pages = Math.ceil(this.totalCount/this.perPage);
      this.page = response_json.page;
      this.nextPage = response_json.page + 1;
    }
  },
  mounted () {
    /* get first load of images */
    this.getImages();
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