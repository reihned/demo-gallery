<template>
    <div>
        <p>{{ msg }}</p>
        <details id="filter" closed>
          <summary>Filter</summary>
          <div>
            <h4>Width</h4>
            <label>min</label>
            <input type="number" name="minWidth" id="minWidth" v-model="minWidth">
            <label>max</label>
            <input type="number" name="maxWidth" id="maxWidth" v-model="maxWidth">
          </div>
          <div>
            <h4>Height</h4>
            <label>min</label>
            <input type="number" name="minHeight" id="minHeight" v-model="minHeight">
            <label>max</label>
            <input type="number" name="maxHeight" id="maxHeight" v-model="maxHeight">
          </div>
          <button v-on:click="reloadImages()">Apply Filter</button>
        </details>
        <div id="gallery">
          <image-component 
            v-for="image in images" 
            :key="image.id"
            v-bind="image"
          />
        </div>
        <div>
          <button v-on:click="loadMoreImages()">Load More</button>
        </div>
    </div>
</template>

<script>
import Image from './Image.vue'

export default {
  components: {
      "image-component": Image
  },
  name: 'app',
  data () {
    return {
      msg: 'Welcome to demo-gallery',
      images: [],
      // page: 0,
      // nextPage: 1,
      perPage: 10,
      pages: 0,
      totalCount: 0,
      minWidth: 0, 
      maxWidth: 1000,
      minHeight: 0, 
      maxHeight: 1000,
    }
  },
  methods: {
    async getImages(offset) {

      /* url */
      // let api_images_url = `api/images?offset=${this.images.length}&limit=${this.perPage}`;
      let api_images_url = new URL('/api/images', window.location.origin);

      /* params */
      let params = api_images_url.searchParams;
      params.append('offset', offset);
      params.append('limit', this.perPage);
      params.append('minWidth', this.minWidth);
      params.append('maxWidth', this.maxWidth);
      params.append('minHeight', this.minHeight);
      params.append('maxHeight', this.maxHeight);

      /* get image data */
      let response = await fetch(api_images_url.toString());
      let response_json = await response.json();
      let new_images = response_json.data;

      /* update component data */
      this.images = [...this.images, ...new_images];
      this.totalCount = response_json.totalCount;
      this.pages = Math.ceil(this.totalCount/this.perPage);
      this.page = response_json.page;
      this.nextPage = response_json.page + 1;
    },
    loadMoreImages(event) {
      console.log("...loading more images");
      this.getImages(this.images.length);
    },
    async reloadImages(event) {
      console.log("...loading images");
      this.images = [];
      await this.getImages(0);
    }
  },
  mounted () {
    /* get first load of images */
    this.reloadImages();
  }
}
</script>

<style lang="css">
div {
  margin: 5px;
}
#gallery {
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}
#filter {
  margin: 5px;
  padding: 5px;
}

</style>