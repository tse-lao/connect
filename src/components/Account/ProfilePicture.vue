<script lang="ts">
import { createIcon } from "@download/blockies";

export default {
  data() {
    return {
      image:
        "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MjAnIGhlaWdodD0nNDIwJyBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLDApOyc+PGcgc3R5bGU9J2ZpbGw6cmdiYSgwLDAsMCwxKTsgc3Ryb2tlOnJnYmEoMCwwLDAsMSk7IHN0cm9rZS13aWR0aDoyLjE7Jz48cmVjdCAgeD0nMTg1JyB5PSc4NScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PHJlY3QgIHg9JzE4NScgeT0nMTM1JyB3aWR0aD0nNTAnIGhlaWdodD0nNTAnLz48cmVjdCAgeD0nMTM1JyB5PSc4NScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PHJlY3QgIHg9JzIzNScgeT0nODUnIHdpZHRoPSc1MCcgaGVpZ2h0PSc1MCcvPjxyZWN0ICB4PScxMzUnIHk9JzE4NScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PHJlY3QgIHg9JzIzNScgeT0nMTg1JyB3aWR0aD0nNTAnIGhlaWdodD0nNTAnLz48cmVjdCAgeD0nMTM1JyB5PScyMzUnIHdpZHRoPSc1MCcgaGVpZ2h0PSc1MCcvPjxyZWN0ICB4PScyMzUnIHk9JzIzNScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PHJlY3QgIHg9Jzg1JyB5PScxMzUnIHdpZHRoPSc1MCcgaGVpZ2h0PSc1MCcvPjxyZWN0ICB4PScyODUnIHk9JzEzNScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PHJlY3QgIHg9Jzg1JyB5PScyMzUnIHdpZHRoPSc1MCcgaGVpZ2h0PSc1MCcvPjxyZWN0ICB4PScyODUnIHk9JzIzNScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PHJlY3QgIHg9Jzg1JyB5PScyODUnIHdpZHRoPSc1MCcgaGVpZ2h0PSc1MCcvPjxyZWN0ICB4PScyODUnIHk9JzI4NScgd2lkdGg9JzUwJyBoZWlnaHQ9JzUwJy8+PC9nPjwvc3ZnPg==",
    };
  },
  methods: {
    makeIcon() {
      if (this.address != null) {
        /*       var options = {
          foreground: [0, 189, 126, 255], // rgba black
          background: [0,0,0,0], // rgba white
          margin: 0.2, // 20% margin
          size: 500, // 420px square
          format: "svg", // use SVG instead of PNG
        };
        var data = new Identicon(this.address, options).toString();
        
        this.image = "data:image/svg+xml;base64," + data;

        console.log(this.image); */

        var icon = createIcon({
          // All options are optional
          seed: this.address, // seed used to generate icon data, default: random
          color: "#dfe", // to manually specify the icon color, default: random
          bgcolor: "transparent", // choose a different background color, default: white
          size: 10, // width/height of the icon in blocks, default: 10
          scale: 3, // width/height of each block in pixels, default: 5
        });
        

        document.getElementById("prof").replaceWith(icon);
      }
    },
  },
  mounted() {
    this.makeIcon();
  },
  props: {
    address: {
      type: String,
      required: true,
      default: "c157a79031e1c40f85931829bc5fc552",
    },
  },
};
</script>
<template>
  <div class="profile-picture" id="prof">
    <img class="profile-image" :src="image" alt="profile_picture" />
  </div>
</template>
<style scoped>
.profile-image {
  height: 64px;
  width: 64px;
  border-radius: 50%;
}
</style>