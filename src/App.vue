<template>
    <div>
        <p>\{{ msg }}</p>
        <filter-component/>
        <div id="gallery">
            <image-component/>
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
      msg: 'Welcome to demo-gallery'
    }
  }
}
</script>