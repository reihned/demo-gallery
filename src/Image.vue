<template>
    <div class="image-component">
      
      <div class="image-controls">
        <label :for="`image-${id}`">
          <img :src="currentUrl" alt="image">
          <span hidden>grayscale</span>
        </label>
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
    flex-grow: 0;
    margin: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 5px;
  }
  .image-component:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
</style>