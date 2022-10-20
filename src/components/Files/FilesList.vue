<template>
  <div class="file_list">
    <div v-if="files.length > 0">
      <FileListItem
        v-for="file in files"
        :key="file.id"
        :file="file"
      />
    </div>
    <div class="panel" v-else>No files have been found.
        <button @click="createRepo">Create fRepo</button>
        <button @click="createFolder">Create Folder</button>
        
        <span>chjecking</span>
        <button @click="readCid">Results Folder</button>
    </div>
  </div>
</template>

<script lang="ts">

import { mapState } from "vuex";
import ipfs from "../../store/api/files";
import FileListItem from "./FileListItem.vue";

export default {
  name: "FilesList",
  components: { FileListItem },
  data() {
    return { 
      files: [],
    };
  },
  methods:{
    async createRepo(){
        if(this.accounts.address !=null){
            ipfs.createRepo(this.accounts.address)
        }
        
        const cidString = "mAXESIB+zxi11fHum83s6iEB3J3YOBElWIFqLYoLMUKZp3Ag/";
        ipfs.statRepo(cidString);
       
    }, 
    async createFolder(){
       //we check the current fulder and we create a new one. 
       //owner/ users is this cid
       const cidString = "mAXESIB+zxi11fHum83s6iEB3J3YOBElWIFqLYoLMUKZp3Ag/";
       
       ipfs.createFolder(cidString, "", "another name");
    },
    async readCid(){
        ipfs.dataBase();
    }
  }, 
  computed: mapState({
    accounts: (state:any) => state.account
  }),
};
</script>
<style scoped>
.file_list {
  margin-top: 2rem;
}
</style>
