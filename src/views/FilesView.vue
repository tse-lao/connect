<template>
  <div>
    <div>
      <Title>
        <template #title> Files System </template>
        <template #actions>
          <img
            src="../assets/icons/web-technology/add-files.svg"
            alt="add_files"
            @click="testhere"
          />
          <img
            src="../assets/icons/web-technology/search-alt.svg"
            alt="search_alt"
          />
          <img
            src="../assets/icons/construction/ruler-pencil.svg"
            alt="ruler_pencil"
          />
        </template>
      </Title>
    </div>
    <div class="main_section">
      <div>
        <div class="">Info folder</div>
        <div class="">filter options.</div>
      </div>
      <div class="">
        <FilesList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Title from "../components/Elements/Title.vue";
import FilesList from "../components/Files/FilesList.vue";

export default {
  name: "FilesView",
  methods: {
    testhere() {
      console.log("test here");
    },
  },
  components: { FilesList, Title },
};
</script>

<style scoped>
.main_section {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 2rem;
  align-items: center;
}
</style>