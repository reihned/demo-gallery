<template>
    <div class="image-component">
      <img :src="currentUrl" alt="image">
      <div class="image-controls">
        <label :for="`image-${id}`">grayscale</label>
        <input type="checkbox" :id="`image-${id}`" 
          v-model="grayscale" 
          @change="toggleGreyscale">
      </div>
    </div>
</template>

<script>
export default {
  name: 'Image',
  data () {
    return {
        grayscale: false,
        currentUrl: ""
    }
  },
  mounted () {
    this.currentUrl = this.url;
  },
  methods: {
    toggleGreyscale (event) {
      console.log("toggleGreyscale");
      event.preventDefault();
      if(this.grayscale){
        this.currentUrl = this.urlGreyscale;
      } else {
        this.currentUrl = this.url;
      }
    }
  },
  props: ['url', 'urlGreyscale', 'width', 'height', 'id']
}
</script>


<style lang="css">
  .image-component {
    flex: 1 1;
    margin: 0;
    flex-grow: 0;
  }
</style>